"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.AsigSubGrupo, {
        foreignKey: "id",
        as: "docente",
      });

      this.hasMany(models.UserSesion, {
        foreignKey: "id",
      });

      this.belongsTo(models.TipoDocumento, {
        foreignKey: "id_tipo_documento",
        as: "tipo_documento",
      });

      this.belongsToMany(models.Rol, {
        through: "RolesUsuarios",
        foreignKey: "id_usuario",
        as: "usuario_info",
      });

      // CARGA ACADEMICA --- asignatura_subgrupo
      this.belongsToMany(models.AsigSubGrupo, {
        through: "CargaAcademicas",
        foreignKey: "id_user_docente",
        as: "usuarios_asigsubgrupo",
      });
    }
  }
  Usuario.init(
    {
      id_tipo_documento: DataTypes.INTEGER,
      num_documento: DataTypes.BIGINT,
      tipo_sangre: DataTypes.STRING,
      nombre: DataTypes.STRING,
      p_apellido: DataTypes.STRING,
      s_apellido: DataTypes.STRING,
      usuario: DataTypes.STRING,
      clave: DataTypes.STRING,
      clave_anterior: DataTypes.STRING,
      clave_sin_encriptar: DataTypes.STRING,
      correo: DataTypes.STRING,
      sexo: DataTypes.STRING,
      foto_url: DataTypes.STRING,
      direccion: DataTypes.STRING,
      barrio: DataTypes.STRING,
      num_celular: DataTypes.BIGINT,
      num_telefono: DataTypes.BIGINT,
      fecha_nacimiento: DataTypes.DATEONLY,
      lugar_nacimiento: DataTypes.STRING,
      estrato: DataTypes.STRING,
      padres_separados: DataTypes.BOOLEAN,
      vive_con: DataTypes.STRING,
      discapacidad: DataTypes.STRING,
      familias_en_accion: DataTypes.BOOLEAN,
      victimas_conflicto: DataTypes.BOOLEAN,
      etnia: DataTypes.STRING,
      sisben: DataTypes.STRING,
      eps: DataTypes.STRING,
      desplazado: DataTypes.BOOLEAN,
      bloqueo_total: DataTypes.BOOLEAN,
      bloqueo_parcial: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Usuario",
      paranoid: true, //softdelete
    }
  );
  return Usuario;
};
