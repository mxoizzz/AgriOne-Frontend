import React from "react";
import { Store, Shield, CreditCard, Leaf } from "lucide-react";

const features = [
  { icon: <Store size={32} />, title: "Marketplace" },
  { icon: <CreditCard size={32} />, title: "Payments & Invoices" },
  { icon: <Leaf size={32} />, title: "Crop Protection Knowledge Base" },
  { icon: <Shield size={32} />, title: "Storage & Logistics" },
];

export default function FeaturesSection() {
  return (
    <section className="bg-black text-white py-20 text-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Features</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div key={idx} className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-gray-800 transition">
            {f.icon}
            <h3 className="font-semibold text-xl">{f.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
