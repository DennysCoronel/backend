const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");



const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [usuarios, total] = await Promise.all([

        Usuario.find({})
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        id: req.id,
        total

    });
};

const crearUsuarios = async(req, res = response) => {

    const { nombreUsuario, password, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        const existeNombreUsuario = await Usuario.findOne({ nombreUsuario });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                Msg: "Error correo ya existe ",
            });
        }

        if (existeNombreUsuario) {
            return res.status(400).json({
                ok: false,
                Msg: "Error Nombre de Usuario ya existe ",
            });
        }

        const usuario = new Usuario(req.body);
        //Encriptado de Contrasenia

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar Usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
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

const actulizarUsuarios = async(req, res = response) => {

    const id = req.params.id;


    try {

        const exiteUsuario = await Usuario.findById(id);
        if (!exiteUsuario) {
            return res.status(400).json({
                ok: false,
                msg: "Error id no encontrado",
            });
        }

        const { password, google, email, ...campos } = req.body;
        if (exiteUsuario.email !== email) {

            const duplicadoEmail = await Usuario.findOne({ email });
            if (duplicadoEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe Email",
                });
            }

        }

        campos.email = email;
        const usuarioActulizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });

        res.json({

            ok: true,
            usuario: usuarioActulizado

        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al Actulizar el Dato",
        });
    }
};


const eliminarUsuarios = async(req, res = response) => {
    const id = req.params.id;

    try {
        const exiteUsuario = await Usuario.findById(id);

        if (!exiteUsuario) {
            return res.status(400).json({
                ok: false,
                msg: "Error id no encontrado",
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.json({

            ok: true,
            ms: "si"

        });





    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al Borrar Datos",
        });

    }


};


module.exports = {
    getUsuarios,
    crearUsuarios,
    actulizarUsuarios,
    eliminarUsuarios
};