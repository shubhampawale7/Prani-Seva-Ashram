/* eslint-disable no-unused-vars */
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaDog,
  FaEnvelope,
  FaHandHoldingHeart,
  FaImages,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo3.png"; // adjust path as needed

const Layout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="inline mr-1" /> },
    {
      to: "/about",
      label: "About",
      icon: <FaInfoCircle className="inline mr-1" />,
    },
    { to: "/adopt", label: "Adopt", icon: <FaDog className="inline mr-1" /> },
    {
      to: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="inline mr-1" />,
    },
    {
      to: "/donate",
      label: "Donate",
      icon: <FaHandHoldingHeart className="inline mr-1" />,
    },
    {
      to: "/gallery",
      label: "Gallery",
      icon: <FaImages className="inline mr-1" />,
    },
    {
      to: "/our-work",
      label: "Our Work",
      icon: <FaHandHoldingHeart className="inline mr-1" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className=" bg-[#F0F1EC] shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 ">
            <img src={logo} alt="Logo" className="h-25 w-25 object-contain" />
            <span className="text-xl font-bold text-amber-600 whitespace-nowrap">
              Prani Seva Ashram
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6 text-sm sm:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-all font-medium px-2 py-1 rounded ${
                  location.pathname === link.to
                    ? "text-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    : "text-gray-700 hover:text-amber-600 hover:shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-amber-600 text-xl ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile nav dropdown with animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200 px-4 py-2 text-center overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 font-medium rounded transition-all ${
                    location.pathname === link.to
                      ? "text-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                      : "text-gray-700 hover:text-amber-600 hover:shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M20.52 3.48a12.07 12.07 0 0 0-17.06 0 11.96 11.96 0 0 0-2.32 13.5L.32 23.68l6.83-1.8a12 12 0 0 0 17.37-10.3c.02-3.19-1.23-6.19-3.6-8.1ZM12 21a9.03 9.03 0 0 1-4.59-1.26l-.33-.2-4.05 1.07 1.08-3.94-.21-.33A9 9 0 1 1 21 12c0 4.97-4.03 9-9 9Zm5.04-6.56c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.91 1.08-.17.18-.34.2-.63.07a7.42 7.42 0 0 1-3.58-3.13c-.27-.46.27-.42.76-1.4.08-.17.04-.31-.02-.45-.06-.14-.64-1.53-.88-2.1-.23-.56-.46-.49-.64-.5h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-.97 2.44s1.08 2.84 1.24 3.04c.15.2 2.13 3.25 5.16 4.56 2.6 1.14 3.13.91 3.7.85.57-.05 1.82-.75 2.08-1.48.26-.73.26-1.35.18-1.48-.08-.13-.26-.2-.54-.34Z" />
        </svg>
      </a>
    </div>
  );
};

export default Layout;
