"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HojasDeVidas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      perfil: {
        type: Sequelize.TEXT,
      },
      experiencia_laboral: {
        type: Sequelize.TEXT,
      },
      formacion_academica: {
        type: Sequelize.TEXT,
      },
      referencias_laborales: {
        type: Sequelize.TEXT,
      },
      referencias_familiares: {
        type: Sequelize.TEXT,
      },
      eps: {
        type: Sequelize.STRING,
      },
      seguridad_social: {
        type: Sequelize.TEXT,
      },
      fecha_contratacion: {
        type: Sequelize.DATEONLY,
      },
      tipo_contrato: {
        type: Sequelize.STRING,
      },
      adjunto_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("HojasDeVidas");
  },
};
