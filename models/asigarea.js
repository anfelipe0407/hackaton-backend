"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AsigArea extends Model {
    static associate(models) {
      this.hasMany(models.AsigSubGrupo, {
        foreignKey: "id",
        as: "asig_area",
      });

      this.belongsTo(models.Area, { foreignKey: "id_area", as: "area" });

      this.belongsTo(models.Asignatura, {
        foreignKey: "id_asignatura",
        as: "asignatura",
      });

      this.belongsTo(models.AnioAcademico, { foreignKey: "id_anio_academico" });
    }
  }
  AsigArea.init(
    {
      id_asignatura: DataTypes.INTEGER,
      id_area: DataTypes.INTEGER,
      porcentaje: DataTypes.INTEGER,
      id_anio_academico: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AsigArea",
      paranoid: true, //softdelete
    }
  );
  return AsigArea;
};
