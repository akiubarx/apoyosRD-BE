import express from "express";

const router = express.Router();
import { 
  consultarArchivos,
  consultarArchivo,
  crearArchivo,
  editarArchivo,
  eliminarArchivo
 } from '../controllers/archivosController.js';

import checkAuth from '../customMiddelwares/checkAuth.js'

//GET


//POST


//PUT


//Rutas agrupadas GET,POST,PUT
router.route('/').get(checkAuth, consultarArchivos).post(checkAuth, crearArchivo) //Muestra Archivos //Crea nuevo Archivo
router
.route('/:id')
.get(checkAuth, consultarArchivo ) //Muestra 1 Archivo
.put(checkAuth, editarArchivo) //Edita 1 Archivo
.delete(checkAuth, eliminarArchivo) //Elimina 1 Archivo


export default router;