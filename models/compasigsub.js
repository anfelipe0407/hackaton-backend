"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CompAsigSub extends Model {
    static associate(models) {
      this.belongsTo(models.CompCalificativo, {
        foreignKey: "id_componente",
        as: "compCalificativoAsigSub",
      });
      this.belongsTo(models.AsigSubGrupo, {
        foreignKey: "id_asig_subgrupo",
        as: "AsigSubgrupoComp",
      });
    }
  }
  CompAsigSub.init(
    {
      id_componente: DataTypes.INTEGER,
      id_asig_subgrupo: DataTypes.INTEGER,
      porcentaje: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CompAsigSub",
      paranoid: true, //softdelete
    }
  );
  return CompAsigSub;
};
