const { Router } = require('express');
const { logeo, loginGoogle } = require("../controllers/auth.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");



const router = Router();


router.post('/', [
    check('nombreUsuario', 'El nombre de Usuario es Obligatorio').not().isEmpty(),
    check('password', 'El password de Usuario es Obligatorio').not().isEmpty(),
    validarCampos
], logeo)


router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], loginGoogle);



module.exports = router;