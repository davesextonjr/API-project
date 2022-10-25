'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId:1,
        userId:1,
        review: "Splendid!! 5 Stars",
        stars: 4
      },
      {
        spotId:1,
        userId:2,
        review: "Splendid!! 5 Stars",
        stars: 5
      },
      {
        spotId:1,
        userId:3,
        review: "Splendid!! 5 Stars",
        stars: 3
      },
      {
        spotId:2,
        userId:1,
        review: "Splendid!! 5 Stars",
        stars: 5
      },
      {
        spotId:3,
        userId:3,
        review: "Splendid!! 5 Stars",
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
