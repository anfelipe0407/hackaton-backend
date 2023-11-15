"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DepartamentoCargos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_departamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Departamentos",
          key: "id",
        },
      },
      cargo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("DepartamentoCargos");
  },
};
