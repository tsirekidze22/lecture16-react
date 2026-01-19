import { Cloud } from "lucide-react";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import StatCard from "./components/StatCard";

function App() {
  const [currentCity, setCurrentCity] = useState("Tbilisi");
  const [weather, setWeather] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const fetchWeather = async (city) => {
      const { VITE_WEATHER_API_KEY } = import.meta.env;
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: VITE_WEATHER_API_KEY,
              units: "metric",
            },
          },
        );
        console.log(response.data);
        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather(currentCity);
  }, [currentCity]);

  const handleSearch = () => {
    setCurrentCity(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <section
      className="flex flex-col justify-center items-center text-white min-h-dvh"
      style={{ backgroundImage: `url(/assets/tbilisi.jpg)` }}
    >
      <div className="flex max-w-4xl w-full flex gap-5 mb-10">
        <input
          type="text"
          placeholder="Enter City..."
          className="border flex-1 rounded-md p-3"
          ref={inputRef}
        />
        <button
          className="bg-white p-3 text-stone-900 rounded-md cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {weather && (
        <div className="bg-white/10 backdrop-blur-md flex flex-col justify-between max-w-4xl w-full min-h-[400px]  rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <h3>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].main}
                width={90}
                height={90}
              />
            </h3>
          </div>
          <div className=" flex gap-5 items-center">
            <h2 className="text-5xl font-bold">
              {Math.round(weather.main.temp)}°{" "}
            </h2>
            <h3 className="text-4xl">{weather.weather[0].main}</h3>
          </div>
          <div className=" flex justify-between gap-4">
            <StatCard label={"Humidity"} value={`${weather.main.humidity}%`} />
            <StatCard
              label={"Wind Speed"}
              value={`${weather.wind.speed} m/s`}
            />
            <StatCard label={"Pressure"} value={weather.main.pressure} />
            <StatCard
              label={"Visibility"}
              value={`${weather.visibility} Meters`}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
