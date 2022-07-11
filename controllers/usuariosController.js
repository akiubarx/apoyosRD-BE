import { send } from 'process';
import { isExistUSrMail, wasRecordModified } from '../customMiddelwares/validaciones.js';
import generarTokenM from '../helpers/generarTokenManual.js';
import Usuario from '../models/Usuarios.js';

//Consulta Global de Usuarios
const consultarUsuarios = async (req, res) => {
  const usuarios = await Usuario.find(); //find() busca por todos los registros existentes
  res.json(usuarios);
}

//Creacion de Usuario
const crearUsuario = async (req, res) => {

  if (isExistUSrMail({ req, res })) {
    const existeId = await Usuario.find({}).sort([['id', -1]]).limit(1); //Busca el ultimo registro
    let newId = parseInt(existeId[0].id);
    if (newId) newId++;//Aumenta el ultimo registro en 1

    try {
      const usuario = new Usuario({ ...req.body, id: newId });//añade un nuevo ID en caso de ser necesario
      usuario.token = generarTokenM();
      const usuarioAlmacenado = await usuario.save();
      res.json(usuarioAlmacenado);
    } catch (error) {
      console.log('Error al registrar Usuario', error);
    }
  };
}

//Edicion de Usuario
const editarUsuario = async (req, res) => {
  const { id } = req.body;
  try {
    const usuarioModificado = await Usuario.updateOne({ id: id }, { $set: req.body });

    if (wasRecordModified({ model: usuarioModificado })) {
      res.json({ msg: "Usuario modificado" });
    } else {
      res.status(301).json({ msg: "Usuario no existe" })
    }
  } catch (error) {
    console.log('Error al editar Usuario', error);
  }

}

// Exports del controlador
export {
  consultarUsuarios,
  crearUsuario,
  editarUsuario
};
