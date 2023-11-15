"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_sesion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "UserSesions",
          key: "id",
        },
      },
      accion: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      categoria: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      modulo: {
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
    await queryInterface.dropTable("UserLogs");
  },
};
