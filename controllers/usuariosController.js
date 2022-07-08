import Usuario from '../models/Usuarios.js';
import generarTokenM from '../helpers/generarTokenManual.js'

//Consulta Global de Usuarios
const consultarUsuarios = async (req,res) => {
  const usuarios = await Usuario.find(); //find() busca por todos los registros existentes
  res.json(usuarios);
}

//Creacion de Usuario
const crearUsuario = async (req, res) => {
  const { email, username } = req.body;

  const existeUsuarioCorreo = await Usuario.findOne({email}); //Busca si existe un registro que coincida
  const existeUsuario = await Usuario.findOne({username}); //Busca si existe un registro que coincida
  const existeId = await Usuario.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
  let newId = parseInt(existeId[0].id);
  if(newId) newId++;//Aumenta el ultimo registro en 1 */

  if(existeUsuarioCorreo){
    const error = new Error('Correo ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
  if(existeUsuario){
    const error = new Error('Nombre de Usuario ya registrado');
    return res.status(400).json({msg: error.message});
  }
  try {
    const usuario = new Usuario({...req.body,id:newId});//añade un nuevo ID en caso de ser necesario
    usuario.token = generarTokenM();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
}

//Edicion de Usuario
const editarUsuario = async (req,res) => {
  const { id, email, username } = req.body;
  const usuario = await Usuario.findOne( {id} ); //find() el ID que coincida

  const existeUsuarioCorreo = await Usuario.findOne({email}); //Busca si existe un registro que coincida
  const existeUsuario = await Usuario.findOne({username}); //Busca si existe un registro que coincida
  
  usuario.username = req.body.username || usuario.username; 
  usuario.email = req.body.email || usuario.email;

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
    console.log(error)
  }
}

// Exports del controlador
export {
  consultarUsuarios,
  crearUsuario,
  editarUsuario
};