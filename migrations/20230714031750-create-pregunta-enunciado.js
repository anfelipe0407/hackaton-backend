"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PreguntaEnunciados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_enunciado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Enunciados",
          key: "id",
        },
      },
      id_pregunta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PreguntasExamens",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PreguntaEnunciados");
  },
};
