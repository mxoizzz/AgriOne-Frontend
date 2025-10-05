import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  Package,
  Sun,
  Cloud,
  TrendingUp,
  Warehouse,
  ShoppingCart,
  AlertTriangle,
  Droplets,
  Wind,
  Eye,
  BookOpen,
  PlayCircle,
  Search,
  Bell,
} from "lucide-react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { authAPI, cropAPI } from "../../services/service";
import axios from "axios";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [myCrops, setMyCrops] = useState([]);

  useEffect(() => {
    // Fetch logged-in farmer info
    const user = authAPI.getCurrentUser();
    if (user) setFarmer(user);

    // Fetch farmer's crops
    cropAPI.getMyCrops().then((data) => setMyCrops(data));

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

  // Map Open-Meteo weather codes to text
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
        {/* Top Bar */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 flex items-center justify-between">
          <button className="md:hidden mr-3" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Search crops, prices, weather..."
              className="w-full bg-zinc-900 text-sm pl-10 pr-3 py-2 rounded-lg focus:outline-none border border-zinc-800"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-6 ml-3">
            <div className="relative cursor-pointer">
              <Bell size={18} className="text-zinc-400" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">3</span>
            </div>

            {/* Weather */}
            <div className="hidden sm:flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-lg">
              <Cloud size={16} />
              {weather ? <span>{Math.round(weather.temperature)}°C</span> : <span>--°C</span>}
              <span className="text-xs">{weather ? weatherText(weather.weatherCode) : "--"}</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-sm">{initials}</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">{farmer.name}</p>
                <p className="text-xs text-zinc-400">{farmer.role || "Farmer"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition">
              <p className="text-sm text-zinc-400">Today's Earnings</p>
              <p className="text-2xl md:text-3xl font-bold">{farmer.totalEarnings || "₹0"}</p>
              <p className="text-xs text-green-500 mt-1">+12% from yesterday</p>
              <DollarSign className="text-green-400 mt-3" />
            </div>

            <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition">
              <p className="text-sm text-zinc-400">Active Buyers</p>
              <p className="text-2xl md:text-3xl font-bold">{farmer.activeBuyers || 0}</p>
              <p className="text-xs text-blue-500 mt-1">8 new inquiries</p>
              <Users className="text-blue-400 mt-3" />
            </div>

            <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition">
              <p className="text-sm text-zinc-400">Crops Listed</p>
              <p className="text-2xl md:text-3xl font-bold">{myCrops.length}</p>
              <p className="text-xs text-purple-500 mt-1">2 sold today</p>
              <Package className="text-purple-400 mt-3" />
            </div>

            <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800 hover:shadow-lg transition">
              <p className="text-sm text-zinc-400">Weather</p>
              {weather ? (
                <p className="text-2xl md:text-3xl font-bold">{Math.round(weather.temperature)}°C</p>
              ) : (
                <p className="text-2xl md:text-3xl font-bold">--°C</p>
              )}
              <p className="text-xs text-yellow-500 mt-1">{weather ? weatherText(weather.weatherCode) : "--"}</p>
              <Sun className="text-yellow-400 mt-3" />
            </div>
          </div>

          {/* Today's Overview */}
          <div className="bg-zinc-950 border-l-4 border-yellow-500 rounded-xl mb-6">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold">Today's Overview</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
                  <Cloud className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium">Weather Forecast</p>
                    <p className="text-sm text-zinc-400">
                      {weather ? weatherText(weather.weatherCode) : "Sunny"}, {weather ? Math.round(weather.temperature) : 28}°C
                    </p>
                    <p className="text-xs text-zinc-500">Rain in 2 days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-medium">Best Price Today</p>
                    <p className="text-sm text-zinc-400">₹2,180/quintal</p>
                    <p className="text-xs text-green-500">Wheat +₹50</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg">
                  <Warehouse className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="font-medium">Storage Status</p>
                    <p className="text-sm text-zinc-400">1.75T Total</p>
                    <p className="text-xs text-zinc-500">85% capacity</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <p className="text-sm font-medium">PM-KISAN scheme deadline: 5 days remaining</p>
                </div>
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-md">Action Required</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" /> Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Marketplace */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
                  <div className="flex items-center justify-between mb-2">
                    <ShoppingCart className="bg-green-100 text-green-500 p-2 rounded-full" />
                    <span className="bg-red-600 text-xs px-2 py-1 rounded">Hot</span>
                  </div>
                  <h3 className="font-semibold">Marketplace</h3>
                  <p className="text-sm text-zinc-400">Sell your crops at best prices</p>
                  <p className="text-xs text-green-400 mt-1">{myCrops.length} Active Listings</p>
                </div>

                {/* Farm Inputs */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="bg-blue-100 text-blue-500 p-2 rounded-full" />
                  </div>
                  <h3 className="font-semibold">Farm Inputs</h3>
                  <p className="text-sm text-zinc-400">Seeds, fertilizer, pesticides</p>
                  <p className="text-xs text-blue-400 mt-1">30% Bulk Discount</p>
                </div>

                {/* Weather */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
                  <div className="flex items-center justify-between mb-2">
                    <Cloud className="bg-blue-100 text-blue-500 p-2 rounded-full" />
                  </div>
                  <h3 className="font-semibold">Weather</h3>
                  <p className="text-sm text-zinc-400">7-day detailed forecast</p>
                  <p className="text-xs text-blue-400 mt-1">{weather ? weatherText(weather.weatherCode) : "Sunny, Clear Sky"}</p>
                </div>

                {/* Storage */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition">
                  <div className="flex items-center justify-between mb-2">
                    <Warehouse className="bg-yellow-100 text-yellow-500 p-2 rounded-full" />
                  </div>
                  <h3 className="font-semibold">Storage</h3>
                  <p className="text-sm text-zinc-400">Smart crop storage</p>
                  <p className="text-xs text-yellow-400 mt-1">1.75T Stored</p>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Cloud className="text-blue-400" /> Weather Forecast
              </h2>
              <div className="text-center py-4">
                <Sun className="text-yellow-400 mx-auto mb-2" size={48} />
                <p className="text-4xl font-bold">{weather ? Math.round(weather.temperature) : 28}°C</p>
                <p className="text-sm text-zinc-400">{weather ? weatherText(weather.weatherCode) : "Sunny, Clear Sky"}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm border-t border-zinc-800 pt-4">
                <div>
                  <Droplets className="mx-auto text-blue-400" /> 65%
                </div>
                <div>
                  <Wind className="mx-auto text-zinc-400" /> {weather ? weather.wind : 12} km/h
                </div>
                <div>
                  <Eye className="mx-auto text-zinc-400" /> 10 km
                </div>
              </div>
            </div>
          </div>

          {/* Schemes & Learning */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-2 font-semibold mb-3">
                <AlertTriangle className="text-yellow-400" /> Government Schemes
              </h2>
              <div className="p-3 border border-zinc-800 rounded mb-2">
                <p className="font-medium text-sm">PM-KISAN Scheme</p>
                <p className="text-xs text-zinc-400">Amount: ₹6,000</p>
                <p className="text-red-500 text-xs mt-1">5 days left</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-2 font-semibold mb-3">
                <BookOpen className="text-blue-400" /> Today's Tip
              </h2>
              <p className="text-sm text-zinc-300">Improve soil fertility through crop rotation</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h2 className="flex items-center gap-2 font-semibold mb-3">
                <PlayCircle className="text-red-400" /> Educational Videos
              </h2>
              <p className="text-sm text-zinc-400">Learn modern farming techniques</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
