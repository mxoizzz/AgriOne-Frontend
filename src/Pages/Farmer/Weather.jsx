// src/pages/Farmer/Weather.jsx
import React, { useEffect, useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import {
  Sun,
  Cloud,
  CloudRain,
  Droplets,
  Wind,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import axios from "axios";
import { authAPI } from "../../services/service";

export default function Weather() {
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (lat, lon) => {
    try {
      const hourlyVars = [
        "temperature_2m",
        "relative_humidity_2m",
        "rain",
        "showers",
        "cloud_cover",
        "wind_speed_10m",
        "soil_temperature_0cm",
        "soil_temperature_6cm",
        "soil_temperature_18cm",
        "soil_temperature_54cm",
        "soil_moisture_0_to_1cm",
        "soil_moisture_1_to_3cm",
        "soil_moisture_3_to_9cm",
      ].join(",");

      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=${hourlyVars}&current_weather=true&timezone=auto&forecast_days=7`
      );

      const now = new Date();
      const currentHourIndex = res.data.hourly.time.findIndex(
        (t) => new Date(t).getHours() === now.getHours()
      );

      const currentHourly = {
        temperature: res.data.hourly.temperature_2m[currentHourIndex],
        humidity: res.data.hourly.relative_humidity_2m[currentHourIndex],
        rain:
          res.data.hourly.rain[currentHourIndex] +
          res.data.hourly.showers[currentHourIndex],
        wind_speed: res.data.hourly.wind_speed_10m[currentHourIndex],
        soil_temp_0cm: res.data.hourly.soil_temperature_0cm[currentHourIndex],
        soil_temp_6cm: res.data.hourly.soil_temperature_6cm[currentHourIndex],
        soil_temp_18cm: res.data.hourly.soil_temperature_18cm[currentHourIndex],
        soil_temp_54cm: res.data.hourly.soil_temperature_54cm[currentHourIndex],
        soil_moisture_0_1cm: res.data.hourly.soil_moisture_0_to_1cm[currentHourIndex],
        soil_moisture_1_3cm: res.data.hourly.soil_moisture_1_to_3cm[currentHourIndex],
        soil_moisture_3_9cm: res.data.hourly.soil_moisture_3_to_9cm[currentHourIndex],
        clouds: res.data.hourly.cloud_cover[currentHourIndex],
      };

      const dailyForecast = [];
      for (let i = 0; i < 7; i++) {
        const dayHours = res.data.hourly.time
          .map((t, idx) => ({ t: new Date(t), idx }))
          .filter(
            ({ t }) =>
              t.getDate() === now.getDate() + i &&
              t.getMonth() === now.getMonth() &&
              t.getFullYear() === now.getFullYear()
          );

        const temps = dayHours.map(({ idx }) => res.data.hourly.temperature_2m[idx]);
        const rains = dayHours.map(
          ({ idx }) => res.data.hourly.rain[idx] + res.data.hourly.showers[idx]
        );
        const winds = dayHours.map(({ idx }) => res.data.hourly.wind_speed_10m[idx]);
        const clouds = dayHours.map(({ idx }) => res.data.hourly.cloud_cover[idx]);

        dailyForecast.push({
          max: temps.length ? Math.max(...temps) : "-",
          min: temps.length ? Math.min(...temps) : "-",
          rain: rains.length ? rains.reduce((a, b) => a + b, 0) : "-",
          wind: winds.length ? (winds.reduce((a, b) => a + b, 0) / winds.length).toFixed(1) : "-",
          clouds: clouds.length ? (clouds.reduce((a, b) => a + b, 0) / clouds.length).toFixed(0) : "-",
        });
      }

      setCurrent(currentHourly);
      setDaily(dailyForecast);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (user?.location?.lat && user?.location?.lon) {
      fetchWeather(Number(user.location.lat), Number(user.location.lon));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.error(err);
          alert("Location access denied.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <FarmerSidebar />
        <main className="flex-1 flex items-center justify-center text-xl">
          Loading weather...
        </main>
      </div>
    );

  if (!current)
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <FarmerSidebar />
        <main className="flex-1 flex items-center justify-center text-xl">
          Unable to fetch weather data.
        </main>
      </div>
    );

  const getWeatherIcon = (rain, clouds) => {
    if (rain > 0) return <CloudRain className="w-12 h-12 text-cyan-400" />;
    if (clouds > 50) return <Cloud className="w-12 h-12 text-gray-400" />;
    return <Sun className="w-12 h-12 text-yellow-400" />;
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <FarmerSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Weather Forecast</h1>

        {/* Current Weather Hero Card */}
        <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl mb-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            {getWeatherIcon(current.rain, current.clouds)}
            <div className="text-6xl font-bold mt-4">{current.temperature}°C</div>
            <div className="text-xl mt-2">Humidity: {current.humidity}%</div>
            <div className="text-xl mt-1">Wind: {current.wind_speed} m/s</div>
            <div className="text-xl mt-1">Rain: {current.rain?.toFixed(1) ?? "-"} mm</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 text-lg mt-4 md:mt-0">
            <div>Soil 0cm: {current.soil_temp_0cm}°C / {current.soil_moisture_0_1cm}</div>
            <div>Soil 6cm: {current.soil_temp_6cm}°C</div>
            <div>Soil 18cm: {current.soil_temp_18cm}°C</div>
            <div>Soil 54cm: {current.soil_temp_54cm}°C</div>
            <div>1-3cm moisture: {current.soil_moisture_1_3cm}</div>
            <div>3-9cm moisture: {current.soil_moisture_3_9cm}</div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {daily.map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            return (
              <div
                key={index}
                className="flex-shrink-0 w-64 bg-zinc-800 p-5 rounded-2xl shadow hover:scale-105 transition-transform"
              >
                <div className="text-center font-semibold text-lg mb-3">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex justify-center mb-3">
                  {getWeatherIcon(day.rain, day.clouds)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-4 h-4 text-red-400" /> {day.max}°C
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowDown className="w-4 h-4 text-blue-400" /> {day.min}°C
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-cyan-400" /> {day.rain?.toFixed(1) ?? "-"} mm
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-4 h-4 text-green-400" /> {day.wind} m/s
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
