"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notificacions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      descripcion: {
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
      general: {
        type: Sequelize.BOOLEAN,
      },
      id_subgrupo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "SubGrupos",
          key: "id",
        },
      },
      fecha: {
        type: Sequelize.DATE,
      },
      estado: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notificacions");
  },
};
