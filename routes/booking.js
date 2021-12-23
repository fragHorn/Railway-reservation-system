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
    body('date')
    .custom( value => {
        const date = new Date(Number(value.split('-')[0]), Number(value.split('-')[1])-1, Number(value.split('-')[2]), 23, 59, 59);
        if(date.getTime() < (new Date()).getTime())
            throw new Error('Trying to Time Travel, are you ???');
        else 
            return true;
    })
], bookingController.postBookTrain);

router.get('/show-journeys', tokenAuthentication, bookingController.getJourneys);

module.exports = router;