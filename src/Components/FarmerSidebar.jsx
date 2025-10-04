import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Cloud,
  Package,
  Warehouse,
  Lightbulb,
  Award,
  GraduationCap,
  User,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/farmer-dashboard" },
    { title: "Marketplace", icon: ShoppingCart, path: "/farmer-marketplace" },
    { title: "Weather", icon: Cloud, path: "/weather" },
    { title: "Farm Inputs", icon: Package, path: "/farm-inputs" },
    { title: "Storage", icon: Warehouse, path: "/storage" },
    { title: "Crop Guidance", icon: Lightbulb, path: "/crop-guidance" },
    { title: "Gov Schemes", icon: Award, path: "/gov-schemes" },
    { title: "Learning", icon: GraduationCap, path: "/learning" },
    { title: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex-col justify-between hidden md:flex overflow-y-auto no-scrollbar">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center font-extrabold text-lg">
            A
          </div>
          <span className="text-xl font-bold tracking-wide">AgriOne</span>
        </div>

        {/* Navigation */}
        <div className="px-3 space-y-1">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? "bg-green-600 text-white border-l-4 border-green-400"
                    : "hover:bg-zinc-800 text-gray-300 hover:text-white"
                }`}
              >
                <item.icon
                  size={18}
                  className={`${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Earnings Widget */}
      <div className="p-4 bg-zinc-900 rounded-lg m-4 shadow-inner">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-green-400" />
          <span className="text-sm font-medium">Today's Earnings</span>
        </div>
        <p className="text-2xl font-bold text-green-400">₹24,750</p>
        <p className="text-xs text-green-500 mt-1">+12% from yesterday</p>
      </div>
    </aside>
  );
};

export default Sidebar;
