import React from "react";
import { orderAPI } from "../../services/service";

export default function CropCard({ crop }) {
  const handleBuy = async () => {
    try {
      const order = await orderAPI.createOrder({
        cropId: crop.id,
        quantity: 1, // default quantity, you can add input later
      });
      alert("Order placed successfully! Order ID: " + order.id);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <img
        src={crop.images?.[0] || ""}
        alt={crop.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-semibold mt-2 text-gray-900 text-lg">{crop.name}</h3>
      <p className="text-gray-600 mt-1 text-sm">By {crop.farmer?.name || "Farmer"}</p>
      <div className="flex justify-between mt-2 items-center">
        <span className="font-bold text-green-600">₹{crop.price}</span>
        <span className="text-gray-500 text-sm">Qty: {crop.quantity}</span>
      </div>
      <button
        onClick={handleBuy}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
      >
        Buy Now
      </button>
    </div>
  );
}
