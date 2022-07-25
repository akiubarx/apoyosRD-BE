import Usuario from '../models/Usuarios.js';
import Apoyo from '../models/Apoyos.js';

const isExistUSrMail = async (props) => {
  let { req, res } = props;
  let { email, username } = req.body;

  const existeUsuarioCorreo = await Usuario.findOne({email}); //Busca si existe un registro que coincida
  const existeUsuario = await Usuario.findOne({username}); //Busca si existe un registro que coincida

  if(existeUsuarioCorreo || existeUsuario){
    const error = new Error('Correo o Usuario ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
}

const wasRecordModified = props => {
  const { model } = props
  return model.modifiedCount > 0 ? true : false
}

const isNotExistApoyoName = async (props) => {
  let { req, res } = props;
  let { nombre } = req.body;

  const existeNombreApoyo = await Apoyo.findOne({nombre}); //Busca si existe un registro que coincida

  if(existeNombreApoyo){
    const error = new Error('Apoyo ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
}

const isExistId = async (props) => {
  let { req, res } = props;
  let { id } = req.body;
  const existeId = await Apoyo.findOne({id}); //Busca si existe un registro que coincida

  if(existeId){
    const error = new Error ('Existe un registro')
    return res.status(400).json({msg: error.message});
  }
}

const isExistOrden = async (props) =>{
  let { req, res } = props;
  let { orden } = req.body;
  const existeOrden = await Apoyo.findOne({orden}); //Busca si existe un registro que coincida
  
  if(existeOrden){
    const error = new Error ('Existe un registro')
    return res.status(400).json({msg: error.message});
  }
}

export {
  isExistUSrMail,
  isNotExistApoyoName,
  wasRecordModified,
  isExistId,
  isExistOrden
}