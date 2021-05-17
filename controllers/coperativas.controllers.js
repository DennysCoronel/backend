const { response } = require('express');


const Coperativa = require('../models/coperativa');
const { generarJWT } = require('../helpers/jwt');



const getCoperativas = async(req, res) => {
    const coperativa = await Coperativa.find({})
        .populate('usuario', 'nombreUsuario')
        .populate('usuarioM', 'nombreUsuario')
    res.json({
        ok: true,
        coperativa
    });
};

const crearCoperativa = async(req, res = response) => {

    const ids = req.id;
    const { nombre, img } = req.body;


    const coperativa = new Coperativa({
        usuario: ids,
        usuarioM: ids,
        ...req.body
    });

    console.log(coperativa);

    try {

        const existeCoperativa = await Coperativa.findOne({ nombre });

        if (existeCoperativa) {
            return res.status(400).json({
                ok: false,
                Msg: "Error Nombre de la Coperativa ya existe ",
            });
        }

        const coperativaGuardada = await coperativa.save();

        const token = await generarJWT(coperativa.id);

        res.json({
            ok: true,
            coperativa: coperativaGuardada,
            token,
            ids
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });
    }
};


const actulizarCoperativa = async(req, res = response) => {

    const ids = req.id;
    const id = req.params.id;


    try {

        const exiteCoperativa = await Coperativa.findById(id);
        if (!exiteCoperativa) {
            return res.status(400).json({
                ok: false,
                msg: "Error id no encontrado",
            });
        }

        const { nombre, ...campos } = req.body;
        if (exiteCoperativa.nombre !== nombre) {
            const duplicadoNombre = await Coperativa.findOne({ nombre });
            if (duplicadoNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: "Error nombre de Coperativa ya existente",
                });
            }
        }

        campos.nombre = nombre;
        campos.usuarioM = ids;
        const coperativaActulizado = await Coperativa.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            coperativa: coperativaActulizado

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
    getCoperativas,
    crearCoperativa,
    actulizarCoperativa,
};