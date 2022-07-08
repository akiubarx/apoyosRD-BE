import express from "express";

const router = express.Router();
import { crearUsuario, editarUsuario, consultarUsuarios } from '../controllers/usuariosController.js';

router.get('/', consultarUsuarios); //Muestra Usuarios
router.post('/', crearUsuario); //Crea nuevo Usuario
router.put('/', editarUsuario); //Editar Usuario

export default router;