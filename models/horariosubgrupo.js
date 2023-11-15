"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HorarioSubgrupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.JornadaDetalle, {
        foreignKey: "id_jornada_detalles",
      });

      this.belongsTo(models.AsigSubGrupo, { foreignKey: "id_asig_subgrupo" });
    }
  }
  HorarioSubgrupo.init(
    {
      id_jornada_detalles: DataTypes.INTEGER,
      id_asig_subgrupo: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "HorarioSubgrupo",
      paranoid: true, //softdelete
    }
  );
  return HorarioSubgrupo;
};
