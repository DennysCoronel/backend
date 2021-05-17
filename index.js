require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//Crear servidor
const app = express();

//configuracion CORS
app.use(cors());

//lectura y parceo del body

app.use(express.json());

//base de datos
dbConnection();

//Ru    tas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/datos', require('./routes/datos'));
app.use('/api/coperativas', require('./routes/coperativas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/upload'));



// onuStIMeXtRo

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo " + process.env.PORT);
});