// Decide how to handle requests (e.g., get weather data).

const weatherService = require('./weatherService');

exports.getWeather = async (req, res) => {
    const { city, unit } = req.query;
    try {
        const data = await weatherService.fetchWeather(city, unit);
        res.json(data); // Sends the weather data and clothing suggestion
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data.' });
    }
};
