"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: "id_usuario" });
      this.belongsTo(models.SubGrupo, { foreignKey: "id_subgrupo" });
      this.belongsTo(models.AnioAcademico, { foreignKey: "id_anio_academico" });

      // ACTIVIDAD-ESTUDIANTE
      this.belongsToMany(models.Actividad, {
        through: "ActividadEstudiantes",
        foreignKey: "id_estudiante",
        as: "estudiantes_actividad",
      });
    }
  }
  Estudiante.init(
    {
      cod_matricula: DataTypes.STRING,
      id_usuario: DataTypes.INTEGER,
      id_subgrupo: DataTypes.INTEGER,
      fecha_promocion: DataTypes.DATEONLY,
      id_anio_academico: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Estudiante",
      paranoid: true, //softdelete
    }
  );
  return Estudiante;
};
