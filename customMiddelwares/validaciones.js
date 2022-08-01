import Usuario from '../models/Usuarios.js';
import Apoyo from '../models/Apoyos.js';
import Archivo from '../models/Archivos.js';

const isExistUSrMail = async (props) => {
  let { req, res } = props;
  let { email, username } = req.body;

  const existeUsuarioCorreo = await Usuario.findOne({email}); //Busca si existe un registro que coincida
  const existeUsuario = await Usuario.findOne({username}); //Busca si existe un registro que coincida

  if(existeUsuarioCorreo || existeUsuario){
    const error = new Error('Correo o Usuario ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
};

const wasRecordModified = props => {
  const { model } = props
  return model.modifiedCount > 0 ? true : false
};

const isNotExistApoyoName = async (props) => {
  let { req, res } = props;
  let { nombre } = req.body;

  const existeNombreApoyo = await Apoyo.findOne({nombre}); //Busca si existe un registro que coincida

  if(existeNombreApoyo){
    const error = new Error('Apoyo ya registrado'); 
    return res.status(400).json({msg: error.message});
  }
};

const isNotExistApoyoId = async (props) => {
  let { req, res } = props;
  let { id } = req.body;

  const existeIdApoyo = await Apoyo.findOne({id}); //Busca si existe un registro que coincida

  if(existeIdApoyo){
    const error = new Error('Error el Id de Apoyo ya esta en uso'); 
    return res.status(400).json({msg: error.message});
  }
};
const isNotExistApoyoOrd = async (props) => {
  let { req, res } = props;
  let { orden } = req.body;

  const existeOrdenApoyo = await Apoyo.findOne({orden}); //Busca si existe un registro que coincida

  if(existeOrdenApoyo){
    const error = new Error('Error el Orden del Apoyo ya esta en uso'); 
    return res.status(400).json({msg: error.message});
  }
};

const isNotExistArchivoId = async (props) => {
  let { req, res } = props;
  let { id } = req.body;

  const existeIdArchivo = await Archivo.findOne({id}); //Busca si existe un registro que coincida

  if(existeIdArchivo){
    const error = new Error('Error el Id de Archivo ya esta en uso'); 
    return res.status(400).json({msg: error.message});
  }
};

export {
  isExistUSrMail,
  isNotExistApoyoName,
  wasRecordModified,
  isNotExistApoyoId,
  isNotExistApoyoOrd,
  isNotExistArchivoId
}