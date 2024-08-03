const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
const sequelize = require("./config/database");
const cors = require("cors");

const app = express();

// Configura CORS
app.use(cors());

// Analiza JSON en el cuerpo de la solicitud
app.use(express.json());

// Configura las rutas de la API
app.use("/api", usuarioRoutes);

// Sincroniza la base de datos y arranca el servidor
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });
