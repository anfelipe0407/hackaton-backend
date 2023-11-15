"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DepartamentoUsuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      id_cargo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "DepartamentoCargos",
          key: "id",
        },
      },
      fecha_inicio_cargo: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("DepartamentoUsuarios");
  },
};
