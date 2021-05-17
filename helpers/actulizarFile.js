const Coperativa = require('../models/coperativa');
const Datos = require('../models/datos');
const Usuario = require('../models/usuarios');

const fs = require('fs');


const borrarImg = (path) => {



    if (fs.existsSync(path)) {
        const a = fs.existsSync(path);
        fs.unlinkSync(path);

    }


}

const actulizarImagen = async(tipo, id, nombreArchivo) => {


    switch (tipo) {
        case 'Coperativas':
            const coperativa = await Coperativa.findById(id);
            if (!coperativa) {
                return false;
            }

            const pathViejo = `./uploads/Coperativas/${coperativa.img}`;

            borrarImg(pathViejo);

            coperativa.img = nombreArchivo;
            coperativa.save();

            return true;
            break;
        case 'Datos':

            const dato = await Datos.findById(id);
            if (!dato) {
                return false;
            }

            const pathV = `./uploads/Datos/${dato.img}`;
            console.log(pathV);

            borrarImg(pathV);

            dato.img = nombreArchivo;
            dato.save();

            return true;

            break;
        case 'Usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            const pathVie = `./uploads/Usuarios/${usuario.img}`;

            borrarImg(pathVie);

            usuario.img = nombreArchivo;
            usuario.save();

            return true;

            break;

        default:
            break;
    }




}

module.exports = {

    actulizarImagen


}