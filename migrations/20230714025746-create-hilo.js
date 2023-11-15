"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Hilos", {
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
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      titulo: {
        type: Sequelize.STRING,
      },
      respuesta: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Hilos");
  },
};
