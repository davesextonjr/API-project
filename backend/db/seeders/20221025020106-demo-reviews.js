'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["Splendid!! 5 Stars"] }
    }, {});
  }
};
