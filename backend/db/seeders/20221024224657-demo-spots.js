'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "348 Something St",
        city: "Springville",
        state: "Alaska",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Ice House",
        description: "And you thought nothing was colder then the shoulder she gave you",
        price: 50.00,
      },
      {
        ownerId: 2,
        address: "348 Something St",
        city: "Springville",
        state: "Alaska",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "German House",
        description: "And you thought nothing was colder then the shoulder she gave you",
        price: 50.00,
      },
      {
        ownerId: 2,
        address: "348 Something St",
        city: "Springville",
        state: "Alaska",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Fire House",
        description: "And you thought nothing was colder then the shoulder she gave you",
        price: 50.00,
      }

    ])
  },


    down: async (queryInterface, Sequelize) => {
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Spots', {
        name: { [Op.in]: ["Fire House", "German House", "Ice House"] }
      }, {});
    }

};
