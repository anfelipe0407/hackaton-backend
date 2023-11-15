"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventoInstitucionals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo_evento: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      fecha_inicial: {
        type: Sequelize.DATE,
      },
      fecha_final: {
        type: Sequelize.DATE,
      },
      img_url: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.BOOLEAN,
      },
      id_anio_academico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AnioAcademicos",
          key: "id",
        },
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
    await queryInterface.dropTable("EventoInstitucionals");
  },
};
