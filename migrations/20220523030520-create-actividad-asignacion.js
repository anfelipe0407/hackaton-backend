"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ActividadAsignacions", {
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
      id_asig_subgrupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AsigSubGrupos",
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
      fecha_inicio: {
        type: Sequelize.DATE,
      },
      fecha_fin: {
        type: Sequelize.DATE,
      },
      tiempo_max: {
        type: Sequelize.INTEGER,
      },
      tiempo_por_pregunta: {
        type: Sequelize.INTEGER,
      },
      id_comp_asigsub: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CompAsigSubs",
          key: "id",
        },
      },
      max_adjuntos: {
        type: Sequelize.INTEGER,
      },
      calificacion_automatica: {
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
    await queryInterface.dropTable("ActividadAsignacions");
  },
};
