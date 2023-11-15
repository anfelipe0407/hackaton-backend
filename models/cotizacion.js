"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cotizacion extends Model {
    static associate(models) {}
  }
  Cotizacion.init(
    {
      id_cliente: DataTypes.INTEGER,
      id_asesor: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      descuento: DataTypes.INTEGER,
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cotizacion",
    }
  );
  return Cotizacion;
};
