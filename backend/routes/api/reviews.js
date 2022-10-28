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
                model: User
            }, {
                model: ReviewImage
            }
        ]
    })
    res.json(reviews)
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

    await Review.update(
        {review, stars},
        {
            where: {id: reviewId}
        }
    )
    const updatedReview = await Review.findByPk(reviewId)

    res.status(201)
    res.json(updatedReview)
})

router.delete('/:reviewId', authenticateUser, async (req, res, next) => {
    const { reviewId } = req.params;
    await Review.destroy({where: { id:reviewId }});

    res.json ({
        message: "Successfully deleted",
        statusCode: 200
    });
})



module.exports = router;
