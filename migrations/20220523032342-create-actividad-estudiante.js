"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ActividadEstudiantes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_actividad_asig: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ActividadAsignacions",
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
      respuesta: {
        type: Sequelize.TEXT,
      },
      comentario_docente: {
        type: Sequelize.TEXT,
      },
      fecha_entrega: {
        type: Sequelize.DATE,
      },
      tiempo_consumido_solucion: {
        type: Sequelize.INTEGER,
      },
      finalizado: {
        type: Sequelize.BOOLEAN,
      },
      calificacion: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("ActividadEstudiantes");
  },
};
