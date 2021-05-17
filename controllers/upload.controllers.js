const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actulizarImagen } = require('../helpers/actulizarFile')

const fs = require('fs');

const path = require('path');





const actulizarDocumento = async(req, res = response) => {

    const tipo = req.params.tabla;
    const id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Error no hay archivo'

        })
    }

    const validos = ['Coperativas', 'Datos', 'Usuarios'];

    if (!validos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error no es tipo'
        })
    };
    // procesar Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];
    //validar extencion 
    const extencionesValidas = ['.jpg', '.png'];

    if (extencionesValidas.includes(extencionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error extencion no validad'
        });
    }

    // Generar Nombre 

    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    // direcion de la imagen 

    const path = `./uploads/${tipo}/${nombreArchivo}`;


    actulizarImagen(tipo, id, nombreArchivo);


    file.mv(path, (err) => {
        if (err) {

            console.log(err);

            return res.status(500).json({
                ok: false,
                msg: 'Error path '
            });

        }

        // actulizar base de datos






        res.json({
            ok: true,
            nombreArchivo,
            path
        })
    });



};


const getFoto = async(req, res = response) => {



    const tipo = req.params.tabla;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
        res.sendFile(pathImg);

    } else {

        const pathImg = path.join(__dirname, `../uploads/sistema/noimag.jpg`);
        res.sendFile(pathImg);
    }



};

module.exports = {
    actulizarDocumento,
    getFoto

};