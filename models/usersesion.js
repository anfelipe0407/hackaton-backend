"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSesion extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: "id_usuario" });

      this.hasMany(models.UserLog, {
        foreignKey: "id",
      });
    }
  }
  UserSesion.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_usuario: DataTypes.INTEGER,
      token: DataTypes.STRING,
      inicio_sesion: DataTypes.DATE,
      fin_sesion: DataTypes.DATE,
      estado: DataTypes.BOOLEAN,
      tipo_dispositivo: DataTypes.STRING,
      ip: DataTypes.STRING,
      ciudad: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserSesion",
      paranoid: true, //softdelete
    }
  );
  return UserSesion;
};
