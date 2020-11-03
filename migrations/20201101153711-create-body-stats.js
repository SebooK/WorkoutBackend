'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bodyStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      weight: {
        type: Sequelize.FLOAT
      },
      neck: {
        type: Sequelize.FLOAT
      },
      chest: {
        type: Sequelize.FLOAT
      },
      wrist: {
        type: Sequelize.FLOAT
      },
      upperarm: {
        type: Sequelize.FLOAT
      },
      forearm: {
        type: Sequelize.FLOAT
      },
      waist: {
        type: Sequelize.FLOAT
      },
      hip: {
        type: Sequelize.FLOAT
      },
      thigh: {
        type: Sequelize.FLOAT
      },
      calf: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bodyStats');
  }
};