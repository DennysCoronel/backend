const { Schema, model } = require("mongoose");

const CoperativaShema = Schema({

    nombre: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: false,
    },
    estado: {
        type: Boolean,
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
    },


});

CoperativaShema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model("Coperativa", CoperativaShema);