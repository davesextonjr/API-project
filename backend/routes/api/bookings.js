const express = require('express')
const sequelize = require('sequelize')

const { setTokenCookie, requireAuth, authenticateUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const router = express.Router();


router.get('/current',authenticateUser, async (req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({where:{userId:userId}}); //find all current users bookings

    res.json(bookings)
});

router.put('/:bookingId', authenticateUser, async (req, res, err) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const userId = req.user.id;

    await Booking.update(
        {startDate, endDate}, {
            where: {id: bookingId}
        }
    );
    const updatedBooking = await Booking.findByPk(bookingId);

    res.json(updatedBooking);
})









module.exports = router;
