import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { Warehouse, MapPin, Thermometer, Clock } from "lucide-react";

export default function Storage() {
  const [storages] = useState([
    {
      id: 1,
      name: "GreenField Cold Storage",
      location: "Nashik, Maharashtra",
      capacity: "500 Tons",
      temperature: "2°C",
      availability: "Available",
      price: "₹1,200 / ton / month",
    },
    {
      id: 2,
      name: "AgroSafe Warehouse",
      location: "Ahmednagar, Maharashtra",
      capacity: "300 Tons",
      temperature: "Ambient",
      availability: "Limited",
      price: "₹800 / ton / month",
    },
    {
      id: 3,
      name: "CoolCrop Storage Hub",
      location: "Pune, Maharashtra",
      capacity: "700 Tons",
      temperature: "1.5°C",
      availability: "Available",
      price: "₹1,000 / ton / month",
    },
  ]);

  const handleBook = (storage) => {
    alert(`Booking request sent for ${storage.name}`);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
          <Warehouse className="w-7 h-7 text-green-500" />
          Storage & Warehouses
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storages.map((storage) => (
            <div
              key={storage.id}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow hover:shadow-lg hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-green-400">
                  {storage.name}
                </h2>
              </div>

              <div className="space-y-2 text-sm text-zinc-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {storage.location}
                </p>
                <p>Capacity: <span className="text-white font-medium">{storage.capacity}</span></p>
                <p className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-400" />
                  Temp: <span className="text-white font-medium">{storage.temperature}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      storage.availability === "Available"
                        ? "text-green-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {storage.availability}
                  </span>
                </p>
                <p className="font-semibold text-white">Price: {storage.price}</p>
              </div>

              <button
                onClick={() => handleBook(storage)}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold transition-all"
              >
                Book Storage
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
