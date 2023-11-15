"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: "RolesUsuarios",
        foreignKey: "id_rol",
        as: "usuario_rol",
      });
    }
  }

  Rol.init(
    {
      rol: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rol",
      paranoid: true, //softdelete
    }
  );
  return Rol;
};
