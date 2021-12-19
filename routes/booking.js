const express = require('express');
const bookingController = require('../controllers/booking');
const {body} = require('express-validator');
const tokenAuthentication = require('../middleware/is-auth');

const router = express.Router();

router.post('/reserve-tickets', tokenAuthentication, [
    body('noOfPassengers').custom((value, {req}) => {
        if(value === 0)
            throw new Error('Number of passengers should not be zero!!');
        else
         return true;
    }),
], bookingController.postBookTrain);

router.get('/show-journeys', tokenAuthentication, bookingController.getJourneys);

module.exports = router;