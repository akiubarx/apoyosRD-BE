import mongoose from "mongoose";

const archivoSchema = mongoose.Schema({
  id:{
    type: String,
    required: true,
    default: 0,
    unique: true
  },
  preload:{
    type: String,
    required: true,
    default: 0,
  },
  apoyo_id:{
    type: String,
    required: true,
    default: 0,
  },
  carpeta_id:{
    type: String,
    required: true,
    default: 0,
  },
  busqueda:{
    type: String,
    required: true,
    default: 0,
  },
  estado:{
    type: String,
    required: true,
    default: 0,
  },
  nombre:{
    type: String,
    required: true,
    trim: true,
  },
  descripcion:{
    type: String,
    required: true,
    trim: true,
  },
  fecha_publicacion:{
    type: String,
    default: 0,
  },
  fecha_modificacion:{
    type: String,
    default: 'NULL'
  },
  archivo:{
    type: String,
    required: true,
  },
  publico:{
    type: String,
    required: true,
    default: 1,
  },
  orden:{
    type: String,
    required: true,
    default: 1,
  },
  creado:{
    type: mongoose.Schema.Types.String,
    ref: 'Usuarios'
  },
  creacion:{
    type: String,
    default: 0,
  },  
  modificado:{
    type: mongoose.Schema.Types.String,
    ref: 'Usuarios',
    default: 'NULL'
  },
  modificacion:{
    type: String,
    default: 0,
  },  
  descargas:{
    type: String,
    required: true,
    default: 0,
  },
  file_size:{
    type: String,
    required: true,
    default: 0,
  },
},{
  timestamps: {
    createdAt: 'creacion',
    updatedAt: 'ultima_modificacion'
  }
});


const Archivo = mongoose.model('Archivo', archivoSchema, 'Archivos2');


export default Archivo;
