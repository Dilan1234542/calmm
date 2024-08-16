const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nombreCompleto: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    correoElectronico: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    activo: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    perfilAdministrador: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    perfilPublico: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
  }
);

module.exports = Usuario;
