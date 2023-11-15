"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RespuestaHilo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RespuestaHilo.init(
    {
      id_hilo: DataTypes.INTEGER,
      id_usuario: DataTypes.INTEGER,
      respuesta: DataTypes.TEXT,
      id_respuesta: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RespuestaHilo",
    }
  );
  return RespuestaHilo;
};
