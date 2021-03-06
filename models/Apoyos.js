import mongoose from "mongoose";

const apoyoSchema = mongoose.Schema({
  id:{
    type: String,
    required: true,
    default: 0,
    unique: true
  },
  publicado:{
    type: String,
    required: true
  },
  orden:{
    type: String,
    required: true,
    default: 0,
    unique: true
  },
  nombre:{
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descripcion:{
    type: String,
    required: true,
    trim: true,
  },
  categorias:{
    type: String,
    required: true,
    trim: true
  },
  estados:{
    type: String,
    required: true,
    trim: true
  },
  anio:{
    type: String,
    required: true,
    trim: true
  },
  imagen:{
    type: String,
    trim: true,
    default: null
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
    default: null
  },
  modificacion:{
    type: String,
    default: 0,
  },  
},{
  timestamps: {
    createdAt: 'creacion',
    updatedAt: 'ultima_modificacion'
  }
});


const Apoyo = mongoose.model('Apoyo', apoyoSchema, 'Apoyos2');


export default Apoyo;
