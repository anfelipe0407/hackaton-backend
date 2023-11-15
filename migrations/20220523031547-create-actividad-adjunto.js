"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ActividadAdjuntos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_actividad_asig: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ActividadAsignacions",
          key: "id",
        },
      },
      url_adjunto: {
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
    await queryInterface.dropTable("ActividadAdjuntos");
  },
};
