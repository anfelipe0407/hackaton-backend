"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AsigSubGrupos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_asig_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AsigAreas",
          key: "id",
        },
      },
      id_subgrupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SubGrupos",
          key: "id",
        },
      },
      id_docente_asignado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      intensidad_horaria: {
        type: Sequelize.INTEGER,
      },
      // id_anio_academico: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "AnioAcademicos",
      //     key: "id",
      //   },
      // },
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
    await queryInterface.dropTable("AsigSubGrupos");
  },
};
