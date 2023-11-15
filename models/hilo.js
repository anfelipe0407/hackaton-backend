'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hilo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hilo.init({
    id_actividad_asig: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    respuesta: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Hilo',
  });
  return Hilo;
};