// Handle the heavy lifting (getting the weather from an API).

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.fetchWeather = async (city, unit = 'metric') => {
    const apiKey = process.env.OPENWEATHER_API_KEY;  // API key from environment variables
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200 || !data.main || !data.name) {
        throw new Error("The city you entered could not be found. Please check the spelling and try again.");
    }

    const weatherCondition = data.weather && data.weather[0] ? data.weather[0].main.toLowerCase() : null;

    // Return processed weather data
    return {
        city: data.name,                                            // Added city
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,                            // Added feelsLike
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,                                 // Added windSpeed
        weatherCondition,                                          // Include weather condition
        clothingSuggestion: suggestClothing(data.main.temp, unit, weatherCondition),  // Clothing suggestion logic
        tips: generateTips(data.main.temp, weatherCondition),       // Added tips logic
    };
};

// Function to suggest clothing based on temperature and weather condition
const suggestClothing = (temp, unit, weatherCondition) => {
    let tempInCelsius = unit === 'metric' ? temp : (temp - 32) * 5 / 9; // Convert Fahrenheit to Celsius if needed

    if (weatherCondition === 'hard rain') {
        return 'It is raining heavily. Wear a waterproof jacket, carry an umbrella, and wear waterproof shoes.';
    }
    if (weatherCondition === 'rain') {
        return 'It is raining. Wear a waterproof jacket and carry an umbrella.';
    }
    if (weatherCondition === 'snow') {
        return 'It is snowing. Wear a heavy coat, gloves, and boots.';
    }
    if (weatherCondition === 'clear clouds') {
        return 'It is partly cloudy. Wear light clothing, but carry a jacket just in case.';
    }

    // Default suggestions based on temperature
    if (tempInCelsius < 5) return 'Wear a heavy coat and warm clothes.';
    if (tempInCelsius < 15) return 'Wear a jacket or layers.';
    if (tempInCelsius < 20) return 'Wear a light jacket or sweater.';
    if (tempInCelsius < 25) return 'Wear light clothing, like a t-shirt or blouse.';
    return 'Wear very light clothing, like shorts and a tank top.';
};

// Function to generate tips based on temperature and weather condition
const generateTips = (temp, weatherCondition) => {
    let tips = '';

    // Hot weather tips
    if (temp > 30) {
        tips += 'It is very hot. Stay hydrated and avoid prolonged exposure to the sun. ';
        tips += 'It is sunny. Wear sunscreen and sunglasses to protect yourself. '; // Sunscreen advice only for hot days
    }

    // Clear weather tips
    if (weatherCondition === 'clear') {
        tips += 'It’s a great day for outdoor activities. Enjoy the fresh air! ';
    }

    // Cold weather tips
    if (temp < 5) {
        tips += 'It is very cold. Stay indoors if possible and avoid prolonged exposure to the cold. ';
        tips += 'Drink warm beverages to stay warm and maintain your body temperature. ';
    }
    if (weatherCondition === 'snow') {
        tips += 'Be cautious of slippery surfaces and drive carefully. ';
    }

    // Rainy weather tips
    if (weatherCondition === 'rain') {
        tips += 'It is raining. Be cautious of slippery surfaces and puddles while walking or driving. ';
    }

    return tips.trim();
};
