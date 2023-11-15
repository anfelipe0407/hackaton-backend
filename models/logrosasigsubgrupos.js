'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogrosAsigSubgrupos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogrosAsigSubgrupos.init({
    id_logro: DataTypes.INTEGER,
    id_asig_subgrupo: DataTypes.INTEGER,
    id_periodo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LogrosAsigSubgrupos',
  });
  return LogrosAsigSubgrupos;
};