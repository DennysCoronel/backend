// RUTA DE USUARIO

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
    getUsuarios,
    crearUsuarios,
    actulizarUsuarios,
    eliminarUsuarios,
} = require("../controllers/usuarios.controllers");

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//controlador Usuarios
router.get("/", validarJWT, getUsuarios);

router.post("/", [
        check("nombreUsuario", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("email", " El Correo es Obligatorio").not().isEmpty(),
        check("email", "Correo no Valido").isEmail(),
        check("password", "La contraseña  es Obligatoria").not().isEmpty(),
        validarCampos,
    ],
    crearUsuarios
);

router.put('/:id', [validarJWT,
        check("nombreUsuario", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("email", " El Correo es Obligatorio").not().isEmpty(),
        check("email", "Correo no Valido").isEmail(),
        //   check("role", "El rol es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    actulizarUsuarios
);

router.delete("/:id", validarJWT, eliminarUsuarios);

module.exports = router;