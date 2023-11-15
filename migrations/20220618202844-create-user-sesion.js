"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserSesions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      inicio_sesion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fin_sesion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tipo_dispositivo: {
        type: Sequelize.STRING,
      },
      ip: {
        type: Sequelize.STRING,
      },
      ciudad: {
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
    await queryInterface.dropTable("UserSesions");
  },
};
