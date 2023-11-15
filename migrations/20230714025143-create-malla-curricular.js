"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MallaCurriculars", {
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
      id_grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Grupos",
          key: "id",
        },
      },
      id_periodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Periodos",
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
    await queryInterface.dropTable("MallaCurriculars");
  },
};
