"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Estudiantes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod_matricula: {
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
      id_subgrupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SubGrupos",
          key: "id",
        },
      },
      fecha_promocion: {
        type: Sequelize.DATEONLY,
      },
      id_anio_academico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AnioAcademicos",
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Estudiantes");
  },
};
