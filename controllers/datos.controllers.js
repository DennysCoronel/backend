const { response } = require('express');


const { generarJWT } = require('../helpers/jwt');
const Dato = require('../models/datos');

const getDatos = async(req, res) => {
    const datos = await Dato.find({})
        .populate('usuario', 'nombreUsuario')
        .populate('usuarioM', 'nombreUsuario')
    res.json({
        ok: true,
        datos
    });
};


const crearDatos = async(req, res = response) => {

    const ids = req.id;

    try {
        const dato = new Dato({ usuario: ids, usuarioM: ids, ...req.body });


        //guardar Usuario
        await dato.save();

        const token = await generarJWT(dato.id);

        console.log(token);

        res.json({
            ok: true,
            dato,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });
    }
};


const actulizarDatos = async(req, res = response) => {

    const ids = req.id;
    const id = req.params.id;

    try {

        const exiteDato = await Dato.findById(id);
        if (!exiteDato) {
            return res.status(400).json({
                ok: false,
                msg: "Error id no encontrado",
            });
        }

        const {...campos } = req.body;

        campos.usuarioM = ids;
        const datoActulizado = await Dato.findByIdAndUpdate(id, campos, { new: true });

        res.json({

            ok: true,
            usuario: datoActulizado

        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al Actulizar el Dato",
        });
    }
};


module.exports = {
    getDatos,
    crearDatos,
    actulizarDatos

};