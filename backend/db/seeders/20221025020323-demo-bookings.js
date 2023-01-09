'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-11-05",
        endDate: "2022-11-07"
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2022-11-08",
        endDate: "2022-11-09"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-11-05",
        endDate: "2022-11-07"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2022-11-08",
        endDate: "2022-11-09"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1,2] }
    }, {});
  }
};
