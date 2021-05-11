require("dotenv").config();

const expres = require("express");
const cors = require('cors');
const { dbConnection } = require("./database/config");


//Crear servidor
const app = expres();

//configuracion CORS
app.use(cors());

//base de datos
dbConnection();

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo " + process.env.PORT);
});


//Rutas
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "hola mundo",
  });

  // onuStIMeXtRo
});
