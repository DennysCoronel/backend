const { Schema, model } = require("mongoose");

const DatoShema = Schema({

    cedula: {
        type: String,
        require: true,
    },
    tipodePersona: {
        type: String,
        require: false,
    },
    ruc: {
        type: String,
        require: false,
    },
    nombres: {
        type: String,
        require: true,
    },
    apellidos: {
        type: String,
        require: true,
    },
    nOficio: {
        type: String,
        require: true,
    },
    nAnexo: {
        type: String,
        require: true,
    },
    nJucio: {
        type: String,
        require: true,
    },
    fechaRemicionP: {
        type: String,
        require: true,
    },
    entidadSolicitante: {
        type: String,
        require: true,
    },
    accion: {
        type: String,
        require: false,
    },
    ciudad: {
        type: String,
        require: false,
    },
    fecha: {
        type: String,
        require: true,
    },
    remitente: {
        type: String,
        require: true,
    },
    observacion: {
        type: String,
        require: false,
    },
    notificacion: {
        type: Boolean,
        require: false,
    },
    img: {
        type: String,
        require: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    usuarioM: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }


});

DatoShema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model("Dato", DatoShema);