'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/28562dce-bb6d-461c-b953-84603e6412bd.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/2cd84581-f8ad-4768-ad52-e89333e02dbc.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/d1b691d4-0f78-45d2-ab2d-b45aca938569.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/a5eb0717-4c93-46f0-922d-da368b4158e7.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
        preview: false
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
    options.tableName = 'SpotImages'
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [1,2,3] }
    }, {});
  }
};
