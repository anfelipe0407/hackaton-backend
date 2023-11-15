"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LogrosAsigSubgrupos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_logro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Logros",
          key: "id",
        },
      },
      id_asig_subgrupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AsigSubGrupos",
          key: "id",
        },
      },
      id_periodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Periodos",
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
    await queryInterface.dropTable("LogrosAsigSubgrupos");
  },
};
