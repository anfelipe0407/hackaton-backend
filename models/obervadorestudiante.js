'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObervadorEstudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ObervadorEstudiante.init({
    id_estudiante: DataTypes.INTEGER,
    id_usuario_observante: DataTypes.INTEGER,
    observacion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ObervadorEstudiante',
  });
  return ObervadorEstudiante;
};