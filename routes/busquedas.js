//const { check } = require("express-validator");
//const { validarCampos } = require("../middlewares/validar-campos");
const { Router } = require('express');
const { getTodo, getDocumentos } = require("../controllers/busqueda.controllers");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/:nombre", validarJWT, getTodo);
router.get("/coleccion/:tabla/:nombre", getDocumentos);


module.exports = router;