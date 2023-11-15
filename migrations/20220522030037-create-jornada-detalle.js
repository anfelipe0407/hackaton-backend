"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JornadaDetalles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jornada: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Jornadas",
          key: "id",
        },
      },
      hora_inicio: {
        type: Sequelize.TIME,
      },
      hora_fin: {
        type: Sequelize.TIME,
      },
      descanso: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("JornadaDetalles");
  },
};
