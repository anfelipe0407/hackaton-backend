'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreguntaEnunciado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreguntaEnunciado.init({
    id_enunciado: DataTypes.INTEGER,
    id_pregunta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PreguntaEnunciado',
  });
  return PreguntaEnunciado;
};