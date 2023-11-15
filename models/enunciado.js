'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enunciado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enunciado.init({
    enunciado: DataTypes.TEXT,
    url_video: DataTypes.STRING,
    url_imagen: DataTypes.STRING,
    url_audio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enunciado',
  });
  return Enunciado;
};