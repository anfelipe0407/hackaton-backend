'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RespuestasEstExamen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RespuestasEstExamen.init({
    id_actividad_estudiante: DataTypes.INTEGER,
    id_pregunta_examen: DataTypes.INTEGER,
    opcionn_elegida: DataTypes.STRING,
    respuesta_abierta: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RespuestasEstExamen',
  });
  return RespuestasEstExamen;
};