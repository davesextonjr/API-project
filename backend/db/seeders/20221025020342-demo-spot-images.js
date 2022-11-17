'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/9943305/pexels-photo-9943305.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/4558580/pexels-photo-4558580.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/4338256/pexels-photo-4338256.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1001470/pexels-photo-1001470.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/7717303/pexels-photo-7717303.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/3254018/pexels-photo-3254018.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/1940041/pexels-photo-1940041.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/6771581/pexels-photo-6771581.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/4614927/pexels-photo-4614927.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg",
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      name: { [Op.in]: [1,2,3] }
    }, {});
  }
};
