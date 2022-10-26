const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message: "You made it"
    })
})

module.exports = router;
