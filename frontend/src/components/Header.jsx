import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Hotel Booking</h1>
      <nav className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link to="/hotels" className="hover:underline">Hotels</Link>
            <Link to="/checkin" className="hover:underline">Check-In</Link>
            <div className="relative" ref={menuRef}>
              <div
                className="flex items-center gap-2 bg-green-500 cursor-pointer rounded-full px-3 py-1 text-white font-semibold"
                onClick={toggleMenu}
              >
                {/* <div className="w-8 h-8 flex justify-center items-center bg-white text-green-500 rounded-full text-lg font-bold"> */}
                  {user.name.charAt(0).toUpperCase()}
                {/* </div> */}
                {/* <FiChevronDown className="text-lg" /> */}
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                    <FiUser /> Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
