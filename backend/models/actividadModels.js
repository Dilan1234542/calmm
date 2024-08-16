const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Actividad = sequelize.define(
  "Actividad",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    time: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    pattern: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    completado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "actividades",
  }
);

module.exports = Actividad;
