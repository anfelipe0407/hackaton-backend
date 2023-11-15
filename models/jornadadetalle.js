"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JornadaDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Jornada, { foreignKey: "id_jornada" });

      this.belongsToMany(models.HorarioSubgrupo, {
        through: "HorarioSubgrupos",
        foreignKey: "id_jornada_detalles",
        as: "jornadadetalles_horariosubgrupo",
      });
    }
  }
  JornadaDetalle.init(
    {
      id_jornada: DataTypes.INTEGER,
      hora_inicio: DataTypes.TIME,
      hora_fin: DataTypes.TIME,
      descanso: DataTypes.BOOLEAN,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "JornadaDetalle",
      paranoid: true, //softdelete
    }
  );
  return JornadaDetalle;
};
