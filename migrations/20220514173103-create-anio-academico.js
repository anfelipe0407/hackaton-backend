"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AnioAcademicos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inicio_anio: {
        type: Sequelize.DATEONLY,
      },
      fin_anio: {
        type: Sequelize.DATEONLY,
      },
      tipo_calendario: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AnioAcademicos");
  },
};
