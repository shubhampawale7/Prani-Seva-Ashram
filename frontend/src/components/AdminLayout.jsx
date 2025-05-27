import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaInbox,
  FaHandsHelping,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaChartLine, // Dashboard
  FaClipboardList, // Inquiries
  FaDonate, // Donations
  FaUsers, // Volunteer Inquiries
  FaTimes, // Close icon for mobile sidebar
  FaHome, // Home icon for brand/dashboard link
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import axios from "axios";

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Renamed for clarity
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: "/admin", icon: <FaChartLine />, label: "Dashboard" },
    { to: "/admin/inquiries", icon: <FaClipboardList />, label: "Inquiries" },
    { to: "/admin/donations", icon: <FaDonate />, label: "Donations" },
    {
      to: "/admin/volunteer-inquiries",
      icon: <FaUsers />,
      label: "Volunteer Inquiries",
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setProfileOpen(false); // Close profile dropdown
    }
  };

  // Variants for mobile sidebar (now a side menu from right)
  const mobileMenuVariants = {
    closed: { x: "100%", transition: { duration: 0.3 } },
    open: { x: "0%", transition: { duration: 0.3 } },
  };

  // Variants for overlay
  const overlayVariants = {
    closed: {
      opacity: 0,
      display: "none",
      transition: { duration: 0.3, delay: 0.1 },
    },
    open: { opacity: 1, display: "block", transition: { duration: 0.3 } },
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Prani Seva Ashram</title>
        <meta
          name="description"
          content="Admin panel for managing inquiries, donations, and volunteer information at Prani Seva Ashram."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Main container: flex-col for top navbar layout */}
      <div className="flex flex-col h-screen w-screen bg-gray-100 font-sans antialiased overflow-hidden">
        {/* Top Fixed Navbar */}
        <header className="bg-gray-800 text-white shadow-lg py-4 px-6 flex justify-between items-center sticky top-0 z-40 border-b border-amber-500">
          {/* Brand/Dashboard Link */}
          <NavLink
            to="/admin"
            className="flex items-center gap-3 text-2xl font-extrabold text-amber-400 tracking-wide"
          >
            <FaHome className="text-3xl" />
            <span className="hidden sm:inline">Prani Seva Admin</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main admin navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-lg font-medium 
                  ${
                    isActive
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle & Profile Dropdown */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <FaBars size={24} />
            </button>

            {/* Profile Dropdown (remains consistent) */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full text-gray-300 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-controls="profile-menu"
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden sm:inline font-medium">Admin User</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    id="profile-menu"
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    role="menu"
                    aria-label="Profile menu"
                  >
                    <div
                      className="p-3 border-b border-gray-200 text-sm text-gray-700 font-medium"
                      role="none"
                    >
                      Signed in as <br />
                      <strong className="text-gray-900">Administrator</strong>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                      role="menuitem"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar (off-canvas from right) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.aside
              className="fixed inset-y-0 right-0 w-64 bg-gray-800 text-gray-200 p-6 z-50 shadow-xl flex flex-col"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-between items-center pb-6 border-b border-gray-700 mb-6">
                <h2 className="text-2xl font-extrabold text-amber-400">Menu</h2>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.to}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(251, 191, 36, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 
                          ${
                            isActive
                              ? "bg-amber-600 text-white shadow-md"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`
                        }
                        onClick={() => setMobileMenuOpen(false)} // Close menu on click
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-gray-700 pt-6 mt-auto">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-red-400 font-medium text-lg hover:bg-gray-700 hover:text-red-300 transition-all duration-200"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Overlay for side menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
            />
          )}
        </AnimatePresence>

        {/* Main Content Area (below the top navbar) */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          {" "}
          {/* Removed fixed height, added overflow-y-auto */}
          {/* Outlet for Nested Routes - Main Content */}
          <section className="p-4 sm:p-6 lg:p-8">
            {" "}
            {/* Padding for content */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
