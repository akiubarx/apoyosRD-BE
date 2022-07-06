import express from "express";

const router = express.Router();
import { usuarios, crearUsuario2, editarUsuario } from '../controllers/usuariosController.js';

router.get('/', usuarios); //Muestra Usuarios
router.post('/', crearUsuario2); //Crea nuevo Usuario
router.put('/', editarUsuario); //Editar Usuario

export default router;