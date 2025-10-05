// src/pages/Farmer/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { Trash2, PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();

  // dummy initial data
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("agri_cart");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "High-Quality Wheat Seeds",
            type: "Seed",
            price: 500,
            unit: "kg",
            quantity: 2,
            image: "https://images.unsplash.com/photo-1617196034977-158d29f0a8a4?w=200",
          },
          {
            id: 2,
            name: "Urea Fertilizer",
            type: "Fertilizer",
            price: 300,
            unit: "kg",
            quantity: 1,
            image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=200",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("agri_cart", JSON.stringify(cart));
  }, [cart]);

  const increment = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 1000 ? 0 : 50;
  const discount = subtotal > 2000 ? 200 : 0;
  const total = subtotal + delivery - discount;

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-white">My Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <ShoppingCart className="w-20 h-20 text-zinc-600 mb-4" />
            <h2 className="text-2xl font-semibold text-zinc-300 mb-2">
              Your cart is empty
            </h2>
            <p className="text-zinc-500 mb-6">
              Add some products to see them here.
            </p>
            <button
              onClick={() => navigate("/farm-inputs")}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl font-semibold transition"
            >
              Go to Marketplace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow hover:bg-zinc-900 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-zinc-400">{item.type}</p>
                      <p className="mt-1 text-zinc-300">
                        ₹{item.price} / {item.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl">
                      <MinusCircle
                        onClick={() => decrement(item.id)}
                        className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-500"
                      />
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <PlusCircle
                        onClick={() => increment(item.id)}
                        className="w-5 h-5 text-green-400 cursor-pointer hover:text-green-500"
                      />
                    </div>

                    <p className="font-semibold text-green-400">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl transition flex items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow space-y-4">
              <h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">
                Order Summary
              </h2>

              <div className="space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-400">-₹{discount}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-400">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-2xl font-semibold shadow-md shadow-green-800/40 transition text-lg mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
