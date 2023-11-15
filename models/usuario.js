"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {}
  }
  Usuario.init(
    {
      nombre: DataTypes.STRING,
      num_identificacion: DataTypes.INTEGER,
      usuario: DataTypes.STRING,
      clave: DataTypes.STRING,
      tipo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
