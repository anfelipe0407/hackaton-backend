"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RespuestasEstExamens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_actividad_estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ActividadEstudiantes",
          key: "id",
        },
      },
      id_pregunta_examen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PreguntasExamens",
          key: "id",
        },
      },
      opcionn_elegida: {
        type: Sequelize.STRING,
      },
      respuesta_abierta: {
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
    await queryInterface.dropTable("RespuestasEstExamens");
  },
};
