import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";

export default function CropGuidance() {
  const [guides] = useState([
    {
      id: 1,
      crop: "Wheat",
      season: "Rabi (Winter)",
      soil: "Loamy or clay loam with good drainage",
      tips: [
        "Sow between November and December for best yield.",
        "Maintain soil moisture during germination.",
        "Apply balanced fertilizer (N:P:K = 120:60:40 kg/ha).",
      ],
      disease: "Rust — Use fungicide and resistant varieties.",
    },
    {
      id: 2,
      crop: "Rice",
      season: "Kharif (Monsoon)",
      soil: "Clayey soil with water retention capacity",
      tips: [
        "Ensure standing water during vegetative phase.",
        "Use high-yield varieties like IR64 or MTU1010.",
        "Apply urea in 3 split doses for better nitrogen use.",
      ],
      disease: "Blast — Use tricyclazole at early infection stage.",
    },
    {
      id: 3,
      crop: "Cotton",
      season: "Kharif (Summer)",
      soil: "Black soil or alluvial with good drainage",
      tips: [
        "Avoid waterlogging — sensitive to excess moisture.",
        "Regularly monitor for whitefly and bollworm.",
        "Use drip irrigation for better yield.",
      ],
      disease: "Wilt — Use disease-free seeds and crop rotation.",
    },
    {
      id: 4,
      crop: "Tomato",
      season: "All seasons (best in Rabi)",
      soil: "Well-drained sandy loam, pH 6–7",
      tips: [
        "Use hybrid varieties for higher yield.",
        "Stake plants to prevent fruit rot.",
        "Maintain spacing of 45x60 cm for air circulation.",
      ],
      disease: "Leaf Curl — Control whitefly and remove infected plants.",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Crop Guidance</h1>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((g) => (
            <div
              key={g.id}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-md hover:shadow-green-900/20 hover:border-green-700 transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{g.crop}</h2>

              <p className="text-sm text-zinc-400 mb-1">
                <strong className="text-zinc-300">Season:</strong> {g.season}
              </p>
              <p className="text-sm text-zinc-400 mb-3">
                <strong className="text-zinc-300">Soil:</strong> {g.soil}
              </p>

              <div className="mb-3">
                <h3 className="text-green-400 font-semibold mb-1">
                  Key Tips
                </h3>
                <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                  {g.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-red-400 mt-2">
                <strong>Disease Alert:</strong> {g.disease}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
