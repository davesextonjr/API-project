'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
      },
      {
        reviewId: 2,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
      },
      {
        reviewId: 3,
        url: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?"
      },
      {
        reviewId: 4,
        url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg"
      },
      {
        reviewId: 5,
        url: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2] }
    }, {});
  }
};
