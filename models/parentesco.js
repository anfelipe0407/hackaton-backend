"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parentesco extends Model {
    static associate(models) {
      this.hasMany(models.Acudiente, {
        foreignKey: "id",
      });
    }
  }
  Parentesco.init(
    {
      parentesco: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Parentesco",
      paranoid: true, //softdelete
    }
  );
  return Parentesco;
};
