"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Boletins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      id_comp_asig_sub: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CompAsigSubs",
          key: "id",
        },
      },
      id_estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Estudiantes",
          key: "id",
        },
      },
      acumulado: {
        type: Sequelize.FLOAT,
      },
      recuperacion_nota: {
        type: Sequelize.FLOAT,
      },
      recuperacion: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Boletins");
  },
};
