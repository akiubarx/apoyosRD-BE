import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({collection: 'gestor_apoyos.apoyos.adx_users'},{
    username:{
      type: String,
      required: true,
      trim: true
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
    role_id:{
      type: String,
      required: true
    }
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;