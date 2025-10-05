// src/pages/Farmer/AddListing.jsx
import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import toast, { Toaster } from "react-hot-toast";
import { cropAPI, authAPI } from "../../services/service";

export default function AddListing() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    pricePerUnit: "",
    unit: "kg",
    imageUrls: [],
    imageFiles: [], // ✅ store selected files
  });

  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = "dtqyn4pse"; // your cloud name
  const UPLOAD_PRESET = "dev_upload"; // your unsigned preset

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, imageFiles: files }));
      setPreviews(Array.from(files).map((file) => URL.createObjectURL(file)));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index) => {
    const newFiles = Array.from(form.imageFiles);
    newFiles.splice(index, 1);
    setForm((prev) => ({ ...prev, imageFiles: newFiles }));

    const newPreviews = Array.from(previews);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = authAPI.getCurrentUser();
    if (!user || user.role !== "FARMER") {
      toast.error("Only farmers can add crops!");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload images to Cloudinary
      const uploadedUrls = await Promise.all(
        Array.from(form.imageFiles).map((file) => uploadToCloudinary(file))
      );

      // 2️⃣ Update form with uploaded URLs
      setForm((prev) => ({ ...prev, imageUrls: uploadedUrls }));

      // 3️⃣ Prepare payload for backend
      const cropData = {
        name: form.name,
        description: form.description,
        quantity: form.quantity,
        pricePerUnit: form.pricePerUnit,
        unit: form.unit,
        imageUrls: uploadedUrls, // ✅ matches backend field
        farmerId: user.id,
      };

      // 4️⃣ Call backend API
      await cropAPI.addCrop(cropData);

      toast.success("Crop listed successfully!");

      // 5️⃣ Reset form
      setForm({
        name: "",
        description: "",
        quantity: "",
        pricePerUnit: "",
        unit: "kg",
        imageUrls: [],
        imageFiles: [],
      });
      setPreviews([]);
    } catch (err) {
      console.error("Add crop error:", err);
      toast.error("Failed to add crop! Check your role and token.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />
      <main className="flex-1 p-6 md:p-10">
        <Toaster position="top-right" />
        <h1 className="text-3xl font-bold mb-8">Add New Crop Listing</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 max-w-3xl mx-auto bg-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-lg"
        >
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Crop Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wheat"
              className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Brief details about the crop..."
              className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Price per Unit (₹)
              </label>
              <input
                type="number"
                name="pricePerUnit"
                value={form.pricePerUnit}
                onChange={handleChange}
                placeholder="e.g. 2180"
                className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-green-500 transition"
                required
              >
                <option value="kg">kg</option>
                <option value="quintal">quintal</option>
                <option value="ton">ton</option>
                <option value="packet">packet</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              multiple
              accept="image/*"
              className="w-full text-sm text-zinc-400 file:bg-green-600 file:text-white file:px-4 file:py-2 file:rounded-xl file:border-none file:cursor-pointer"
            />
            {previews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-800 group"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-600 rounded-full p-1 hover:bg-red-700 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 px-6 py-4 rounded-2xl font-semibold shadow-md shadow-green-800/40 transition text-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <PlusCircle className="h-6 w-6" />{" "}
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </main>
    </div>
  );
}
