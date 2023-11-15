"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    static associate(models) {
      this.belongsTo(models.UserSesion, { foreignKey: "id_sesion" });
    }
  }
  UserLog.init(
    {
      id_sesion: DataTypes.INTEGER,
      accion: DataTypes.STRING,
      categoria: DataTypes.STRING,
      modulo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserLog",
      paranoid: true, //softdelete
    }
  );
  return UserLog;
};
