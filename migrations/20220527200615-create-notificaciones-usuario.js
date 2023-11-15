"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NotificacionesUsuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_notificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Notificacions",
          key: "id",
        },
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_visto: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("NotificacionesUsuarios");
  },
};
