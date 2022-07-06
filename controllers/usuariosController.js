import Usuario from '../models/Usuarios.js';

const usuarios = (req, res) => {
  try {
    conectarDB.query('SELECT * from adx_users', (error,result) => {
      res.json(result)
    })
  } catch (error) {
    console.log(error);
  }
};

const crearUsuario2 = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({email});
  if(existeUsuario){
    const error = new Error('Usuario ya registrado');
    return re.status(400).json({msg: error.message});
  }
  try {
    const usuario = new Usuario(req.body);
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
}

/* const crearUsuario = (req, res) => {
  const { email } = req.body;
  const existeUsuario = await usuarios.findOne({email})
  console.log (existeUsuario);
  try {
    conectarDB.query('INSERT INTO adx_users SET ?', req.body, (error, result, fields) => {
      console.log(result);
    })
  } catch (error) {
    console.log(error);
  }
} */

const editarUsuario = (req, res) => {
  try {
    conectarDB.query('UPDATE adx_users SET data = ? WHERE id = ?', (error,result) => {
      res.json(result)
    })
  } catch (error) {
    console.log(error);
  }
};

export {
  usuarios, 
  crearUsuario2,
  editarUsuario
};