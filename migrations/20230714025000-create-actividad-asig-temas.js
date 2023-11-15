"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ActividadAsigTemas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_actividad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Actividads",
          key: "id",
        },
      },
      id_tema: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Temas",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ActividadAsigTemas");
  },
};
