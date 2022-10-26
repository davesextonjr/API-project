const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const router = express.Router();

const validateSpotSignup =[
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage('City is required'),
    check('state')
        .exists({checkFalsy: true})
        .withMessage('State is required'),
    check('country')
        .exists({checkFalsy: true})
        .withMessage('Country is required'),
    check('lat')
        .exists({checkFalsy: true})
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({checkFalsy: true})
        .isFloat({min: -180, max: 180})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({checkFalsy: true})
        .withMessage('Name is rquired'),
    check('name')
        .isLength({ max: 49})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy: true})
        .withMessage('Price per day is required'),
    handleValidationErrors
]

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

router.post('/', authenticateUser, validateSpotSignup, async (req, res, next) => {
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
    res.json(spot)
})

router.post('/:spotId/images', authenticateUser, async (req, res, next) => {
    const { spotId } = req.params;
    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const { url, preview } = req.body;
    const currentUser = req.user.id;
    const spotOwner = currentSpot.ownerId

    if(currentUser !== spotOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    const newImage = await SpotImage.create({
        url,
        preview
    })
    res.json({
        id: newImage.id,
        url,
        preview
    })
})


module.exports = router;
