"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificacionesUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Notificacion, {
        foreignKey: "id_notificacion",
      });
    }
  }
  NotificacionesUsuario.init(
    {
      id_notificacion: DataTypes.INTEGER,
      id_usuario: DataTypes.INTEGER,
      fecha_visto: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "NotificacionesUsuario",
      paranoid: true, //softdelete
    }
  );
  return NotificacionesUsuario;
};
