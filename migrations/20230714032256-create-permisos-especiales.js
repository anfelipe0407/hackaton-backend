"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PermisosEspeciales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_actividad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Actividads",
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
      fecha_inicio: {
        type: Sequelize.DATE,
      },
      fecha_fin: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("PermisosEspeciales");
  },
};
