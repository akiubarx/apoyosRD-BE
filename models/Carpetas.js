import mongoose from "mongoose";

const carpetaSchema = mongoose.Schema({
  id:{
    type: String,
    required: true,
    default: 0,
    unique: true
  },
  parent_id:{
    type: String,
    required: true,
    default: 0,
  },
  nombre:{
    type: String,
    required: true,
    trim: true,
  },
});


const Carpeta = mongoose.model('Carpeta', carpetaSchema, 'Carpetas2');


export default Carpeta;
