import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

type WeatherData = {
  location: { name: string; region: string; country: string };
  current: { temp_c: number; condition: { text: string; icon: string }; humidity: number; wind_kph: number };
};

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('Tehran');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '114906ebac3244b9bd6142050253103'; // API Key

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: apiKey, // API Key
            q: city, // شهر وارد شده
          },
        });
        setWeather(response.data);
      } catch (err) {
        setError('Could not fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-blue-600">Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={handleChangeCity}
          placeholder="Enter city name"
          className="mt-4 p-2 w-full border border-gray-300 rounded-md"
        />
        {loading && <p className="text-center mt-4 text-lg">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-blue-500">{weather.location.name}, {weather.location.region}</h2>
            <p className="text-lg">{weather.current.condition.text}</p>
            <img src={`https:${weather.current.condition.icon}`} alt="weather icon" className="mx-auto" />
            <p className="text-lg">Temperature: {weather.current.temp_c}°C</p>
            <p className="text-lg">Humidity: {weather.current.humidity}%</p>
            <p className="text-lg">Wind Speed: {weather.current.wind_kph} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;