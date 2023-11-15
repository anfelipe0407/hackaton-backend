"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Periodos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      inicio_periodo: {
        type: Sequelize.DATEONLY,
      },
      fin_periodo: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("Periodos");
  },
};
