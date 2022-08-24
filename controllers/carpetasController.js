import Carpeta from '../models/Carpetas.js';
import { isNotExistArchivoId } from '../customMiddelwares/validaciones.js'

//Consulta Global de Archivos
const consultarCarpetas = async (req,res) => {
  const carpetas = await Carpeta.find(); //find() busca por todos los registros existentes
  res.json(carpetas);
}

//Consulta Individual de Archivo
const consultarCarpeta = async (req,res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const carpeta = await Carpeta.findOne({id}); //findOne() busca registro individual
  if (!carpeta){
    const error = new Error('Carpeta no encontrada');
    return res.status(404).json({ msg: error.message})
  }
  res.json(carpeta);
}

//Creacion de Archivo
const crearCarpeta = async (req, res) => {
  const existeId = await Carpeta.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
  let newId = existeId.length > 0 ? parseInt(existeId[0].id) : 0; 
  newId++;
  //
  try {
    //
    const carpeta = new Carpeta({...req.body, id:newId});//añade un nuevo ID en caso de ser necesario
    //
    //const carpetaAlmacenado = 
    await carpeta.save();
    res.json({msg: `La carpeta Carpeta ${carpeta.nombre} se creo exitosamente con el Id ${carpeta.id}`});
  } catch (error) {
    console.log(error);
  };
};

const editarCarpeta = async (req, res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const archivo = await Carpeta.findOne({id}); //findOne() busca registro individual
  if (!archivo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }
  if (req.usuario.role_id == 2){
    archivo.id = req.body.id || archivo.id; //Permite modificar el ID solo para el ADMIN GENERAL
    archivo.parent_id = req.body.parent_id || archivo.parent_id;
    archivo.nombre = req.body.nombre || archivo.nombre; // Añade el nuevo nombre o lo deja intacto en caso de no modificar

    if(isNotExistArchivoId({req,res})){
      try {
        const archivoModificado = await archivo.save()
        res.json(archivoModificado);
      } catch (error) {
        console.log(error)
      }
    }
  } else if (req.usuario.role_id == 1){
    archivo.parent_id = req.body.parent_id || archivo.parent_id;
    archivo.nombre = req.body.nombre || archivo.nombre; // Añade el nuevo nombre o lo deja intacto en caso de no modificar

    if(isNotExistArchivoId({req,res})){
      try {
        const archivoModificado = await archivo.save()
        res.json(archivoModificado);
      } catch (error) {
        console.log(error)
      }
    }
  }
};

const eliminarCarpeta = async (req, res) => { 
  const { id } = req.params; // Solo el ADMIN GENERAL puede eliminar registros
  console.log(id);
  if (req.usuario.role_id == 1||2){
    const archivo = await Carpeta.findOne({id}); //findOne() busca registro individual
    if (!archivo){
      const error = new Error('Registro no encontrado');
      return res.status(404).json({ msg: error.message})
    }
    try {
      await archivo.deleteOne()
      res.json({msg: 'Carpeta Eliminada'});
    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error('No cuenta con los permisos necesarios');
    return res.status(404).json({ msg: error.message})
  }
}

// Exports del controlador
export {
  consultarCarpetas,
  consultarCarpeta,
  crearCarpeta,
  editarCarpeta,
  eliminarCarpeta
};