'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      name: { [Op.in]: [1,2,3] }
    }, {});
  }
};
