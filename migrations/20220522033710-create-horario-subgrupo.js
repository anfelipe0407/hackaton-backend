"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HorarioSubgrupos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jornada_detalles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "JornadaDetalles",
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
    await queryInterface.dropTable("HorarioSubgrupos");
  },
};
