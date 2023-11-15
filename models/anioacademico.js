"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AnioAcademico extends Model {
    static associate(models) {
      this.hasMany(models.Periodo, {
        foreignKey: "id",
        as: "anio_academico_periodo",
      });

      this.hasMany(models.Jornada, {
        foreignKey: "id",
        as: "anio_academico_jornada",
      });

      this.hasMany(models.RangoNota, {
        foreignKey: "id",
        as: "anio_academico_rn",
      });

      this.hasMany(models.EventoInstitucional, {
        foreignKey: "id",
        as: "anio_academico_evento_ins",
      });
    }
  }
  AnioAcademico.init(
    {
      inicio_anio: DataTypes.DATEONLY,
      fin_anio: DataTypes.DATEONLY,
      tipo_calendario: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AnioAcademico",
      paranoid: true, //softdelete
    }
  );
  return AnioAcademico;
};
