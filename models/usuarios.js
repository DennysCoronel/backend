const { Schema, model } = require("mongoose");

const UsuarioShema = Schema({
  nombres: {
    type: String,
    require: false,
  },
  apellidos: {
    type: String,
    require: false,
  },
  nombreUsuario: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioShema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Usuario", UsuarioShema);
