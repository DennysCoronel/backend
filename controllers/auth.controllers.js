const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');

const logeo = async(req, res = response) => {

    const { nombreUsuario, password } = req.body;

    try {

        const usuarioExite = await Usuario.findOne({ nombreUsuario });


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





const loginGoogle = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { email, picture, given_name, family_name } = await googleverify(googleToken);

        // correo no repetido 

        const usuarioexiste = await Usuario.findOne({ email });


        if (!usuarioexiste) {

            const userR = given_name.replace(/\s+/g, '');
            const random = userR + Math.round(Math.random() * (50 - 1000) + 50);
            const userName = new String(random);
            usuario = new Usuario({
                nombres: given_name,
                apellidos: family_name,
                email,
                password: '@@@',
                img: picture,
                google: true,
                estado: true,
                nombreUsuario: userName,

            });


        } else {

            usuario = usuarioexiste;
            usuario.google = true;
            const token = await generarJWT(Usuario.id);
            res.json({
                ok: true,
                msg: "Usuario Logeado mediante google y sistema",
                token
            });


        };

        await usuario.save();


        const token = await generarJWT(Usuario.id);

        res.json({
            ok: true,
            msg: "Aceptado mediante Google",
            token

        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Error Token no correcto ",
        });

    }




}


const renewToken = async(req, res = response) => {
    const id = req.id;
    const token = await generarJWT(id);
    res.json({
        ok: true,
        token,
    })
}


module.exports = {
    logeo,
    loginGoogle,
    renewToken

};