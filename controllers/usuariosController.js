import Usuario from '../models/Usuarios.js';
import generarTokenM from '../helpers/generarTokenManual.js'
import generarJWT from '../helpers/generarJWT.js'
import { isExistUSrMail } from '../customMiddelwares/validaciones.js'
import { emailRegistro, missingPasswordMail } from '../helpers/email.js'

//Consulta Global de Usuarios
const consultarUsuarios = async (req,res) => {
  const usuarios = await Usuario.find(); //find() busca por todos los registros existentes
  res.json(usuarios);
}

//Creacion de Usuario
const crearUsuario = async (req, res) => {

  if(isExistUSrMail({req,res})){
    const existeId = await Usuario.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
    let newId = existeId.length > 0 ? parseInt(existeId[0].id) : 0; 
    newId++;

    try {
      const usuario = new Usuario({...req.body,id:newId});//añade un nuevo ID en caso de ser necesario
      usuario.token = generarTokenM();
      await usuario.save();

      //Se envia mail de confirmación
      emailRegistro({
        email: usuario.email,
        usuario: usuario.username,
        token: usuario.token
      })

      res.json({msg: 'Usuario Creado Correctamente, Se envio un mail a la cuenta de correo'});
    } catch (error) {
      console.log('Error al registrar usuario');
    }
  };
}

//Edicion de Usuario
const editarUsuario = async (req,res) => {
  const { id, email, username } = req.body; //.body toma el valor que se esta enviando desde el formulario
  const usuario = await Usuario.findOne( {id} ); //find() el ID que coincida
  const existeUsuarioCorreo = await Usuario.findOne({email}); //Busca si existe un registro que coincida
  const existeUsuario = await Usuario.findOne({username}); //Busca si existe un registro que coincida

  usuario.username = req.body.username || usuario.username; 
  usuario.email = req.body.email || usuario.email;
  usuario.role_id = req.body.role_id || usuario.role_id;

  if(existeUsuarioCorreo){
    const error = new Error('Correo ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
  if(existeUsuario){
    const error = new Error('Nombre de Usuario ya registrado');
    return res.status(400).json({msg: error.message});
  }

  try {
      const usuarioModificado = await usuario.save()
      res.json(usuarioModificado);
  } catch (error) {
      console.log('Error al editar Usuario');
  }
};

//Autenticar Usuarios
//Identificar si el usuario existe
const autenticar = async ( req,res ) => {
  const { username, password } = req.body;
  //Comprabar si existe
  const usuario = await Usuario.findOne( {username} );
  if(!usuario){
    const error = new Error ('Usuario no existe');
    return res.status(404).json({ msg: error.message });
  }
  console.log(usuario);
  //Comprobar si esta activo
  if(!usuario.is_activedirectory){
    const error = new Error ('Usuario no activado');
    return res.status(404).json({ msg: error.message });
  }
  //Comprobar Password
  if( await usuario.comprobarPassword(password) ){
    res.json({
      dbId: usuario._id,
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      token: generarJWT(usuario.id,usuario._id),
    })
  } else { 
    const error = new Error ('Contraseña incorrecta');
    return res.status(404).json({ msg: error.message });
  }
}

//Confirmando usuario
const confirmarUsuario = async(req,res) => {
  const { token } = req.params; //params toma el valor que se esta enviando desde la url
  const usuarioConfirmar = await Usuario.findOne({ token })
  if(!usuarioConfirmar){
    const error = new Error ('Token no valido');
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.is_activedirectory = true;//Se confirma el usuario en active directory
    usuarioConfirmar.token = '';//Eliminamos el token temporal
    await usuarioConfirmar.save();//Guarda los cambios en la DB
    return res.json({msg: 'Cuenta confirmada'});
  } catch (error) {
    console.log(error)
  }
}

//Recuperar contraseña
const missingPassword = async(req,res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if(!usuario){
    const error = new Error ('El correo no esta registrado');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarTokenM();
    usuario.is_activedirectory = false;
    await usuario.save();
    missingPasswordMail({
      email: usuario.email,
      usuario: usuario.username,
      token: usuario.token
    })
    res.json({ msg: "Se envio un correo con las instrucciones"})
  } catch (error) {
    console.log('Error')
  }
}

//Comprobar Token
const comprobarToken = async (req,res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token })
  if(tokenValido) {
    res.json({
      msg: 'El Token y el Usuario existen',
      dbId: tokenValido._id,
      id: tokenValido.id,
      username: tokenValido.username,
      email: tokenValido.email,
      token: tokenValido.token
    })
  } else {
    const error = new Error ('Token No Valido');
    return res.status(404).json({ msg: error.message });
  }
}

//Generar nuevo Password
const nuevoPassword = async (req,res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token })

  if(usuario) {
    usuario.password = password;
    usuario.is_activedirectory = true;
    usuario.token = '';
    try {
      await usuario.save();
      res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error ('Token No Valido');
    return res.status(404).json({ msg: error.message });
  }
}

//Generar Perfil
const perfil = async (req,res) => {
  const { usuario } = req;
  res.json(usuario);
}

// Exports del controlador
export {
  consultarUsuarios,
  crearUsuario,
  editarUsuario,
  autenticar,
  confirmarUsuario,
  missingPassword,
  comprobarToken,
  nuevoPassword,
  perfil
}