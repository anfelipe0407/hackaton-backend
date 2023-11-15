"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AsigSubGrupo extends Model {
    static associate(models) {
      this.belongsTo(models.AsigArea, {
        foreignKey: "id_asig_area",
        as: "asig_area",
      });

      this.belongsTo(models.SubGrupo, {
        foreignKey: "id_subgrupo",
        as: "subgrupo",
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "id_docente_asignado",
        as: "docente",
      });
      // this.belongsTo(models.AnioAcademico, { foreignKey: "id_anio_academico" });

      this.hasMany(models.AsigDocenteHistorico, {
        foreignKey: "id",
      });

      this.belongsToMany(models.CompCalificativo, {
        through: "CompAsigSubs",
        foreignKey: "id_asig_subgrupo",
        as: "asigsubgrupos_compcalificativo",
      });

      this.belongsToMany(models.JornadaDetalle, {
        through: "HorarioSubgrupos",
        foreignKey: "id_asig_subgrupo",
        as: "asigsubgrupos_jornadadetalle",
      });

      // CARGA ACADEMICA --- usuario
      this.belongsToMany(models.Usuario, {
        through: "CargaAcademicas",
        foreignKey: "id_asig_subgrupo",
        as: "asigsubgrupo_usuario",
      });
    }
  }
  AsigSubGrupo.init(
    {
      id_asig_area: DataTypes.INTEGER,
      id_subgrupo: DataTypes.INTEGER,
      id_docente_asignado: DataTypes.INTEGER,
      intensidad_horaria: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AsigSubGrupo",
      paranoid: true, //softdelete
    }
  );
  return AsigSubGrupo;
};
