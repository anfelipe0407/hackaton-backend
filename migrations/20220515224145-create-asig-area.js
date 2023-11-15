"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AsigAreas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_asignatura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Asignaturas",
          key: "id",
        },
      },
      id_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Areas",
          key: "id",
        },
      },
      porcentaje: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("AsigAreas");
  },
};
