'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Lition'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'One',
        lastName: 'User'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Three',
        lastName: 'User'
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Five',
        lastName: 'User'
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Seven',
        lastName: 'User'
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Nine',
        lastName: 'User'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
