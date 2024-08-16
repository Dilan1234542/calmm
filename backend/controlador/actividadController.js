const sequelize = require("../config/database");

// Obtener todas las actividades de respiración
exports.getAllActividades = async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM actividades");
    res.json(results);
  } catch (err) {
    console.error("Error al obtener actividades:", err);
    res.status(500).send("Error al obtener actividades");
  }
};

// Obtener una actividad específica
exports.getActividadById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM actividades WHERE id = ?",
      {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Actividad no encontrada");
    }
  } catch (err) {
    console.error("Error al obtener la actividad:", err);
    res.status(500).send("Error al obtener la actividad");
  }
};

// Actualizar una actividad (marcar como completada)
exports.updateActividad = async (req, res) => {
  const { id } = req.params;
  const { completado } = req.body;
  try {
    const [result] = await sequelize.query(
      "UPDATE actividades SET completado = ? WHERE id = ?",
      {
        replacements: [completado, id],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (result[1] > 0) {
      // result[1] es el número de filas afectadas
      res.send("Actividad actualizada");
    } else {
      res.status(404).send("Actividad no encontrada");
    }
  } catch (err) {
    console.error("Error al actualizar la actividad:", err);
    res.status(500).send("Error al actualizar la actividad");
  }
};
