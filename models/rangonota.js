"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RangoNota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AnioAcademico, {
        foreignKey: "id_anio_academico",
        as: "anio_academico_rn",
      });
    }
  }
  RangoNota.init(
    {
      inicial: DataTypes.FLOAT,
      final: DataTypes.FLOAT,
      letra: DataTypes.STRING,
      desempenio: DataTypes.STRING,
      id_anio_academico: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RangoNota",
      paranoid: true, //softdelete
    }
  );
  return RangoNota;
};
