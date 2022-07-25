import Apoyo from '../models/Apoyos.js';
import { isNotExistApoyoName, isExistId, isExistOrden } from '../customMiddelwares/validaciones.js'

//Consulta Global de Apoyos
const consultarApoyos = async (req,res) => {
  const apoyos = await Apoyo.find(); //find() busca por todos los registros existentes
  res.json(apoyos);
}

//Consulta Individual de Apoyo
const consultarApoyo = async (req,res) => {
  const { id } = req.body;
  const apoyo = await Apoyo.findOne({id}); //find() busca por todos los registros existentes
  res.json(apoyo);
}

//Creacion de Apoyo
const crearApoyo = async (req, res) => {
  if(isNotExistApoyoName({req,res})){
    const existeId = await Apoyo.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
    console.log(existeId)
    let newId = existeId.lenght ? parseInt(existeId[0].id) : 0;
    newId++;//Aumenta el ultimo registro en 1
    const existeOrd = await Apoyo.find({}).sort([['orden',-1]]).limit(1); //Busca el orden del ultimo registro
    console.log(existeOrd)
    let newOrd = existeOrd.lenght ? parseInt(existeOrd[0].orden) : 0;
    newOrd++;//Aumenta el ultimo registro en 1
    
    try {
      //
      const apoyos = new Apoyo({...req.body, id:newId, orden:newOrd});//añade un nuevo ID y Orden en caso de ser necesario
      apoyos.creado = req.usuario.username
      //
      const apoyosAlmacenado = await apoyos.save();
      res.json(apoyosAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };
};

const editarApoyo = async (req, res) => {

}

const eliminarApoyo = async (req, res) => {

}

// Exports del controlador
export {
  consultarApoyos,
  consultarApoyo,
  crearApoyo,
  editarApoyo,
  eliminarApoyo
};