"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PreguntasExamens", {
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
      pregunta: {
        type: Sequelize.TEXT,
      },
      opcion_multiple: {
        type: Sequelize.BOOLEAN,
      },
      opcion_correcta: {
        type: Sequelize.STRING,
      },
      opcion_a: {
        type: Sequelize.TEXT,
      },
      opcion_b: {
        type: Sequelize.TEXT,
      },
      opcion_c: {
        type: Sequelize.TEXT,
      },
      opcion_d: {
        type: Sequelize.TEXT,
      },
      opcion_e: {
        type: Sequelize.TEXT,
      },
      opcion_f: {
        type: Sequelize.TEXT,
      },
      opcion_g: {
        type: Sequelize.TEXT,
      },
      opcion_h: {
        type: Sequelize.TEXT,
      },
      opcion_i: {
        type: Sequelize.TEXT,
      },
      opcion_j: {
        type: Sequelize.TEXT,
      },
      opcion_a_audio: {
        type: Sequelize.STRING,
      },
      opcion_b_audio: {
        type: Sequelize.STRING,
      },
      opcion_c_audio: {
        type: Sequelize.STRING,
      },
      opcion_d_audio: {
        type: Sequelize.STRING,
      },
      opcion_e_audio: {
        type: Sequelize.STRING,
      },
      opcion_f_audio: {
        type: Sequelize.STRING,
      },
      opcion_g_audio: {
        type: Sequelize.STRING,
      },
      opcion_h_audio: {
        type: Sequelize.STRING,
      },
      opcion_i_audio: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("PreguntasExamens");
  },
};
