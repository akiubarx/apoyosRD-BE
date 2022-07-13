import Usuario from '../models/Usuarios.js';

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

export {
  isExistUSrMail,
  wasRecordModified
}