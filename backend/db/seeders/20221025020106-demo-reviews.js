'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:2,
        review: "Great!",
        stars: 5
      },
      {
        spotId:1,
        userId:3,
        review: "Best Night of Sleep Ever!!",
        stars: 5
      },
      {
        spotId:1,
        userId:4,
        review: "Not Cold Enough",
        stars: 2
      },
      {
        spotId:2,
        userId:5,
        review: "Splendid!! 5 Stars",
        stars: 5
      },
      {
        spotId:2,
        userId:3,
        review: "Couldn't have been bettter",
        stars: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["Splendid!! 5 Stars"] }
    }, {});
  }
};
