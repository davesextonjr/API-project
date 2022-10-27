const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, json } = require('sequelize')
const router = express.Router();

router.get('/current', authenticateUser, async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: ['User', 'ReviewImages']
    })
    res.json(reviews)
})









module.exports = router;
