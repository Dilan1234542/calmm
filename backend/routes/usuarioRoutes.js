const express = require("express");
const router = express.Router();
const usuarioController = require("../controlador/usuarioController");

// Rutas para los libros
router.get("/usuario", usuarioController.getAllUsuario);
router.get("/usuario/:id", usuarioController.getUsuarioById);
router.post("/login", usuarioController.authenticateUser);
router.post("/signup", usuarioController.createUser);

module.exports = router;
