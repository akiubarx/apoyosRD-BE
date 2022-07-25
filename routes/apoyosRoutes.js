import express from "express";

const router = express.Router();
import { 
  consultarApoyos,
  consultarApoyo,
  crearApoyo,
  editarApoyo,
  eliminarApoyo
 } from '../controllers/apoyosController.js';

import checkAuth from '../customMiddelwares/checkAuth.js'

//GET


//POST


//PUT


//Rutas agrupadas GET,POST,PUT
router.route('/').get(checkAuth, consultarApoyos).post(checkAuth, crearApoyo) //Muestra Apoyos //Crea nuevo Apoyo
router
.route('/:id')
.get(checkAuth, consultarApoyo ) //Muestra 1 Apoyo
.put(checkAuth, editarApoyo) //Edita 1 Apoyo
.delete(checkAuth, eliminarApoyo) //Elimina 1 Apoyo


export default router;