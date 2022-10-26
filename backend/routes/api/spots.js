const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const router = express.Router();

router.get('/', async (req, res, next) => {
    const responseBody = [];
    const spots = await Spot.findAll({
        include:[
            {
                model: SpotImage,
                attributes: ['url'],
                where: {
                    preview: true
                }
            },
            {
                model: Review,
                attributes:['stars'] //collect for the avg
            }
        ]
        })

        spots.forEach(obj => {
            let sum = 0; //get the avg review
            obj.Reviews.forEach(review => {
                sum += review.stars
            })
            const avgRating = sum / obj.Reviews.length

            responseBody.push({
                id: obj.id,
                ownerId: obj.ownerId,
                address: obj.address,
                city: obj.city,
                state: obj.state,
                country: obj.country,
                lat: obj.lat,
                lng: obj.lng,
                name: obj.name,
                description: obj.description,
                price: obj.price,
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt,
                avgRating: avgRating,
                previewImage: obj.SpotImages[0].url
            })
        })
    res.json({
        Spots: responseBody
    })
});

router.post('/', authenticateUser, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const ownerId = req.user.id;
    const spot = await Spot.create({
        ownerId: ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })




    res.json(spot
        // id: "TBA",
        // ownerId,
        // address,
        // city,
        // state,
        // country,
        // lat,
        // lng,
        // name,
        // description,
        // price,
        // createdAt: "TBA",
        // updatedAt: "TBA"
)
})


module.exports = router;
