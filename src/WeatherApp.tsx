import  { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import { BlinkBlur } from "react-loading-indicators";
import Sun from './images/sun.jpg'
import Train from './images/train.jpg'
import PartlyCloudy from './images/PartlyCloudy.png'
import Cloudy from './images/cloudy.png'
import Moon from './images/moon.jpg'


type WeatherData = {
  location: { name: string; region: string; country: string };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    wind_kph: number;
  };
};

export default function WeatherApp() {
  const [city, setCity] = useState<string | null>("Tehran");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = "114906ebac3244b9bd6142050253103"; // API Key

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/current.json",
          {
            params: {
              key: apiKey, // API Key
              q: city, // شهر وارد شده
            },
          }
        );
        setWeather(response.data);
        setCity(response.data.location.name);
        console.log(response.data);
      } catch (err) {
        console.log("Could not fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleChangeCity = (value: string | null) => {
    setCity(value);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="z-[-1] absolute left-0 top-0 w-full h-full">
        {weather && weather.current.condition.text === "Sunny" ? (
          <img
            src={Sun}
            alt=""
            className="w-full h-full object-cover md:object-fill"
          />
        ) : weather?.current.condition.text === "Mist" ? (
          <img
            src={Cloudy}
            alt=""
            className="w-full h-full object-cover md:object-fill"
          />
        ) : weather?.current.condition.text === "Partly cloudy" ? (
          <img
            src={PartlyCloudy}
            alt=""
            className="w-full h-full object-cover md:object-fill"
          />
        ) : weather?.current.condition.text === "Clear" ? (
          <img
            src={Moon}
            alt=""
            className="w-full h-full object-cover md:object-fill"
          />
        ) : (
          <img
            src={Train}
            alt=""
            className="w-full h-full object-cover md:object-fill"
          />
        )}
      </div>
      <main className="col-span-9 p-12 px-16 pb-20 mix-blend-difference isolate text-white flex flex-col justify-between">
        <h1 className=" text-5xl font-Special font-light">Check The Weather</h1>
        {loading ? (
          <p className="text-center mt-4 text-lg">
            <BlinkBlur
              color="#ffffff"
              size="medium"
              text="Loading..."
              textColor="#ffffff"
            />
          </p>
        ) : (
          weather && (
            <div className="mt-4 flex gap-20">
              <div className="flex items-center">
                <p className="text-6xl font-bold">{weather.current.temp_c}°</p>
              </div>
              <div>
                <div className="flex gap-16">
                  <h2 className="text-5xl font-bold text-gray-500 pb-8">
                    {weather.location.name}, {weather.location.country}
                  </h2>
                  {/* <p>{weather.current.condition.text}</p> */}
                  {/* <img
                  src={`https:${weather.current.condition.icon}`}
                  alt="weather icon"
                  className="mx-auto"
                /> */}
                </div>
                <p className="text-lg mt-2">
                  Humidity: {weather.current.humidity}%
                </p>
                <p className="text-lg mt-2">
                  Wind Speed: {weather.current.wind_kph} km/h
                </p>
              </div>
            </div>
          )
        )}
      
      </main>
      <div className="col-span-3">
        <Sidebar value={city} handleChange={handleChangeCity} />
      </div>
    </div>
  );
}
