// src/pages/Farmer/FarmInputs.jsx
import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { ShoppingCart, PlusCircle, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function FarmInputs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const inputs = [
    {
      id: 1,
      name: "High-Quality Wheat Seeds",
      type: "Seed",
      price: 500,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1566837274505-519217e6c30a",
    },
    {
      id: 2,
      name: "Paddy Seeds",
      type: "Seed",
      price: 450,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1606248897732-2bdb5889633d",
    },
    {
      id: 3,
      name: "Urea Fertilizer",
      type: "Fertilizer",
      price: 300,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1615484478135-3d6e8aa7fadb",
    },
    {
      id: 4,
      name: "Organic Compost",
      type: "Fertilizer",
      price: 250,
      unit: "bag",
      image: "https://images.unsplash.com/photo-1589923188900-87df84b12af3",
    },
    {
      id: 5,
      name: "Potash Fertilizer",
      type: "Fertilizer",
      price: 400,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1631586671866-4fc2cb9adbd4",
    },
  ];

  const filteredInputs =
    activeCategory === "All"
      ? inputs
      : inputs.filter((item) => item.type === activeCategory);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added to cart!`);
  };

  const categories = ["All", "Seed", "Fertilizer"];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Farm Inputs</h1>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition shadow"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cart.length})
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === category
                  ? "bg-green-600 border-green-600 text-white shadow"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <Filter className="w-4 h-4" /> {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInputs.map((item) => (
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
                  ₹{item.price} / {item.unit}
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
      </main>

      {/* Floating Cart Shortcut */}
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>
    </div>
  );
}
