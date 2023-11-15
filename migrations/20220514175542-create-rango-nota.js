"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RangoNota", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inicial: {
        type: Sequelize.FLOAT,
      },
      final: {
        type: Sequelize.FLOAT,
      },
      letra: {
        type: Sequelize.STRING,
      },
      desempenio: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("RangoNota");
  },
};
