"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartamentoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: "id_usuario" });
      this.belongsTo(models.DepartamentoCargo, { foreignKey: "id_cargo" });
    }
  }
  DepartamentoUsuario.init(
    {
      id_usuario: DataTypes.INTEGER,
      id_cargo: DataTypes.INTEGER,
      fecha_inicio_cargo: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "DepartamentoUsuario",
      paranoid: true, //softdelete
    }
  );
  return DepartamentoUsuario;
};
