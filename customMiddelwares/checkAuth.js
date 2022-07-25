import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuarios.js';
const checkAuth = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]; //Con esto se obtiene el token y se omite leer el parametro Bearer

      //.verify lee y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.usuario = await Usuario.findById(decoded._id).select('-password -banned -ban_reason -is_activedirectory -token -created -modified -__v')//Excluimos parametros de la respuesta
      //req.usuario = await Usuario.findOne.decoded({id})//.select('-password')//Excluimos parametros de la respuesta
      console.log(req.usuario);
      return next();
    } catch (error) {
      /* console.log(token) */
      return res.status(404).json({msg:'Error con el Token'});
    }
  }
  if(!token){
    const error = new Error('Sesion terminada')
    return res.status(401).json({ msg: error.message });
  }
  next();
};

export default checkAuth;