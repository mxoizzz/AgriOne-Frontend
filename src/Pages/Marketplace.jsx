import React from "react";
import { Sun, Bell, PlusCircle } from "lucide-react";
import FarmerSidebar from "../Components/FarmerSidebar"; // adjust path if needed

export default function Marketplace() {
  const crops = [
    {
      id: 1,
      name: "Wheat",
      stock: "500 kg",
      price: 2180,
      unit: "/quintal",
      localPrice: 2130,
      demand: "High",
      buyers: 12,
      demandColor: "text-green-400",
    },
    {
      id: 2,
      name: "Rice",
      stock: "300 kg",
      price: 2900,
      unit: "/quintal",
      localPrice: 2850,
      demand: "Medium",
      buyers: 8,
      demandColor: "text-yellow-400",
    },
    {
      id: 3,
      name: "Maize",
      stock: "200 kg",
      price: 1600,
      unit: "/quintal",
      localPrice: 1580,
      demand: "Low",
      buyers: 5,
      demandColor: "text-red-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <FarmerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <input
            type="text"
            placeholder="Search crops, prices, weather..."
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 w-full md:w-1/2 text-white placeholder-zinc-500"
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Sun className="h-5 w-5 text-yellow-400" />
              <span>28°C Sunny</span>
            </div>
            <Bell className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white transition" />
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold shadow-md shadow-green-800/40">
              RK
            </div>
          </div>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Earnings", value: "₹12.8L", note: "+12% this month", color: "text-green-400" },
            { label: "Active Listings", value: "6", note: "2 sold today", color: "text-blue-400" },
            { label: "Interested Buyers", value: "64", note: "8 new inquiries", color: "text-yellow-400" },
            { label: "Avg. Price Gain", value: "+₹87", note: "vs local market", color: "text-purple-400" },
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

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Marketplace</h2>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-md shadow-green-800/30 transition">
            <PlusCircle className="h-5 w-5" /> Add New Listing
          </button>
        </div>

        {/* Crops List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition shadow-md hover:shadow-lg hover:shadow-green-800/20"
            >
              <h3 className="text-xl font-semibold">{crop.name}</h3>
              <p className="text-zinc-400 text-sm mt-1">Stock: {crop.stock}</p>
              <p className="text-2xl font-bold mt-2">
                ₹{crop.price} <span className="text-base text-zinc-400">{crop.unit}</span>
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                Local Price: <span className="text-purple-400">₹{crop.localPrice}</span>
              </p>
              <p className={`${crop.demandColor} text-sm mt-1`}>
                Demand: {crop.demand} • Buyers: {crop.buyers}
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
      </main>
    </div>
  );
}
