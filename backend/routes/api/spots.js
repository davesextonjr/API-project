const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const reviewimage = require('../../db/models/reviewimage');
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

let { page, size } = req.query;
if (!page) page = 1;
if (!size) size = 20;
if (page > 10) page = 10;
if (size > 20) size = 20;

const pagination = {};

if (parseInt(page) >= 1 && parseInt(size) >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)
}




    const spots = await Spot.findAll({
        include:[
            {
                model: SpotImage,
                attributes: ['url'],
            },
            {
                model: Review,
                attributes:['stars'] //collect for the avg
            }
        ],
        ...pagination
        })

        // create response according to specifications:
        const responseBody = [];
        let avgRating;
        let previewImage;

        // iterate through the response
        spots.forEach(obj => {

        // check for ratings and get average
            let sum = 0;

            if(obj.Reviews.length) {
                obj.Reviews.forEach(review => {
                    sum += review.stars
                })
                 avgRating = sum / obj.Reviews.length;
            } else {
                 avgRating = null;
            };

        //check for preview image

            if (obj.SpotImages.length)  {
                previewImage = obj.SpotImages[0].url;
            } else {
                previewImage = null;
            }

        //build body
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
                previewImage: previewImage
            })
        })
    res.json({
        Spots: responseBody,
        page: page,
        size: size
    })
});

router.post('/', authenticateUser, validateSpotSignup, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const ownerId = req.user.id;
    const spot = Spot.build({
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
    await spot.save()
    res.status(201)
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
        preview,
        spotId: spotId
    })
    res.json({
        id: newImage.id,
        url,
        preview
    })
})

router.post('/:spotId/reviews', authenticateUser, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const previousReviewCheck = await Review.findAll({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    });

    if (previousReviewCheck.length) {
        const err = new Error("User already has a review for this spot");
        err.title = "User already has a review for this spot";
        err.errors = ["User already has a review for this spot"];
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review,
        stars
    });
    res.status(201);
    res.json(newReview)
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;

    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }


    const spotReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes:['id', 'firstName', 'lastName']
            }, {
                model: ReviewImage,
                attributes: ['id', 'url']
            }

        ]
    })

    res.json(spotReviews)
})


router.get('/current', authenticateUser, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include:[
            {
                model: SpotImage,
                attributes: ['url'],
            },
            {
                model: Review,
                attributes:['stars'] //collect for the avg
            }
        ]
        })

        // create response according to specifications:
        const responseBody = [];
        let avgRating;
        let previewImage;

        // iterate through the response
        spots.forEach(obj => {

        // check for ratings and get average
            let sum = 0;

            if(obj.Reviews.length) {
                obj.Reviews.forEach(review => {
                    sum += review.stars
                })
                 avgRating = sum / obj.Reviews.length;
            } else {
                 avgRating = null;
            };

        //check for preview image

            if (obj.SpotImages.length)  {
                previewImage = obj.SpotImages[0].url;
            } else {
                previewImage = null;
            }

        //build body
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
                previewImage: previewImage
            })
        })
    res.json({Spots: responseBody})
});


router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
    });
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }
    const spotImage = await SpotImage.findAll({
        where: {spotId: spotId},
        attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findOne({where: {id: spot.ownerId}})

    const reviews = await Review.findAll({
        where: {spotId: spotId},
        attributes: ['stars']
    })
    let avgStarRating = null
    if (reviews) {
        let sum = 0;
        reviews.forEach(obj => {
            sum += obj.stars
        });
        avgStarRating = sum / reviews.length
    }






    res.json({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviews.length,
        avgStarRating: avgStarRating,
        // previewImage: previewImage,
        SpotImages: spotImage,
        Owner: owner
    })
})

router.put('/:spotId', authenticateUser, async (req, res, next) => {
    const { spotId } = req.params;
    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const currentUser = req.user.id;
    const spotOwner = currentSpot.ownerId

    if(currentUser !== spotOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    ;
    await Spot.update(
         { address, city, state, country, lat, lng, name, description, price },
         {
            where: {id: spotId}
         }
    )
    const updatedSpot = await Spot.findByPk(spotId)
    res.json(updatedSpot)

})

router.post('/:spotId/bookings', authenticateUser, async (req, res, next) => {
    const { spotId } = req.params;

    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const currentUser = req.user.id;
    const spotOwner = currentSpot.ownerId

    if(currentUser === spotOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    const { startDate, endDate } = req.body;

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (start.getTime() > end.getTime()) {
        const err = new Error('Validation error');
        err.title = 'Validation error';
        err.errors = ['endDate cannot be on or before startDate'];
        err.status = 400;
        return next(err);
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        order:[['startDate', 'DESC']],
    });

    bookings.forEach(booking => {
        if (booking.startDate === startDate) {
            const err = new Error('"Sorry, this spot is already booked for the specified dates"');
            err.title = '"Sorry, this spot is already booked for the specified dates"';
            err.errors = ["Start date conflicts with an existing booking"];
            err.status = 403;
            return next(err);
        }

        if (booking.endDate === endDate) {
            const err = new Error('"Sorry, this spot is already booked for the specified dates"');
            err.title = '"Sorry, this spot is already booked for the specified dates"';
            err.errors = ["End date conflicts with an existing booking"];
            err.status = 403;
            return next(err);
        }

    })


    const newBooking = await Booking.create({
        spotId,
        userId: currentUser,
        startDate,
        endDate
    })

    res.json(newBooking)
})




router.get('/:spotId/bookings', authenticateUser, async (req, res, err) => {
    const userId = req.user.id;
    const { spotId } = req.params;
    const ownerCheck = await Spot.findOne({ //ownerCheck should be an empty object if the current spot does not belong to the current user
        where: {
            id:spotId,
            ownerId: userId
        }
    })

    let bookings;

    if (!ownerCheck) {
        bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: ['User']
        })
    }

    res.json(bookings)
})


router.delete('/:spotId', authenticateUser, async (req, res, next) => {
    const { spotId } = req.params;
    const currentSpot = await Spot.findByPk(spotId);
    if(!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = ["Spot couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const currentUser = req.user.id;
    const spotOwner = currentSpot.ownerId

    if(currentUser !== spotOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }
 await Spot.destroy({where: {id: spotId}});

 res.json ({
    message: "Successfully deleted",
    statusCode: 200
});
})


module.exports = router;
