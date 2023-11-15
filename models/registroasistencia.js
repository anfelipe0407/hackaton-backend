"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegistroAsistencia extends Model {
    static associate(models) {}
  }
  RegistroAsistencia.init(
    {
      id_asig_subgrupo: DataTypes.INTEGER,
      id_periodo: DataTypes.INTEGER,
      id_estudiante: DataTypes.INTEGER,
      fecha: DataTypes.STRING,
      presente: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RegistroAsistencia",
    }
  );
  return RegistroAsistencia;
};
