import React from "react";

const steps = [
  "Farmer lists crop",
  "Buyer places order",
  "Payment & Invoice",
  "Delivery or storage booking",
];

export default function HowItWorksSection() {
  return (
    <section className="bg-black text-white py-20 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-gray-900 p-6 rounded-2xl flex-1 hover:bg-gray-800 transition">
            <span className="text-green-400 font-bold text-xl">{idx + 1}</span>
            <h3 className="font-semibold text-xl mt-2">{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
