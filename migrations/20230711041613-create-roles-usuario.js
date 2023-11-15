"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RolesUsuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rols",
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
    await queryInterface.dropTable("RolesUsuarios");
  },
};
