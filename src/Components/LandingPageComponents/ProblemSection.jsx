import React from "react";
import { Shield, CreditCard, Store, Leaf } from "lucide-react";

const problems = [
  { icon: <Store size={32} />, title: "Low Crop Prices", desc: "Ensure fair prices for every harvest with transparent marketplace." },
  { icon: <CreditCard size={32} />, title: "Payment Issues", desc: "Secure, fast, and trackable payments for farmers and buyers." },
  { icon: <Leaf size={32} />, title: "Crop Diseases", desc: "Get alerts and guidance to protect your crops effectively." },
  { icon: <Shield size={32} />, title: "Logistics", desc: "Simplify delivery and storage for your produce." },
];

export default function ProblemsSection() {
  return (
    <section className="bg-black text-white py-20 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Challenges Farmers Face</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {problems.map((p, idx) => (
          <div key={idx} className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-gray-800 transition">
            {p.icon}
            <h3 className="font-semibold text-xl">{p.title}</h3>
            <p className="text-gray-400 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
