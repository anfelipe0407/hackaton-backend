"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });

      this.belongsTo(models.SubGrupo, {
        foreignKey: "id_subgrupo",
      });
    }
  }

  Notificacion.init(
    {
      titulo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      id_usuario: DataTypes.INTEGER, //(quien creó la notificacion)
      general: DataTypes.BOOLEAN,
      id_subgrupo: DataTypes.INTEGER, //NULLABLE
      fecha: DataTypes.DATE,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notificacion",
      paranoid: true, //softdelete
    }
  );
  return Notificacion;
};
