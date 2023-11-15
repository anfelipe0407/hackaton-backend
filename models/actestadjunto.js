"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActEstAdjunto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ActividadEstudiante, {
        foreignKey: "id_actividad_est",
      });
    }
  }
  ActEstAdjunto.init(
    {
      id_actividad_est: DataTypes.INTEGER,
      url_adjunto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ActEstAdjunto",
      paranoid: true, //softdelete
    }
  );
  return ActEstAdjunto;
};
