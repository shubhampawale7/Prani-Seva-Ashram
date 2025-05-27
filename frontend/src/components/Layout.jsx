/* eslint-disable no-unused-vars */
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaHandHoldingHeart,
  FaImages,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaWhatsappSquare,
} from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/praniseva-logo.png";

const Layout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <FaHome className="inline mr-1 text-xl text-amber-500" />,
    },
    {
      to: "/about",
      label: "About",
      icon: <FaInfoCircle className="inline mr-1 text-xl text-amber-500" />,
    },
    {
      to: "/our-work",
      label: "Our Work",
      icon: (
        <FaHandHoldingHeart className="inline mr-1  text-amber-500 text-xl" />
      ),
    },
    {
      to: "/donate",
      label: "Donate",
      icon: (
        <FaHandHoldingHeart className="inline mr-1  text-amber-500 text-xl" />
      ),
    },
    {
      to: "/compliance",
      label: "Compliance",
      icon: <FaInfoCircle className="inline mr-1 text-xl text-amber-500" />,
    },

    {
      to: "/gallery",
      label: "Gallery",
      icon: <FaImages className="inline mr-1 text-amber-500 text-xl" />,
    },
    {
      to: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="inline mr-1 text-xl  text-amber-500" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f9f9f6]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white backdrop-blur-md shadow-md">
        <nav className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center ">
            <img
              src={logo}
              alt="Logo"
              className="h-18 w-auto object-contain  "
            />
            <span className="text-xl font-black text-amber-600 whitespace-nowrap font-raleway">
              Prani Seva Ashram
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden  md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium px-3 py-2 rounded transition-all duration-200 ${
                  location.pathname === link.to
                    ? "text-amber-600 bg-amber-100 shadow-sm"
                    : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-amber-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200 px-4 py-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 font-medium rounded transition ${
                    location.pathname === link.to
                      ? "text-amber-600 bg-amber-100"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
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
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* WhatsApp Button */}

      <a
        href="https://wa.me/+919225633029"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition duration-300"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Layout;
