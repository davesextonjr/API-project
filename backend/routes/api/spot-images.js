const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const router = express.Router();

router.delete('/:imageId', authenticateUser, async (req, res, next) => {
    const { imageId } = req.params;
    const currentImage = await SpotImage.findByPk(imageId)
    if(!currentImage) {
        const err = new Error("Spot Image couldn't be found");
        err.title = "Spot Image couldn't be found";
        err.errors = ["Spot Image couldn't be found"];
        err.status = 404;
        return next(err);
    }


    await SpotImage.destroy({
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
