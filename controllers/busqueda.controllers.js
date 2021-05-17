const { response } = require('express');
const Coperativa = require('../models/coperativa');
const Datos = require('../models/datos');
const Usuario = require('../models/usuarios');

const getTodo = async(req, res = response) => {


    const nombre = req.params.nombre;

    const recExNombre = new RegExp(nombre, 'i') //busqueda flexible 

    try {


        const [usuarioss] = await Promise.all(
            [

                Usuario.find({ nombreUsuario: recExNombre })

            ])

        res.json({
            ok: true,
            usuarioss
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });

    }


};

const getDocumentos = async(req, res = response) => {

    const tab = req.params.tabla;
    const nombre = req.params.nombre;
    const recExNombre = new RegExp(nombre, 'i');

    console.log(tab);

    let data = [];

    switch (tab) {
        case 'usuario':
            data = await Usuario.find({ nombreUsuario: recExNombre });

            break;
        case 'coperativas':
            data = await Coperativa.find({ nombre: recExNombre });

            break;

        case 'datos':
            data = await Datos.find({ nombres: recExNombre });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: "tabla no existente",
            });


    }
    res.json({
        ok: true,
        resultados: data
    });



};


module.exports = {
    getTodo,
    getDocumentos

};