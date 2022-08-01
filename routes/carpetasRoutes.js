import express from "express";

const router = express.Router();
import { 
  consultarCarpetas,
  consultarCarpeta,
  crearCarpeta,
  editarCarpeta,
  eliminarCarpeta
 } from '../controllers/carpetasController.js';

import checkAuth from '../customMiddelwares/checkAuth.js'

//GET


//POST


//PUT


//Rutas agrupadas GET,POST,PUT
router.route('/').get(checkAuth, consultarCarpetas).post(checkAuth, crearCarpeta) //Muestra Carpetas //Crea nuevo Carpeta
router
.route('/:id')
.get(checkAuth, consultarCarpeta ) //Muestra 1 Carpeta
.put(checkAuth, editarCarpeta) //Edita 1 Carpeta
.delete(checkAuth, eliminarCarpeta) //Elimina 1 Carpeta


export default router;