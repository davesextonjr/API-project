const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const router = express.Router();

router.delete('/:imageId', authenticateUser, async (req, res, next) => {
    const { imageId } = req.params;

    const currentImage = await ReviewImage.findByPk(imageId)
    if(!currentImage) {
        const err = new Error("Review Image couldn't be found");
        err.title = "Review Image couldn't be found";
        err.errors = ["Review Image couldn't be found"];
        err.status = 404;
        return next(err);
    }

    await ReviewImage.destroy({
        where: {
            id: imageId
        }
    })

    res.json ({
        message: "Successfully deleted",
        statusCode: 200
    })
})







module.exports = router;
