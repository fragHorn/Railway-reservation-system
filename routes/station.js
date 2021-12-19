const express = require('express');
const stationController = require('../controllers/station');
const router = express.Router();

router.get('/home', stationController.getHome);
router.post('/search-trains', stationController.postSearchTrains);

module.exports = router;