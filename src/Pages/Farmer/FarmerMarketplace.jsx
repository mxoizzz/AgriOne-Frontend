// src/pages/Farmer/Marketplace.jsx
import React, { useState, useEffect } from "react";
import { Search, Bell, Cloud, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { authAPI, cropAPI } from "../../services/service";
import axios from "axios";

export default function Marketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged-in farmer
    const user = authAPI.getCurrentUser();
    if (user) setFarmer(user);

    // Fetch farmer's crops
    cropAPI.getMyCrops().then((data) => setCrops(data));

    // Fetch weather using browser geolocation
    const fetchWeather = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        );
        const current = res.data.current_weather;
        setWeather({
          temperature: current.temperature,
          wind: current.windspeed,
          weatherCode: current.weathercode,
        });
      } catch (error) {
        console.error("Open-Meteo API error:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(lat, lon);
        },
        (error) => {
          console.warn("Geolocation failed, fallback to Pune:", error.message);
          fetchWeather(18.5204, 73.8567); // fallback
        }
      );
    } else {
      fetchWeather(18.5204, 73.8567); // fallback
    }
  }, []);

  if (!farmer) return <div className="text-white p-6">Loading...</div>;

  const initials = farmer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const weatherText = (code) => {
    switch (code) {
      case 0:
        return "Clear Sky";
      case 1:
      case 2:
      case 3:
        return "Partly Cloudy";
      case 45:
      case 48:
        return "Fog";
      case 51:
      case 53:
      case 55:
        return "Drizzle";
      case 61:
      case 63:
      case 65:
        return "Rain";
      case 71:
      case 73:
      case 75:
        return "Snow";
      case 80:
      case 81:
      case 82:
        return "Rain Showers";
      case 95:
      case 96:
      case 99:
        return "Thunderstorm";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <FarmerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 flex items-center justify-between">
          <button
            className="md:hidden mr-3"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search crops, prices, weather..."
              className="w-full bg-zinc-900 text-sm pl-10 pr-3 py-2 rounded-lg focus:outline-none border border-zinc-800"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-6 ml-3">
            {/* Notifications */}
            <div className="relative cursor-pointer">
              <Bell size={18} className="text-zinc-400" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">
                3
              </span>
            </div>

            {/* Weather pill */}
            <div className="hidden sm:flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-lg">
              <Cloud size={16} />
              {weather ? (
                <>
                  <span>{Math.round(weather.temperature)}°C</span>
                  <span className="text-xs">{weatherText(weather.weatherCode)}</span>
                </>
              ) : (
                <>
                  <span>--°C</span>
                  <span className="text-xs">Loading...</span>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-sm">{initials}</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">{farmer.name}</p>
                <p className="text-xs text-zinc-400">
                  {farmer.role || "Farmer"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Marketplace</h2>
            <button
              onClick={() => navigate("/add-listing")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md shadow-green-800/30 transition"
            >
              <PlusCircle className="h-5 w-5" /> Add New Listing
            </button>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Earnings",
                value: farmer.totalEarnings || "₹0",
                note: "+12% this month",
                color: "text-green-400",
              },
              {
                label: "Active Listings",
                value: crops.length,
                note: "2 sold today",
                color: "text-blue-400",
              },
              {
                label: "Interested Buyers",
                value: farmer.activeBuyers || 0,
                note: "8 new inquiries",
                color: "text-yellow-400",
              },
              {
                label: "Avg. Price Gain",
                value: "+₹87",
                note: "vs local market",
                color: "text-purple-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-zinc-950 p-4 md:p-6 rounded-xl border border-zinc-800 shadow hover:shadow-lg hover:shadow-green-800/10 transition"
              >
                <p className="text-zinc-400 text-sm">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className={`${stat.color} text-xs mt-1`}>{stat.note}</p>
              </div>
            ))}
          </div>

          {/* Crops List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition shadow-md hover:shadow-lg hover:shadow-green-800/20"
              >
                <h3 className="text-xl font-semibold">{crop.name}</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Stock: {crop.quantity} {crop.unit || "kg"}
                </p>
                <p className="text-2xl font-bold mt-2">
                  ₹{crop.pricePerUnit}{" "}
                  <span className="text-base text-zinc-400">
                    /{crop.unit || "kg"}
                  </span>
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  Local Price:{" "}
                  <span className="text-purple-400">
                    ₹{crop.localPrice || crop.pricePerUnit - 50}
                  </span>
                </p>
                <p
                  className={`${
                    crop.demand === "High"
                      ? "text-green-400"
                      : crop.demand === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  } text-sm mt-1`}
                >
                  Demand: {crop.demand || "Medium"} • Buyers:{" "}
                  {crop.buyers || 0}
                </p>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md shadow-green-800/30 transition">
                    Sell Now
                  </button>
                  <button className="flex-1 border border-green-600 hover:bg-green-800 px-4 py-2 rounded-xl transition text-green-400 hover:text-white">
                    Set Price Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
