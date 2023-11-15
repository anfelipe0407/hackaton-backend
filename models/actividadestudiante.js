"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActividadEstudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Actividad, {
      //   foreignKey: "id_actividad",
      // });
      // this.belongsTo(models.Estudiante, {
      //   foreignKey: "id_estudiante",
      // });
    }
  }
  ActividadEstudiante.init(
    {
      id_actividad_asig: DataTypes.INTEGER,
      id_estudiante: DataTypes.INTEGER,
      respuesta: DataTypes.TEXT,
      comentario_docente: DataTypes.TEXT,
      fecha_entrega: DataTypes.DATE,
      tiempo_consumido_solucion: DataTypes.INTEGER,
      finalizado: DataTypes.BOOLEAN,
      calificacion: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ActividadEstudiante",
      paranoid: true, //softdelete
    }
  );
  return ActividadEstudiante;
};
