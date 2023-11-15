"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Temas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_unidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Unidads",
          key: "id",
        },
      },
      nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      introudccion: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Temas");
  },
};
