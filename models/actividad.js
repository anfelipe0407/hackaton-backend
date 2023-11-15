"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.TipoActividad, {
      //   foreignKey: "id_tipo_actividad",
      // });
      // this.belongsTo(models.AsigSubGrupo, {
      //   foreignKey: "id_asig_subgrupo",
      // });
      // this.belongsTo(models.Usuario, {
      //   foreignKey: "id_docente",
      // });
      // this.belongsTo(models.CompAsigSub, {
      //   foreignKey: "id_comp_asigsub",
      // });
      // this.belongsTo(models.Periodo, {
      //   foreignKey: "id_periodo",
      // });
      // // ACTIVIDAD-ESTUDIANTE
      // this.belongsToMany(models.Estudiante, {
      //   through: "ActividadEstudiantes",
      //   foreignKey: "id_actividad",
      //   as: "actividades_estudiantes",
      // });
    }
  }
  Actividad.init(
    {
      id_tipo_actividad: DataTypes.INTEGER,
      titulo: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Actividad",
      paranoid: true, //softdelete
    }
  );
  return Actividad;
};
