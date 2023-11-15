"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Usuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_tipo_documento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoDocumentos",
          key: "id",
        },
      },
      num_documento: {
        type: Sequelize.BIGINT,
      },
      tipo_sangre: {
        type: Sequelize.STRING,
      },

      nombre: {
        type: Sequelize.STRING,
      },
      p_apellido: {
        type: Sequelize.STRING,
      },
      s_apellido: {
        type: Sequelize.STRING,
      },
      usuario: {
        type: Sequelize.STRING,
      },
      clave: {
        type: Sequelize.STRING,
      },
      clave_anterior: {
        type: Sequelize.STRING,
      },
      clave_sin_encriptar: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      sexo: {
        type: Sequelize.STRING,
      },
      foto_url: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      barrio: {
        type: Sequelize.STRING,
      },
      num_celular: {
        type: Sequelize.BIGINT,
      },
      num_telefono: {
        type: Sequelize.BIGINT,
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
      },
      lugar_nacimiento: {
        type: Sequelize.STRING,
      },
      estrato: {
        type: Sequelize.STRING,
      },
      padres_separados: {
        type: Sequelize.BOOLEAN,
      },
      vive_con: {
        type: Sequelize.STRING,
      },
      discapacidad: {
        type: Sequelize.BOOLEAN,
      },
      familias_en_accion: {
        type: Sequelize.BOOLEAN,
      },
      victimas_conflicto: {
        type: Sequelize.BOOLEAN,
      },
      etnia: {
        type: Sequelize.STRING,
      },
      sisben: {
        type: Sequelize.STRING,
      },
      eps: {
        type: Sequelize.STRING,
      },
      desplazado: {
        type: Sequelize.BOOLEAN,
      },
      bloqueo_total: {
        type: Sequelize.BOOLEAN,
      },
      bloqueo_parcial: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuarios");
  },
};
