"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartamentoCargo extends Model {
    static associate(models) {
      this.belongsTo(models.Departamento, {
        foreignKey: "id_departamento",
        as: "departamento",
      });
    }
  }
  DepartamentoCargo.init(
    {
      id_departamento: DataTypes.INTEGER,
      cargo: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "DepartamentoCargo",
      paranoid: true, //softdelete
    }
  );
  return DepartamentoCargo;
};
