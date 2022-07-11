import express from "express";

const router = express.Router();
import { crearUsuario, editarUsuario, consultarUsuarios, autenticar } from '../controllers/usuariosController.js';

//GET
router.get('/', consultarUsuarios); //Muestra Usuarios
//POST
router.post('/', crearUsuario); //Crea nuevo Usuario
router.post('/login', autenticar); //Crea nuevo Usuario
//PUT
router.put('/', editarUsuario); //Editar Usuario

export default router;