"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      // this.hasMany(models.AsigSubGrupo, {
      //   foreignKey: "id",
      //   through: "AsigSubGrupos",
      //   as: "area",
      // });

      this.belongsToMany(models.Asignatura, {
        through: "AsigAreas",
        foreignKey: "id_area",
        as: "area",
      });
    }
  }
  Area.init(
    {
      codigo_area: DataTypes.STRING,
      nombre_area: DataTypes.STRING,
      descripcion_area: DataTypes.TEXT,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Area",
      paranoid: true, //softdelete
    }
  );
  return Area;
};
