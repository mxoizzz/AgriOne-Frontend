// src/pages/Farmer/EquipmentRentals.jsx
import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { PlusCircle, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function EquipmentRentals() {
  const [equipments] = useState([
    {
      id: 1,
      name: "Hand Tractor",
      type: "Tractor",
      pricePerDay: 1500,
      image: "https://images.unsplash.com/photo-1616628188430-b3e3e7ff7e5d?w=600",
    },
    {
      id: 2,
      name: "Sprayer Machine",
      type: "Sprayer",
      pricePerDay: 800,
      image: "https://images.unsplash.com/photo-1615887048854-3d6a907ebf0c?w=600",
    },
    {
      id: 3,
      name: "Rotavator",
      type: "Rotavator",
      pricePerDay: 2000,
      image: "https://images.unsplash.com/photo-1623183018363-61c7b6a9e208?w=600",
    },
    {
      id: 4,
      name: "Seed Drill Machine",
      type: "Seeder",
      pricePerDay: 1200,
      image: "https://images.unsplash.com/photo-1581578017420-e4f59a7a9bb3?w=600",
    },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added to cart!`, {
      icon: "🛠️",
      style: { background: "#111", color: "#fff" },
    });
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Equipment Rentals</h1>

          <Link
            to="/cart"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition shadow"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart ({cart.length})
          </Link>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {equipments.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-lg hover:shadow-green-800/20 transition-transform transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-700/80 text-xs px-3 py-1 rounded-full font-medium">
                  {item.type}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                <p className="text-green-400 font-semibold mb-3">
                  ₹{item.pricePerDay} / day
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="flex items-center gap-2 w-full justify-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-semibold transition"
                >
                  <PlusCircle className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mt-10 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" /> Cart Summary
            </h2>
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm border-b border-zinc-800 pb-2"
                >
                  <span>{item.name}</span>
                  <span className="text-green-400">
                    ₹{item.pricePerDay}/day
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
