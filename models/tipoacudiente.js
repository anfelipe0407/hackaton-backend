"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TipoAcudiente extends Model {
    static associate(models) {
      this.hasMany(models.Acudiente, {
        foreignKey: "id",
      });
    }
  }
  TipoAcudiente.init(
    {
      tipo_acudiente: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TipoAcudiente",
      paranoid: true, //softdelete
    }
  );
  return TipoAcudiente;
};
