"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolesUsuario extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "usuario_info",
      });

      this.belongsTo(models.Rol, {
        foreignKey: "id_rol",
        as: "usuario_rol",
      });
    }
  }
  RolesUsuario.init(
    {
      id_rol: DataTypes.INTEGER,
      id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolesUsuario",
    }
  );
  return RolesUsuario;
};
