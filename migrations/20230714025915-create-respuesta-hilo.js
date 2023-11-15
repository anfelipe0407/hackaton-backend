"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RespuestaHilos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_hilo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Hilos",
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
      respuesta: {
        type: Sequelize.TEXT,
      },
      id_respuesta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "RespuestaHilos",
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
    await queryInterface.dropTable("RespuestaHilos");
  },
};
