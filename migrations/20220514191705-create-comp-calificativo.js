"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CompCalificativos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre_comp: {
        type: Sequelize.STRING,
      },
      id_periodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Periodos",
          key: "id",
        },
      },
      porcentaje_estandar: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("CompCalificativos");
  },
};
