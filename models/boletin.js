'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boletin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Boletin.init({
    id_asig_subgrupo: DataTypes.INTEGER,
    id_periodo: DataTypes.INTEGER,
    id_comp_asig_sub: DataTypes.INTEGER,
    id_estudiante: DataTypes.INTEGER,
    acumulado: DataTypes.FLOAT,
    recuperacion_nota: DataTypes.FLOAT,
    recuperacion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Boletin',
  });
  return Boletin;
};