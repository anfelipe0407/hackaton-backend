"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unidad extends Model {
    static associate(models) {}
  }
  Unidad.init(
    {
      id_asignatura: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      resumen: DataTypes.TEXT,
      banner_url: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Unidad",
    }
  );
  return Unidad;
};
