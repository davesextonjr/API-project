const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
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

module.exports = router;
