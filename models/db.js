import mysql from 'mysql';
import mongoose from "mongoose";
/* import dbConfig from '../config/db.config.js'; */
// Create a connection to the database

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
}

/* const conectarDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestor_apoyos'
});
// open the MySQL connection
conectarDB.connect(error => {
  if (error) throw error;
  console.log("Se conecto a la base de datos correctamente");
}); */
export default connectDB;
/* module.exports = connection; */