import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "Features", "Marketplace", "Crop Protection", "Contact"];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16 justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-white font-bold text-2xl">AgriOne</Link>
        </div>

        {/* Center: Links */}
        <ul className="hidden md:flex flex-grow justify-center gap-8 items-center text-gray-300">
          {links.map((link, idx) => (
            <li key={idx} className="whitespace-nowrap">
              <Link
                to={`#${link.toLowerCase().replace(" ", "-")}`}
                className="hover:text-green-400 transition px-2"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Login & Mobile */}
        <div className="flex items-center flex-shrink-0 gap-2">
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition whitespace-nowrap"
          >
            Login
          </Link>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-black px-6 py-4 flex flex-col gap-4 text-gray-300">
          {links.map((link, idx) => (
            <li key={idx} className="whitespace-nowrap">
              <Link
                to={`#${link.toLowerCase().replace(" ", "-")}`}
                className="hover:text-green-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
