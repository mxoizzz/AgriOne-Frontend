// src/pages/Farmer/Checkout.jsx
import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { CreditCard, MapPin, Truck, Loader2 } from "lucide-react";

export default function Checkout() {
  const cart = [
    {
      id: 1,
      name: "High-Quality Wheat Seeds",
      type: "Seed",
      price: 500,
      unit: "kg",
      quantity: 2,
    },
    {
      id: 2,
      name: "Urea Fertilizer",
      type: "Fertilizer",
      price: 300,
      unit: "kg",
      quantity: 1,
    },
    {
      id: 3,
      name: "Hand Tractor (1 Day Rental)",
      type: "Equipment",
      price: 1500,
      unit: "day",
      quantity: 1,
    },
  ];

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    village: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.address || !form.village || !form.pincode) {
      alert("Please fill all shipping details.");
      return;
    }

    setIsPlacingOrder(true);
    setTimeout(() => {
      alert("✅ Order placed successfully! (Demo only)");
      setIsPlacingOrder(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <MapPin className="text-green-500" size={20} />
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
                <input
                  type="text"
                  name="village"
                  placeholder="Village / Town"
                  value={form.village}
                  onChange={handleChange}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (Street / Landmark)"
                  value={form.address}
                  onChange={handleChange}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none md:col-span-2"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CreditCard className="text-green-500" size={20} />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={form.paymentMethod === "online"}
                    onChange={handleChange}
                  />
                  <span>Online Payment (Demo)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Truck className="text-green-500" size={20} />
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-zinc-800 pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-400">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div className="flex justify-between text-lg font-semibold pt-4 border-t border-zinc-800">
              <span>Total</span>
              <span className="text-green-400">₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full bg-green-600 hover:bg-green-700 mt-6 py-3 rounded-2xl font-semibold shadow-md shadow-green-800/40 transition text-lg flex justify-center items-center"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} /> Placing Order...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
