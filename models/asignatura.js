"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asignatura extends Model {
    static associate(models) {
      // this.hasMany(models.AsigSubGrupo, {
      //   foreignKey: "id",
      //   through: "AsigSubGrupos",
      //   as: "asignatura",
      // });

      // this.belongsTo(models.Area, { foreignKey: "id_area" });

      // asignatura - subgrupo (AsigSubgrupo)
      this.belongsToMany(models.SubGrupo, {
        through: "AsigSubGrupos",
        foreignKey: "id_asignatura",
      });

      this.belongsTo(models.AnioAcademico, { foreignKey: "id_anio_academico" });
    }
  }
  Asignatura.init(
    {
      codigo_asig: DataTypes.STRING,
      nombre_asig: DataTypes.STRING,
      descripcion_asig: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Asignatura",
      paranoid: true, //softdelete
    }
  );
  return Asignatura;
};
