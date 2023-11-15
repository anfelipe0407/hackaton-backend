"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    static associate(models) {
      this.hasMany(models.SubGrupo, {
        foreignKey: "id",
        as: "grupo",
      });
    }
  }
  Grupo.init(
    {
      cod_grupo: DataTypes.STRING,
      nombre_grupo: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Grupo",
      paranoid: true, //softdelete
    }
  );
  return Grupo;
};
