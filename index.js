/* const express = require('express'); */
import express  from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from './models/db.js';
/* import connection from './models/db.js'; */
import usuariosRoutes from './routes/usuariosRoutes.js';
import carpetasRoutes from './routes/carpetasRoutes.js';
import archivosRoutes from './routes/archivosRoutes.js';
import apoyosRoutes from './routes/apoyosRoutes.js';

/* import routes from './routes/tutorial.routes.js'; */

const app = express();
dotenv.config();

//Aqui se configura el permiso de conexion entre BE y FE
const whitelist = [process.env.FRONTEND_URL];//Se setea la ruta en variable de entorno

const corsOptions = {
  origin: function(origin, callback){
    if(whitelist.includes(origin)){
      // Puede Consultar
      callback(null,true);
    } else {
      //No puede Consultar
      callback(new Error('Error de Cors'));
    }
  }
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Aplicación corriendo DB de Apoyos" });
});

connectDB();
//Routing
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/carpetas', carpetasRoutes);
app.use('/api/archivos', archivosRoutes);
app.use('/api/apoyos', apoyosRoutes);

//routes("./routes/tutorial.routes.js")(app);
// set port, listen for requests
/* const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});