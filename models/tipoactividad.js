"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TipoActividad extends Model {
    static associate(models) {
      this.hasMany(models.Actividad, {
        foreignKey: "id",
      });
    }
  }
  TipoActividad.init(
    {
      tipo_actividad: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TipoActividad",
    }
  );
  return TipoActividad;
};
