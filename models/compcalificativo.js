"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // ComponenteCalificativo
  class CompCalificativo extends Model {
    static associate(models) {
      this.belongsTo(models.Periodo, {
        foreignKey: "id_periodo",
        as: "periodoComp",
      });

      this.belongsToMany(models.AsigSubGrupo, {
        through: "CompAsigSubs",
        foreignKey: "id_componente",
        as: "compcalificativos_asigsubgrupo",
      });
    }
  }
  CompCalificativo.init(
    {
      nombre_comp: DataTypes.STRING,
      id_periodo: DataTypes.INTEGER,
      porcentaje_estandar: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CompCalificativo",
      paranoid: true, //softdelete
    }
  );
  return CompCalificativo;
};
