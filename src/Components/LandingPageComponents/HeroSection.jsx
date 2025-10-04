import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-0">
      
      {/* Attention Button */}
      <a
        href="#ai-support"
        className="mb-6 flex items-center gap-4 px-6 py-2 rounded-full border border-gray-700 bg-gray-900 hover:bg-gray-800 transition shadow-md"
      >
        <span className="text-sm">Introducing AI Supported Crop Disease Prediction</span>
        <div className="flex gap-1">
          <ArrowRight size={18} />
        </div>
      </a>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Empowering Farmers with <span className="text-green-400">AgriOne</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-300 text-lg max-w-2xl mb-8">
        An all-in-one digital platform for farmers, buyers, and agents — connecting agriculture with technology for fair prices, efficient logistics, and smarter decisions.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="#marketplace"
          className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg flex items-center gap-2 transition"
        >
          Get Started <ArrowRight size={20} />
        </a>
        <a
          href="#features"
          className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-green-400 hover:text-green-400 transition"
        >
          Learn More
        </a>
      </div>

    </section>
  );
}
