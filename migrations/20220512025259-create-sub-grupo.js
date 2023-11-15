"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubGrupos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod_subgrupo: {
        type: Sequelize.STRING,
      },
      id_grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Grupos",
          key: "id",
        },
      },
      nombre_subgrupo: {
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
    await queryInterface.dropTable("SubGrupos");
  },
};
