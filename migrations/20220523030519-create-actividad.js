"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Actividads", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_tipo_actividad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoActividads",
          key: "id",
        },
      },
      titulo: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Actividads");
  },
};
