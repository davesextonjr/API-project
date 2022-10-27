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

    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    })

    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

router.put('/:reviewId', authenticateUser, async (req, res, nex) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    await Review.update(
        {review, stars},
        {
            where: {id: reviewId}
        }
    )
    const updatedReview = await Review.findByPk(reviewId)
    res.json(updatedReview)
})




module.exports = router;
