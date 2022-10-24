'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {model: 'Customers'},
        onDelete: 'CASCADE',
        allowNull:false
      },
      address: {
        type: Sequelize.STRING(300),
        allowNull:false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull:false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
