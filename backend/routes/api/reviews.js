const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, json } = require('sequelize');
const reviewimage = require('../../db/models/reviewimage');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send("here")
})

router.get('/current', authenticateUser, async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes:['id', 'firstName', 'lastName']
            }, {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            },{
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ]
    })

    const response = [];

    // let url = await SpotImage.findOne({
    //     where: {
    //         spotId: obj.Spot.id
    //     }
    // })
    await reviews.forEach(async (obj) => {
        let previewImage = null;
        if (obj.Spot.SpotImages) previewImage = obj.Spot.SpotImages[0].url

        let correctFormat = {
            id: obj.id,
            userId: obj.userId,
            spotId: obj.spotId,
            review: obj.review,
            stars: obj.stars,
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt,
            User: obj.User,
            Spot: {id: obj.Spot.id,
                ownerId: obj.Spot.ownerId,
                address: obj.Spot.address,
                city: obj.Spot.city,
                state: obj.Spot.state,
                country: obj.Spot.country,
                lat: obj.Spot.lat,
                lng: obj.Spot.lng,
                name: obj.Spot.name,
                price: obj.Spot.price,
                previewImage: previewImage
                },
            ReviewImages: obj.ReviewImages
        }

        response.push(correctFormat)

    })

    res.json({Reviews: response })
})

router.post('/:reviewId/images', authenticateUser, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    const currentReview = await Review.findByPk(reviewId);
    if(!currentReview) {
        const err = new Error("Review couldn't be found");
        err.title = "Review couldn't be found";
        err.errors = ["Review couldn't be found"];
        err.status = 404;
        return next(err);
    };


    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    })
    res.status(200);
    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

router.put('/:reviewId', authenticateUser, async (req, res, next) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;


    const currentReview = await Review.findByPk(reviewId);
    if(!currentReview) {
        const err = new Error("Review couldn't be found");
        err.title = "Review couldn't be found";
        err.errors = ["Review couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const reviewOwner = currentReview.userId;
    const currentUser = req.user.id;

    if(currentUser !== reviewOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    await Review.update(
        {review, stars},
        {
            where: {id: reviewId}
        }
    )
    const updatedReview = await Review.findByPk(reviewId)

    res.status(200)
    res.json(updatedReview)
})

router.delete('/:reviewId', authenticateUser, async (req, res, next) => {
    const { reviewId } = req.params;

    const currentReview = await Review.findByPk(reviewId);
    if(!currentReview) {
        const err = new Error("Review couldn't be found");
        err.title = "Review couldn't be found";
        err.errors = ["Review couldn't be found"];
        err.status = 404;
        return next(err);
    };
    await Review.destroy({where: { id:reviewId }});

    res.json ({
        message: "Successfully deleted",
        statusCode: 200
    });
})



module.exports = router;
