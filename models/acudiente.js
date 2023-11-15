"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Acudiente extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: "id_acudiente" });
      this.belongsTo(models.Parentesco, { foreignKey: "id_parentesco" });
      this.belongsTo(models.Estudiante, { foreignKey: "id_estudiante" });
      this.belongsTo(models.TipoAcudiente, { foreignKey: "id_tipo_acudiente" });
    }
  }

  Acudiente.init(
    {
      id_usuario_acudiente: DataTypes.INTEGER,
      id_parentesco: DataTypes.INTEGER,
      id_estudiante: DataTypes.INTEGER,
      id_tipo_acudiente: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Acudiente",
      paranoid: true, //softdelete
    }
  );
  return Acudiente;
};
