// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-6 lg:px-12 text-center">
      <p>&copy; {new Date().getFullYear()} AgriOne. All rights reserved.</p>
      <div className="mt-4 flex justify-center gap-4">
        <Link to="/privacy" className="hover:text-green-400 transition">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-green-400 transition">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
