const weatherService = require('./weatherService');

exports.getWeather = async (req, res) => {
  const city = req.query.city;
  const unit = req.query.unit || 'metric';

  console.log("City requested:", city); // ✅ Log the city being requested

  try {
    const weatherData = await weatherService.fetchWeather(city, unit);

    if (!weatherData || !weatherData.temperature) {
      console.warn("Missing or incomplete weather data:", weatherData);
      return res.status(500).json({ error: "Incomplete weather data received from API" });
    }

    res.json(weatherData);
  } catch (error) {
    console.error("Backend error:", error.message); // ✅ Show root cause
    res.status(500).json({
      error: "Failed to retrieve weather data",
      details: error.message
    });
  }
};
