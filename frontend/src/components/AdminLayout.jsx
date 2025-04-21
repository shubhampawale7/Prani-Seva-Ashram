import React from "react";
import { Link, Outlet } from "react-router-dom"; // Outlet to render nested routes
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import dogAnimation from "../assets/lotties/dog-hello.json";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-amber-500 p-4 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-semibold text-white">
            Admin Panel 🐾
          </div>

          {/* Navbar Links */}
          <div className="flex space-x-6">
            <Link
              to="/admin/inquiries"
              className="text-white hover:text-yellow-100 transition"
            >
              Inquiries
            </Link>
            <Link
              to="/admin/donations"
              className="text-white hover:text-yellow-100 transition"
            >
              Donations
            </Link>
            <Link
              to="/admin/add-adoption"
              className="text-white hover:text-yellow-100 transition"
            >
              Adoption
            </Link>
            <Link
              to="/admin/adoption-inquiries"
              className="text-lg text-white hover:text-yellow-100 transition"
            >
              View Adoption Inquiries
            </Link>

            <Link
              to="/admin/logout"
              className="text-red-700 hover:text-red-900"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-1"></div>

        {/* The nested routes will render here */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
