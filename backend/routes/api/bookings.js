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

router.put('/:bookingId', authenticateUser, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const currentBooking = await Booking.findByPk(bookingId);

    if(!currentBooking) {
        const err = new Error("Booking couldn't be found");
        err.title = "Booking couldn't be found";
        err.errors = ["Booking couldn't be found"];
        err.status = 404;
        return next(err);
    }

    const currentUser = req.user.id;
    const bookingOwner = currentBooking.userId

    if(currentUser !== bookingOwner) {
        const err = new Error('Forbidden');
        err.title = 'Forbidden';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    await Booking.update(
        {startDate, endDate}, {
            where: {id: bookingId}
        }
    );
    const updatedBooking = await Booking.findByPk(bookingId);

    res.json(updatedBooking);
})

router.delete('/:bookingId', authenticateUser, async (req, res, next) => {
    const { bookingId } = req.params;
    const currentBooking = await Booking.findByPk(bookingId);

    if(!currentBooking) {
        const err = new Error("Booking couldn't be found");
        err.title = "Booking couldn't be found";
        err.errors = ["Booking couldn't be found"];
        err.status = 404;
        return next(err);
    }




    await Booking.destroy({
        where: {
            id: bookingId
        }
    })

    res.json ({
        message: "Successfully deleted",
        statusCode: 200
    })
})








module.exports = router;
