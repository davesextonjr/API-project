'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "348 Something St",
        city: "Springville",
        state: "Alaska",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Ice House",
        description: "And you thought nothing was colder than the shoulder she gave you!",
        price: 50.00,
      },
      {
        ownerId: 1,
        address: "675 Something St",
        city: "Springville",
        state: "Colorado",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Mountain Home",
        description: "Staying here can bring you to new heights!",
        price: 100.00,
      },
      {
        ownerId: 2,
        address: "896 Something St",
        city: "Springville",
        state: "CA",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Valley Low",
        description: `Sing with me: "Ain't no mountain high enough! Ain't no valley...`,
        price: 220.00,
      },
      {
        ownerId: 2,
        address: "1085 Something St",
        city: "Springville",
        state: "Maine",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Lobster House",
        description: "The beds might have your back crackin', but the food will bring you back clappin'!",
        price: 195.00,
      },
      {
        ownerId: 3,
        address: "2046 Something St",
        city: "Springville",
        state: "Michigan",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Island Living",
        description: "Sure it's not tropical, but can you walk to your island in winter?",
        price: 80.00,
      },
      {
        ownerId: 3,
        address: "348 Something St",
        city: "Springville",
        state: "Texas",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Bigger and Better Ranch",
        description: "Oh, your spot is 10 bedrooms on 100 acres? In Texas we call that fun size. Fun size is cool and all, but if Holoween has taught us anyting, full-size beats fun-size any day.",
        price: 2000.00,
      },
      {
        ownerId: 4,
        address: "3348 Something St",
        city: "Springville",
        state: "Hawaii",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "Trap",
        description: "It's Hawaii and 50 dollars...I mean...",
        price: 50.00,
      },
      {
        ownerId: 4,
        address: "345 Something St",
        city: "Springville",
        state: "N/A",
        country: "N/A",
        lat: 61.2176,
        lng: 149.8997,
        name: "Spy House",
        description: "Nothing to see here",
        price: 9000.00,
      },
      {
        ownerId: 5,
        address: "348 Something St",
        city: "Springville",
        state: "N/A",
        country: "Norway",
        lat: 61.2176,
        lng: 149.8997,
        name: "Longship Gettaway",
        description: "The Vikings always came back home for a reason.",
        price: 19000.00,
      },
      {
        ownerId: 5,
        address: "5690 Something St",
        city: "Springville",
        state: "N/A",
        country: "Italy",
        lat: 61.2176,
        lng: 149.8997,
        name: "Villa",
        description: "Is it overpriced? Yes. Is it cliche? Yes. Will you still choose it? Of Course!!!",
        price: 3000.00,
      },
      {
        ownerId: 6,
        address: "348 Something St",
        city: "Springville",
        state: "N/A",
        country: "Napal",
        lat: 61.2176,
        lng: 149.8997,
        name: "Nirvana",
        description: "Fans of the band and those seeking enlightenment will both enjoy this hideaway",
        price: 800.00,
      },
      {
        ownerId: 6,
        address: "348 Something St",
        city: "Springville",
        state: "New York",
        country: "USA",
        lat: 61.2176,
        lng: 149.8997,
        name: "New York Living",
        description: "Let's be real, you'll see the price and book it right away, not realizing New York is more than just the city. Hope you enjoy dairy farms",
        price: 100.00,
      }

    ])
  },


    down: async (queryInterface, Sequelize) => {
      options.tableName = 'Spots'
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        name: { [Op.in]: ["Fire House", "German House", "Ice House"] }
      }, {});
    }

};
