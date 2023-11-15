"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActividadAdjunto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Actividad, {
        foreignKey: "id_actividad",
      });
    }
  }
  ActividadAdjunto.init(
    {
      id_actividad_asig: DataTypes.INTEGER,
      url_adjunto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ActividadAdjunto",
      paranoid: true, //softdelete
    }
  );
  return ActividadAdjunto;
};
