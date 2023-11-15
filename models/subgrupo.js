"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubGrupo extends Model {
    static associate(models) {
      this.hasMany(models.AsigSubGrupo, {
        foreignKey: "id",
        as: "subgrupo",
      });

      this.belongsTo(models.Grupo, {
        foreignKey: "id_grupo",
        as: "grupo",
      });

      // asignatura - subgrupo (AsigSubgrupo)
      this.belongsToMany(models.Asignatura, {
        through: "AsigSubGrupos",
        foreignKey: "id_subgrupo",
        as: "subgrupos_asignaturas",
      });
    }
  }
  SubGrupo.init(
    {
      cod_subgrupo: DataTypes.STRING,
      id_grupo: DataTypes.INTEGER,
      nombre_subgrupo: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "SubGrupo",
      paranoid: true, //softdelete
    }
  );
  return SubGrupo;
};
