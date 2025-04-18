// Handle the heavy lifting (getting the weather from an API).

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.fetchWeather = async (city, unit = 'metric') => {
    const apiKey = process.env.OPENWEATHER_API_KEY;  // API key from environment variables
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200 || !data.main || !data.name) {
        throw new Error(data.message || "Invalid weather data received");   // Updated to handle API error + file error
    }


    // Return processed weather data
    return {
        city: data.name,                                            // Added city
        temperature: data.main.temp,
        humidity: data.main.humidity,
        clothingSuggestion: suggestClothing(data.main.temp, unit),  // Clothing suggestion logic
    };
};

// Function to suggest clothing based on temperature
const suggestClothing = (temp, unit) => {
    let tempInCelsius = unit === 'metric' ? temp : (temp - 32) * 5/9;  // Convert Fahrenheit to Celsius if needed

    if (tempInCelsius < 5) return 'Wear a heavy coat and warm clothes.';
    if (tempInCelsius < 15) return 'Wear a jacket or layers.';
    if (tempInCelsius < 20) return 'Wear a light jacket or sweater.';
    if (tempInCelsius < 25) return 'Wear light clothing, like a t-shirt or blouse.';
    return 'Wear very light clothing, like shorts and a tank top, and stay hydrated.';
};
