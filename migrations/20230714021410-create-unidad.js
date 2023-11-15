"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Unidads", {
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
      nombre: {
        type: Sequelize.STRING,
      },
      resumen: {
        type: Sequelize.TEXT,
      },
      banner_url: {
        type: Sequelize.STRING,
      },
      color: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Unidads");
  },
};
