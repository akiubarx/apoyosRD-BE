import express from "express";

const router = express.Router();
import { crearUsuario, editarUsuario, consultarUsuarios, autenticar, confirmarUsuario, missingPassword } from '../controllers/usuariosController.js';

//GET
router.get('/', consultarUsuarios); //Muestra Usuarios
router.get('/confirmar/:token', confirmarUsuario); //Muestra Usuarios y por medio de ":token" genera un routing dinamico
//POST
router.post('/', crearUsuario); //Crea nuevo Usuario
router.post('/login', autenticar); //Crea nuevo Usuario
router.post('/missing-password', missingPassword); //Recuperar contraseña
//PUT
router.put('/', editarUsuario); //Editar Usuario

export default router;