"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TipoDocumento extends Model {
    static associate(models) {
      this.hasMany(models.Usuario, {
        foreignKey: "id",
      });
    }
  }
  TipoDocumento.init(
    {
      tipo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TipoDocumento",
    }
  );
  return TipoDocumento;
};
