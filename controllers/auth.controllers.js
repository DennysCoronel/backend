const { response } = require('express');
const bcrypt = require('bcryptjs');

const usuarios = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');

const logeo = async(req, res = response) => {

    const { nombreUsuario, password } = req.body;

    try {

        const usuarioExite = await usuarios.findOne({ nombreUsuario });

        if (!usuarioExite) {
            return res.status(500).json({
                ok: false,
                msg: "Error Usuario no encontrado",
            });

        }

        const validContrasenia = bcrypt.compareSync(password, usuarioExite.password);
        if (!validContrasenia) {

            return res.status(500).json({
                ok: false,
                msg: "Error Contrasenia no encontrado",
            });

        }

        const token = await generarJWT(usuarioExite.id);


        res.json({
            ok: true,
            token
        });




    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error Logeo",
        });

    }



};



module.exports = {
    logeo

};