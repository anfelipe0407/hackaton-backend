"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HojasDeVida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });
    }
  }
  HojasDeVida.init(
    {
      id_usuario: DataTypes.INTEGER,
      perfil: DataTypes.TEXT,
      experiencia_laboral: DataTypes.TEXT,
      formacion_academica: DataTypes.TEXT,
      referencias_laborales: DataTypes.TEXT,
      referencias_familiares: DataTypes.TEXT,
      eps: DataTypes.STRING,
      seguridad_social: DataTypes.TEXT,
      fecha_contratacion: DataTypes.DATEONLY,
      tipo_contrato: DataTypes.STRING,
      adjunto_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HojasDeVida",
      paranoid: true, //softdelete
    }
  );
  return HojasDeVida;
};
