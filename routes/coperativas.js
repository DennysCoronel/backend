const { Router } = require('express');

const { getCoperativas, crearCoperativa, actulizarCoperativa } = require("../controllers/coperativas.controllers");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get("/", getCoperativas);

router.post("/", [validarJWT,
        check("nombre", "El nombre de la Coperativa es Obligatorio")
        .not()
        .isEmpty(),
        validarCampos,
    ],
    crearCoperativa
);

router.put('/:id', [validarJWT,
        check("nombre", "El nombre de la Coperativa es Obligatorio")
        .not()
        .isEmpty(),
        validarCampos,
    ],
    actulizarCoperativa
);




module.exports = router;