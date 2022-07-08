import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
  id:{
    type: String,
    required: true,
    default: 0,
    unique: true
  },
  role_id:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  banned:{
    type: String,
    default: "0"
  },
  ban_reason:{
    type: String,
    default: "NULL"
  },
  is_activedirectory:{
    type: Boolean,
    default: false
  },
  token:{
    type: String
  }
},{
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
});

usuarioSchema.pre('save', async function(next){
  if (!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const Usuario = mongoose.model('Usuario', usuarioSchema, 'Usuarios');


export default Usuario;
