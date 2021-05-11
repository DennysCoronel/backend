const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on("unhandledRejection", (reason, promise) => {
    console.log("Entre al Rejection:", promise, "reason:", reason);
    throw new Error("Error en la conexion de la DB");
  });
  db.once("open", function () {
    console.log("Conectado Exitosamente a la DB");
  });
};

module.exports = {
  dbConnection,
};
