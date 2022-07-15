import jwt from 'jsonwebtoken';

const generarJWT = ( id,_id ) => {
  //usr/secretKey/parametros
  return jwt.sign( { id,_id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

export default  generarJWT;