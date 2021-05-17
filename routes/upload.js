const { Router } = require('express');
const { actulizarDocumento, getFoto } = require("../controllers/upload.controllers");
const { validarJWT } = require('../middlewares/validar-jwt');

const fileUpload = require('express-fileUpload');


const router = Router();

router.use(fileUpload());

router.put("/:tabla/:id", validarJWT, actulizarDocumento, fileUpload);
router.get("/:tabla/:foto", getFoto, fileUpload);






module.exports = router;