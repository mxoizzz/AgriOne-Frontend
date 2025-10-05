// src/pages/Farmer/FarmerProfile.jsx
import React, { useState, useEffect } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar"; 
import { MapPin, Phone, Mail, LogOut, CreditCard } from "lucide-react";
import { authAPI, cropAPI } from "../../services/service";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);
  const [recentCrops, setRecentCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: ""
  });
  const [bankLoading, setBankLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = authAPI.getCurrentUser();
        if (!user) return;

        const crops = await cropAPI.getMyCrops();

        setFarmer({
          name: user.name,
          role: user.role,
          email: user.email || "Not Provided",
          phone: user.phoneNumber,
          location: user.location || "Not Provided",
          totalEarnings: "₹0", // Replace with backend value if available
          totalListings: crops.length,
        });

        // Fetch bank details from user object or API if available
        setBankDetails({
          bankName: user.bankName || "",
          accountNumber: user.accountNumber || "",
          ifscCode: user.ifscCode || ""
        });

        setRecentCrops(crops.slice(-5));
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    navigate("/");
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setBankLoading(true);
    try {
      // Call your backend API to save bank details
      await authAPI.updateBankDetails(bankDetails);
      toast.success("Bank details updated successfully!");
    } catch (err) {
      console.error("Error updating bank details:", err);
      toast.error("Failed to update bank details.");
    } finally {
      setBankLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>No farmer data found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />
      <main className="flex-1 p-6 md:p-10">
        <Toaster position="top-right" />

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-4xl font-bold text-white">
              {farmer.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{farmer.name}</h1>
              <p className="text-zinc-400">{farmer.role}</p>
              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2 text-zinc-300">
                  <Mail className="h-4 w-4 text-green-400" /> {farmer.email}
                </p>
                <p className="flex items-center gap-2 text-zinc-300">
                  <Phone className="h-4 w-4 text-green-400" /> {farmer.phone}
                </p>
                <p className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="h-4 w-4 text-green-400" /> {farmer.location}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md shadow-red-800/30 transition"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow">
            <p className="text-zinc-400 text-sm">Total Listings</p>
            <p className="text-2xl font-bold">{farmer.totalListings}</p>
          </div>
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow">
            <p className="text-zinc-400 text-sm">Total Earnings</p>
            <p className="text-2xl font-bold">{farmer.totalEarnings}</p>
          </div>
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow">
            <p className="text-zinc-400 text-sm">Active Crops</p>
            <p className="text-2xl font-bold">{recentCrops.length}</p>
          </div>
        </div>

        {/* Recent Crops */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Listings</h2>
          {recentCrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition shadow-md"
                >
                  <h3 className="text-xl font-semibold">{crop.name}</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Quantity: {crop.quantity} kg
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    ₹{crop.pricePerUnit}{" "}
                    <span className="text-base text-zinc-400">/unit</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-400">No crops listed yet.</p>
          )}
        </div>

        {/* Bank Details Form */}
        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" /> Bank Details
          </h2>

          <form onSubmit={handleBankSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleBankChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleBankChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={bankLoading}
              className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                bankLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Save Bank Details
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
