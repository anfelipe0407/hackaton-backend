"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jornadas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hora_inicio: {
        type: Sequelize.TIME,
      },
      hora_fin: {
        type: Sequelize.TIME,
      },
      id_anio_academico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AnioAcademicos",
          key: "id",
        },
      },
      estado: {
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
    await queryInterface.dropTable("Jornadas");
  },
};
