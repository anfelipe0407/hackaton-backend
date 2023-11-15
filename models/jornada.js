"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jornada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AnioAcademico, {
        foreignKey: "id_anio_academico",
        as: "anio_academico_jornada",
      });
    }
  }
  Jornada.init(
    {
      hora_inicio: DataTypes.TIME,
      hora_fin: DataTypes.TIME,
      id_anio_academico: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Jornada",
      paranoid: true, //softdelete
    }
  );
  return Jornada;
};
