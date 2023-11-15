"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AsigDocenteHistorico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AsigSubGrupo, { foreignKey: "id_asig_subgrupo" });

      this.belongsTo(models.Periodo, { foreignKey: "id_periodo" });
    }
  }

  AsigDocenteHistorico.init(
    {
      id_asig_subgrupo: DataTypes.INTEGER,
      id_docente_asignado: DataTypes.INTEGER, //no FK
      id_periodo: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AsigDocenteHistorico",
      paranoid: true, //softdelete
    }
  );

  return AsigDocenteHistorico;
};
