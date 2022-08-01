import Archivo from '../models/Archivos.js';
import { isNotExistArchivoId } from '../customMiddelwares/validaciones.js'
import { formatDate } from '../helpers/dateFormat.js'

//Consulta Global de Archivos
const consultarArchivos = async (req,res) => {
  const apoyos = await Archivo.find(); //find() busca por todos los registros existentes
  res.json(apoyos);
}

//Consulta Individual de Archivo
const consultarArchivo = async (req,res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const apoyo = await Archivo.findOne({id}); //findOne() busca registro individual
  if (!apoyo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }
  res.json(apoyo);
}

//Creacion de Archivo
const crearArchivo = async (req, res) => {
  const existeId = await Archivo.find({}).sort([['id',-1]]).limit(1); //Busca el ultimo registro
  let newId = existeId.length > 0 ? parseInt(existeId[0].id) : 0; 
  newId++;
  //
  try {
    //
    const archivo = new Archivo({...req.body, id:newId});//añade un nuevo ID en caso de ser necesario
    archivo.creado = req.usuario.username
    archivo.creacion = formatDate(Date());
    //
    const archivoAlmacenado = await archivo.save();
    res.json(archivoAlmacenado);
  } catch (error) {
    console.log(error);
  };
};

const editarArchivo = async (req, res) => {
  const { id } = req.params; //Se cambia body por params cuando se trata de un GET 
  const archivo = await Archivo.findOne({id}); //findOne() busca registro individual
  if (!archivo){
    const error = new Error('Registro no encontrado');
    return res.status(404).json({ msg: error.message})
  }
  if (req.usuario.role_id == 2){
    archivo.id = req.body.id || archivo.id; //Permite modificar el ID solo para el ADMIN GENERAL
    archivo.apoyo_id = req.body.apoyo_id || archivo.apoyo_id;
    archivo.carpeta_id = req.body.carpeta_id || archivo.carpeta_id;
    archivo.estado = req.body.estado || archivo.estado; // Solo para el ADMIN
    archivo.nombre = req.body.nombre || archivo.nombre; // Añade el nuevo nombre o lo deja intacto en caso de no modificar
    archivo.descripcion = req.body.descripcion || archivo.descripcion;
    archivo.fecha_publicacion = req.body.fecha_publicacion || archivo.fecha_publicacion;
    archivo.fecha_modificacion = formatDate(Date());
    archivo.archivo = req.body.archivo || archivo.archivo;
    archivo.publico = req.body.publico || archivo.publico; // Solo para el ADMIN
    archivo.orden = req.body.orden || archivo.orden; // Permite modificar el Orden solo para el ADMIN GENERAL
    archivo.modificado = req.usuario.username || archivo.modificado;
    archivo.modificacion = formatDate(Date());
    archivo.file_size = req.body.file_size || archivo.file_size;

    if(isNotExistArchivoId({req,res})){
      try {
        const archivoModificado = await archivo.save()
        res.json(archivoModificado);
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    archivo.apoyo_id = req.body.apoyo_id || archivo.apoyo_id;
    archivo.carpeta_id = req.body.carpeta_id || archivo.carpeta_id;
    archivo.nombre = req.body.nombre || archivo.nombre; // Añade el nuevo nombre o lo deja intacto en caso de no modificar
    archivo.descripcion = req.body.descripcion || archivo.descripcion;
    archivo.fecha_publicacion = req.body.fecha_publicacion || archivo.fecha_publicacion;
    archivo.fecha_modificacion = formatDate(Date());
    archivo.archivo = req.body.archivo || archivo.archivo;
    archivo.modificado = req.usuario.username || archivo.modificado;
    archivo.modificacion = formatDate(Date());
    archivo.file_size = req.body.file_size || archivo.file_size;

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

const eliminarArchivo = async (req, res) => { 
  const { id } = req.params; // Solo el ADMIN GENERAL puede eliminar registros
  console.log(id);
  if (req.usuario.role_id == 1||2){
    const archivo = await Archivo.findOne({id}); //findOne() busca registro individual
    if (!archivo){
      const error = new Error('Registro no encontrado');
      return res.status(404).json({ msg: error.message})
    }
    try {
      await archivo.deleteOne()
      res.json({msg: 'Archivo Eliminado'});
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
  consultarArchivos,
  consultarArchivo,
  crearArchivo,
  editarArchivo,
  eliminarArchivo
};