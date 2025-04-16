// Set the addresses (URLs) that users visit (e.g., /weather).

const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/weather', weatherController.getWeather); // Maps '/weather' to controller method

module.exports = router;
