"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    static associate(models) {
      this.hasMany(models.DepartamentoCargo, {
        foreignKey: "id",
        as: "departamento",
      });
    }
  }
  Departamento.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Departamento",
      paranoid: true, //softdelete
    }
  );
  return Departamento;
};
