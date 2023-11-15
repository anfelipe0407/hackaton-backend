"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Acudientes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario_acudiente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      id_parentesco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Parentescos",
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
      id_tipo_acudiente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoAcudientes",
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
    await queryInterface.dropTable("Acudientes");
  },
};
