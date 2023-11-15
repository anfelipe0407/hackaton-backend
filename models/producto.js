"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {}
  }
  Producto.init(
    {
      nombre: DataTypes.STRING,
      metros_por_paquete: DataTypes.INTEGER,
      precio: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return Producto;
};
