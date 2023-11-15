'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActividadAsigTemas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActividadAsigTemas.init({
    id_actividad: DataTypes.INTEGER,
    id_tema: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ActividadAsigTemas',
  });
  return ActividadAsigTemas;
};