'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermisosEspeciales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PermisosEspeciales.init({
    id_actividad: DataTypes.INTEGER,
    id_estudiante: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PermisosEspeciales',
  });
  return PermisosEspeciales;
};