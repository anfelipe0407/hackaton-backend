'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MallaCurricular extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MallaCurricular.init({
    id_unidad: DataTypes.INTEGER,
    id_grupo: DataTypes.INTEGER,
    id_periodo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MallaCurricular',
  });
  return MallaCurricular;
};