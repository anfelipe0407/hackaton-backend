"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObervadorEstudiantes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Estudiantes",
          key: "id",
        },
      },
      id_usuario_observante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      observacion: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("ObervadorEstudiantes");
  },
};
