const { Router } = require('express');
const { logeo } = require("../controllers/auth.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");



const router = Router();


router.post('/', [
    check('nombreUsuario', 'El nombre de Usuario es Obligatorio').not().isEmpty(),
    check('password', 'El password de Usuario es Obligatorio').not().isEmpty(),
    validarCampos
], logeo)



module.exports = router;