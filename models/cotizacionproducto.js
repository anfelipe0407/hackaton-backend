"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CotizacionProducto extends Model {
    static associate(models) {}
  }
  CotizacionProducto.init(
    {
      id_cotizacion: DataTypes.INTEGER,
      id_producto: DataTypes.INTEGER,
      cantidad: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CotizacionProducto",
    }
  );
  return CotizacionProducto;
};
