import Apoyo from '../models/Apoyos.js';
import { isNotExistApoyoName } from '../customMiddelwares/validaciones.js'

//Consulta Global de Apoyos
const consultarApoyos = async (req,res) => {
  const apoyos = await Apoyo.find(); //find() busca por todos los registros existentes
  res.json(apoyos);
}

//Consulta Individual de Apoyo
const consultarApoyo = async (req,res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const apoyo = await Apoyo.findOne({id}); //findOne() busca registro individual
  if (!apoyo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }
  res.json(apoyo);
}

//Creacion de Apoyo
const crearApoyo = async (req, res) => {
  if(isNotExistApoyoName({req,res})){
    const existeId = await Apoyo.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
    let newId = existeId.length > 0 ? parseInt(existeId[0].id) : 0; 
    newId++;
    //
    const existeOrd = await Apoyo.find({}).sort([['orden',-1]]).limit(1); //Busca el orden del ultimo registro
    let newOrd = existeOrd.length > 0 ? parseInt(existeOrd[0].orden) : 0;    
    newOrd++;
    //
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
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const apoyo = await Apoyo.findOne({id}); //findOne() busca registro individual
  if (!apoyo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }

  apoyo.nombre = req.body.nombre || apoyo.nombre; // Añade el nuevo nombre o lo deja intacto en caso de no modificar
  apoyo.descripcion = req.body.descripcion || apoyo.descripcion;
  apoyo.categorias = req.body.categorias || apoyo.categorias;
  apoyo.estados = req.body.estados || apoyo.estados;
  apoyo.anio = req.body.anio || apoyo.anio;
  apoyo.modificado = req.usuario.username || apoyo.modificado;

  try {
    const apoyoModificado = await apoyo.save()
    res.json(apoyoModificado);
  } catch (error) {
    console.log(error)
  }

}

const eliminarApoyo = async (req, res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const apoyo = await Apoyo.findOne({id}); //findOne() busca registro individual
  if (!apoyo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }
  try {
    const apoyoModificado = await apoyo.delete()
    res.json('Apoyo Eliminado');
  } catch (error) {
    console.log(error)
  }

}

// Exports del controlador
export {
  consultarApoyos,
  consultarApoyo,
  crearApoyo,
  editarApoyo,
  eliminarApoyo
};