'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tema.init({
    id_unidad: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    titulo: DataTypes.STRING,
    introudccion: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tema',
  });
  return Tema;
};