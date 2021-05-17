const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');
const { getDatos, crearDatos, actulizarDatos } = require("../controllers/datos.controllers");

const router = Router();

router.get("/", getDatos);


router.post("/", [validarJWT,
        check("cedula", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nombres", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("apellidos", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nOficio", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nAnexo", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nJucio", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("fechaRemicionP", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("entidadSolicitante", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("fecha", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("remitente", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        validarCampos,
    ],
    crearDatos
);

router.put("/:id", [validarJWT,
        check("cedula", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nombres", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("apellidos", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nOficio", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nAnexo", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("nJucio", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("fechaRemicionP", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("entidadSolicitante", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("fecha", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        check("remitente", "El nombre de Usuario es Obligatori")
        .not()
        .isEmpty(),
        validarCampos,
    ],
    actulizarDatos
);





module.exports = router;