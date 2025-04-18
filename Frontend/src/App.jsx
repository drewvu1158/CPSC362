import React, { useState } from 'react';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}&unit=imperial`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Outfit Recommender</h1>
      <input
        className="border p-2 rounded w-full max-w-xs mb-2"
        type="text"
        placeholder="Enter a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Suggestion
      </button>

      {weather && (
        <div className="mt-6 bg-white shadow rounded p-4 max-w-md w-full">
          <p><strong>City:</strong> {weather.city || city}</p>
          <p><strong>Temperature:</strong> {weather.temperature}°F</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Suggestion:</strong> {weather.clothingSuggestion}</p>
        </div>
      )}
    </div>
  );
}
