import express from "express";

const router = express.Router();
import { 
  crearUsuario, 
  editarUsuario, 
  consultarUsuarios, 
  autenticar, 
  confirmarUsuario, 
  missingPassword,
  comprobarToken,
  nuevoPassword,
  perfil
 } from '../controllers/usuariosController.js';

 import checkAuth from '../customMiddelwares/checkAuth.js'

//GET
router.get('/', consultarUsuarios); //Muestra Usuarios
router.get('/confirmar/:token', confirmarUsuario); //Muestra Usuarios y por medio de ":token" genera un routing dinamico
router.get('/perfil', checkAuth, perfil); //Valida al usuario
//POST
router.post('/', crearUsuario); //Crea nuevo Usuario
router.post('/login', autenticar); //Acceso de Usuario
router.post('/missing-password', missingPassword); //Recuperar contraseña
//PUT
router.put('/', editarUsuario); //Editar Usuario

//Rutas agrupadas GET,POST,PUT
router.route('/missing-password/:token').get(comprobarToken).post(nuevoPassword); //Comprobar Token //Gerar nuevo Password - Relacionado con 'missingPassword'

export default router;