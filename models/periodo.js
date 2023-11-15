"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Periodo extends Model {
    static associate(models) {
      this.hasMany(models.CompCalificativo, {
        foreignKey: "id",
        as: "periodoComp",
      });

      this.belongsTo(models.AnioAcademico, {
        foreignKey: "id_anio_academico",
        as: "anio_academico_periodo",
      });
    }
  }
  Periodo.init(
    {
      nombre: DataTypes.STRING, //primer_periodo, segundo_periodo
      inicio_periodo: DataTypes.DATEONLY,
      fin_periodo: DataTypes.DATEONLY,
      id_anio_academico: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Periodo",
      paranoid: true, //softdelete
    }
  );
  return Periodo;
};
