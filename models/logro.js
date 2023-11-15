"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logro.init(
    {
      id_unidad: DataTypes.INTEGER,
      descripcion: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Logro",
    }
  );
  return Logro;
};
