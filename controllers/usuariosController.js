import Usuario from '../models/Usuarios.js';
import generarTokenM from '../helpers/generarTokenManual.js'
import { isExistUSrMail } from '../customMiddelwares/validaciones.js'

//Consulta Global de Usuarios
const consultarUsuarios = async (req,res) => {
  const usuarios = await Usuario.find(); //find() busca por todos los registros existentes
  res.json(usuarios);
}

//Creacion de Usuario
const crearUsuario = async (req, res) => {

  if(isExistUSrMail({req,res})){
    const existeId = await Usuario.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
    let newId = parseInt(existeId[0].id);
    if(newId) newId++;//Aumenta el ultimo registro en 1

    try {
      const usuario = new Usuario({...req.body,id:newId});//añade un nuevo ID en caso de ser necesario
      usuario.token = generarTokenM();
      const usuarioAlmacenado = await usuario.save();
      res.json(usuarioAlmacenado);
    } catch (error) {
      console.log('Error al registrar Usuario');
    }
  };
}

//Edicion de Usuario
const editarUsuario = async (req,res) => {
  const { id } = req.body;
  if(isExistUSrMail({req,res})){
    const usuario = await Usuario.findOne( {id} ); //find() el ID que coincida
    usuario.username = req.body.username || usuario.username; 
    usuario.email = req.body.email || usuario.email;

    try {
      const usuarioModificado = await usuario.save()
      res.json(usuarioModificado);
    } catch (error) {
      console.log('Error al editar Usuario');
    }
  };
}

//Autenticar Usuarios
//Identificar si el usuario existe
const autenticar = async ( req,res ) => {
  const { email, password } = req.body;
  //Comprabar si existe
  const usuario = await Usuario.findOne( {email} );
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
      name: usuario.username,
      email: usuario.email
    })
  } else { 
    const error = new Error ('Contraseña incorrecta');
    return res.status(404).json({ msg: error.message });
  }
  
}


// Exports del controlador
export {
  consultarUsuarios,
  crearUsuario,
  editarUsuario,
  autenticar
};