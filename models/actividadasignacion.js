"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActividadAsignacion extends Model {
    static associate(models) {}
  }
  ActividadAsignacion.init(
    {
      id_actividad: DataTypes.INTEGER,
      id_asig_subgrupo: DataTypes.INTEGER,
      id_docente_asignado: DataTypes.INTEGER,
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
      tiempo_max: DataTypes.INTEGER,
      tiempo_por_pregunta: DataTypes.INTEGER,
      id_comp_asigsub: DataTypes.INTEGER,
      max_adjuntos: DataTypes.INTEGER,
      calificacion_automatica: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ActividadAsignacion",
    }
  );
  return ActividadAsignacion;
};
