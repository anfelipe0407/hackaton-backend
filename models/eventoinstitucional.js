"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventoInstitucional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AnioAcademico, {
        foreignKey: "id_anio_academico",
        as: "anio_academico_evento_ins",
      });
    }
  }
  EventoInstitucional.init(
    {
      titulo_evento: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      fecha_inicial: DataTypes.DATE,
      fecha_final: DataTypes.DATE,
      img_url: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
      id_anio_academico: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EventoInstitucional",
      paranoid: true, //softdelete
    }
  );
  return EventoInstitucional;
};
