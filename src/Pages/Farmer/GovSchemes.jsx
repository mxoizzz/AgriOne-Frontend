// src/pages/Farmer/GovSchemes.jsx
import React, { useState, useEffect } from "react";
import FarmerSidebar from "../../Components/FarmerSidebar";
import { ChevronRight, ChevronDown, Copy } from "lucide-react";

export default function GovSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSchemes([
      {
        id: 1,
        name: "PM-Kisan (Pradhan Mantri Kisan Samman Nidhi)",
        benefit:
          "Direct income support: ₹6,000 per year paid in 3 instalments to eligible land-owning farmer families.",
        documents:
          "Aadhaar, land ownership proof (Patta/7-12/Jamabandi/Khatauni), active bank account, mobile number.",
        apply:
          "Online: pmkisan.gov.in or visit CSC/District Agriculture Office",
      },
      {
        id: 2,
        name: "Kisan Credit Card (KCC)",
        benefit:
          "Short-term crop & allied activity credit at preferential rates; flexible withdrawals and repayment within season.",
        documents:
          "Aadhaar, ID proof (Voter/PAN), land records or lease agreement, bank account details, passport-size photo.",
        apply: "Apply at your bank branch or online if available.",
      },
      {
        id: 3,
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        benefit:
          "Crop insurance against yield losses from natural calamities, pests and diseases; reduces income volatility.",
        documents:
          "Aadhaar, bank account details, land records, crop sowing details.",
        apply:
          "Enroll via bank for loanee farmers or PMFBY portal/CSC during enrollment window.",
      },
      {
        id: 4,
        name: "Soil Health Card (SHC)",
        benefit:
          "Free soil testing for fields and nutrient recommendations to optimise fertilizer use and increase yield.",
        documents: "Field sample collection, Aadhaar, land details.",
        apply:
          "Contact Block/District Agriculture Office or wait for local SHC drives.",
      },
      {
        id: 5,
        name: "e-NAM (National Agriculture Market)",
        benefit:
          "Online mandi platform for market access and transparent price discovery across participating APMC mandis.",
        documents: "Aadhaar, bank account, mandi seller registration.",
        apply: "Register via enam.gov.in or through local mandi office.",
      },
      {
        id: 6,
        name: "PMFME (Pradhan Mantri Formalisation of Micro Food Processing Enterprises)",
        benefit:
          "Credit-linked subsidies, training and support to micro food processors, FPOs and SHGs to add value to produce.",
        documents:
          "Aadhaar, bank details, project/report for unit, group registration (if applicable).",
        apply: "Apply through pmfme.mofpi.gov.in or state implementing agency.",
      },
      {
        id: 7,
        name: "Pradhan Mantri Kisan Maandhan Yojana (PMKMY)",
        benefit:
          "Contributory pension — eligible farmers receive ₹3,000/month after turning 60 (subject to contributions).",
        documents:
          "Aadhaar, bank account, age proof, land ownership proof, mobile number.",
        apply:
          "Enroll at CSC centres or designated registration points; check maandhan.in.",
      },
      {
        id: 8,
        name: "Paramparagat Krishi Vikas Yojana (PKVY) — Organic Farming",
        benefit:
          "Support for cluster-based organic farming: training, inputs and market linkages.",
        documents: "Aadhaar, land records, FPO/SHG/group registration.",
        apply:
          "Apply via state agriculture department or PGS-India/NCOF portals.",
      },
      {
        id: 9,
        name: "Rashtriya Krishi Vikas Yojana (RKVY)",
        benefit:
          "State-driven funding window for agri infrastructure, value chains, and innovation projects.",
        documents:
          "Project proposal (DPR), Aadhaar, bank details; specifics by state.",
        apply: "Apply through State Agriculture Department or district office.",
      },
      {
        id: 10,
        name: "National Food Security Mission (NFSM)",
        benefit:
          "Schemes to increase productivity of targeted crops (rice, wheat, pulses, coarse cereals).",
        documents: "Aadhaar, land proof.",
        apply:
          "Contact District Agriculture Office for farmer-level programmes.",
      },
      {
        id: 11,
        name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        benefit:
          "Irrigation schemes for water use efficiency, micro-irrigation and on-farm water management.",
        documents: "Land records, Aadhaar, proof of irrigation.",
        apply:
          "Apply via state irrigation/agriculture departments or designated agencies.",
      },
      {
        id: 12,
        name: "National Mission for Sustainable Agriculture (NMSA)",
        benefit:
          "Support for climate-resilient practices — conservation agriculture, soil & water management, diversified cropping.",
        documents: "Aadhaar, land records; project proposals if applicable.",
        apply: "Contact State Agriculture Office.",
      },
      {
        id: 13,
        name: "Sub-Mission on Agricultural Mechanization (SMAM)",
        benefit:
          "Subsidies and support for farm machinery to improve efficiency.",
        documents:
          "Aadhaar, land proof, machine quotation/invoice and dealer details.",
        apply: "Apply via state implementing agencies or agrimachinery.nic.in.",
      },
      {
        id: 14,
        name: "National Beekeeping & Honey Mission (NBHM)",
        benefit:
          "Support for beekeeping units, training, and market linkages to increase pollination & honey production.",
        documents:
          "Aadhaar, bank account details, land/lease proof if required.",
        apply: "Apply via NABARD-supported schemes or state agri dept.",
      },
      {
        id: 15,
        name: "Agri Infrastructure Fund (AIF) — Atmanirbhar Bharat",
        benefit:
          "Interest subvention and loans for projects like cold storage, warehouses, aggregation centers.",
        documents:
          "Aadhaar, DPR/project plan, PAN, bank account, land/lease proof.",
        apply: "Apply via agriinfra.dac.gov.in or lending banks/NABARD.",
      },
      {
        id: 16,
        name: "Dairy Entrepreneurship Development Scheme (DEDS)",
        benefit:
          "Credit-linked subsidy for establishing/expanding dairy units and allied activities.",
        documents: "Aadhaar, land proof, project proposal, bank details.",
        apply: "Apply via NABARD or participating banks.",
      },
      {
        id: 17,
        name: "PM Matsya Sampada Yojana (PMMSY) — Fisheries",
        benefit:
          "Comprehensive development of fisheries & aquaculture with credit & capital support.",
        documents:
          "Aadhaar, bank account, project plan, licenses/permissions if applicable.",
        apply: "Apply at pmmsy.dof.gov.in or state fisheries departments.",
      },
      {
        id: 18,
        name: "Formation & Promotion of Farmer Producer Organisations (FPOs)",
        benefit:
          "Grants, equity support, and credit facilitation for farmer collectives.",
        documents:
          "Group registration documents, member list, PAN, bank account, Aadhaar of key members.",
        apply: "Apply via SFAC or state implementing agencies (sfacindia.com).",
      },
    ]);
  }, []);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const filteredSchemes = schemes.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const copyChecklist = () => {
    const checklist = `Universal Documents Checklist:
• Aadhaar Card (linked mobile number)
• Active Bank Account passbook / Cancelled cheque
• Land ownership documents (7/12, Jamabandi, Khatauni, Patta, Sale deed) or lease agreement
• Photo ID / Age proof (Voter ID, PAN, or school certificate)
• Passport-size photograph(s)
• FPO/SHG registration documents (if applying as a group)
• Previous beneficiary IDs (PM-Kisan ID, KCC number) if any`;
    navigator.clipboard.writeText(checklist);
    alert("Checklist copied to clipboard!");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <FarmerSidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">
          Government Schemes for Farmers
        </h1>

        {/* Checklist */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-zinc-300 font-semibold">
              Universal Documents Checklist
            </p>
            <button
              onClick={copyChecklist}
              className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          <ul className="text-zinc-400 list-disc list-inside text-sm">
            <li>Aadhaar Card (linked mobile number)</li>
            <li>Active Bank Account passbook / Cancelled cheque</li>
            <li>
              Land ownership documents (7/12, Jamabandi, Khatauni, Patta, Sale
              deed) or lease agreement
            </li>
            <li>Photo ID / Age proof (Voter ID, PAN, or school certificate)</li>
            <li>Passport-size photograph(s)</li>
            <li>FPO/SHG registration documents (if applying as a group)</li>
            <li>Previous beneficiary IDs (PM-Kisan ID, KCC number) if any</li>
          </ul>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search schemes..."
          className="w-full md:w-1/2 mb-6 p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Schemes list */}
        <div className="space-y-4">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 shadow hover:bg-zinc-900 transition"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(scheme.id)}
                >
                  <h2 className="font-semibold text-lg">{scheme.name}</h2>
                  {expanded === scheme.id ? <ChevronDown /> : <ChevronRight />}
                </div>

                {expanded === scheme.id && (
                  <div className="mt-3 space-y-2 text-zinc-300 text-sm">
                    <p>
                      <strong>Benefit:</strong> {scheme.benefit}
                    </p>
                    <p>
                      <strong>Required Documents:</strong> {scheme.documents}
                    </p>
                    <p>
                      <strong>How to Apply:</strong> {scheme.apply}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-zinc-400">No schemes found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
