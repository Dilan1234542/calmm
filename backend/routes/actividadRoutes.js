const express = require("express");
const router = express.Router();
const actividadController = require("../controlador/actividadController");

// Obtener todas las actividades de respiración
router.get("/actividades", actividadController.getAllActividades);

// Obtener una actividad específica
router.get("/actividades/:id", actividadController.getActividadById);

// Actualizar una actividad (marcar como completada)
router.patch("/actividades/:id", actividadController.updateActividad);

module.exports = router;
