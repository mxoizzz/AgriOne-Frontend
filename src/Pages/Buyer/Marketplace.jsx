import React, { useEffect, useState } from "react";
import { cropAPI, orderAPI } from "../../services/service";

export default function Marketplace() {
  const [crops, setCrops] = useState([]);
  const [displayCrops, setDisplayCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await cropAPI.getAllCrops();
        setCrops(res);
        setDisplayCrops(res);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch crops:", err);
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterCrops(value, filterType);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterType(value);
    filterCrops(search, value);
  };

  const filterCrops = (searchText, type) => {
    let filtered = crops;
    if (searchText) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchText.toLowerCase()) ||
          c.type.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter((c) => c.type === type);
    }
    setDisplayCrops(filtered);
  };

  const handleBuy = async (cropId) => {
    try {
      const order = await orderAPI.createOrder({ cropId, quantity: 1 });
      alert("Order placed! ID: " + order.id);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  const cropTypes = [...new Set(crops.map((c) => c.type))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Marketplace</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={handleSearch}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          value={filterType}
          onChange={handleFilter}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Types</option>
          {cropTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Crop Grid */}
      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading crops...</div>
      ) : displayCrops.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No crops found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={crop.images?.[0] || ""}
                alt={crop.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="font-semibold mt-2 text-gray-900 text-lg">
                {crop.name}
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                By {crop.farmer?.name || "Farmer"}
              </p>
              <div className="flex justify-between mt-2 items-center">
                <span className="font-bold text-green-600">₹{crop.price}</span>
                <span className="text-gray-500 text-sm">Qty: {crop.quantity}</span>
              </div>
              <button
                onClick={() => handleBuy(crop.id)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
