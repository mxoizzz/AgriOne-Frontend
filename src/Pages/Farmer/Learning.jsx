// src/pages/Farmer/Learning.jsx
import React, { useState } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { BookOpen, PlayCircle } from "lucide-react";

export const sampleLessons = [
  {
    id: 1,
    title: "Introduction to Modern Farming",
    description: "Learn the basics of sustainable farming and modern techniques.",
    type: "video",
    progress: 40,
  },
  {
    id: 2,
    title: "Soil Health & Fertilizers",
    description: "Understand soil types, nutrients, and fertilizer use.",
    type: "article",
    progress: 70,
  },
  {
    id: 3,
    title: "Crop Disease Management",
    description: "Identify common crop diseases and preventive measures.",
    type: "video",
    progress: 20,
  },
  {
    id: 4,
    title: "Market Trends & Pricing",
    description: "Learn how to track market prices and get fair value for crops.",
    type: "article",
    progress: 0,
  },
  {
    id: 5,
    title: "Organic Farming Techniques",
    description: "Discover eco-friendly methods for cultivating crops organically.",
    type: "video",
    progress: 55,
  },
  {
    id: 6,
    title: "Irrigation & Water Management",
    description: "Optimize irrigation practices for better yield and water conservation.",
    type: "article",
    progress: 80,
  },
  {
    id: 7,
    title: "Pest Control Strategies",
    description: "Learn safe and effective pest control methods.",
    type: "video",
    progress: 10,
  },
  {
    id: 8,
    title: "Harvesting & Storage",
    description: "Techniques for proper harvesting and storage to reduce losses.",
    type: "article",
    progress: 30,
  },
  {
    id: 9,
    title: "Farm Equipment Basics",
    description: "Get familiar with common farm equipment and their usage.",
    type: "video",
    progress: 25,
  },
  {
    id: 10,
    title: "AgriTech Tools",
    description: "Learn about technology solutions to improve farm productivity.",
    type: "article",
    progress: 5,
  },
  {
    id: 11,
    title: "Composting & Waste Management",
    description: "Turn farm waste into valuable compost and maintain soil health.",
    type: "video",
    progress: 60,
  },
  {
    id: 12,
    title: "Weather Awareness & Forecasting",
    description: "Understand weather patterns and use forecasts to plan farming activities.",
    type: "article",
    progress: 45,
  },
];


export default function Learning() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = sampleLessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <FarmerSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Learning Center</h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full md:w-1/2 p-3 rounded-xl bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-zinc-900 p-5 rounded-2xl shadow hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                {lesson.type === "video" ? (
                  <PlayCircle className="w-6 h-6 text-blue-400" />
                ) : (
                  <BookOpen className="w-6 h-6 text-green-400" />
                )}
                <h2 className="font-semibold text-lg">{lesson.title}</h2>
              </div>
              <p className="text-zinc-300 text-sm mb-4">{lesson.description}</p>

              {/* Progress bar */}
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs mt-1 text-zinc-400">
                {lesson.progress}% completed
              </div>
            </div>
          ))}
          {filteredLessons.length === 0 && (
            <div className="col-span-full text-center text-zinc-400 mt-10">
              No lessons found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
