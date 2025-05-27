import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  FaHeart, // Icon for the main button
  FaUser, // For name field
  FaEnvelope, // For email field
  FaPhone, // For phone field
  FaCalendarAlt, // For age field
  FaClipboardList, // For role select
  FaClock, // For availability field
  FaCommentDots, // For message textarea
  FaTimes, // Close icon for modal
  FaHandsHelping, // Icon for modal header
} from "react-icons/fa";

const VolunteerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    role: "",
    availability: "",
    message: "",
  });

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Thanks for volunteering! We'll be in touch soon.");
        setForm({
          name: "",
          email: "",
          phone: "",
          age: "",
          role: "",
          availability: "",
          message: "",
        });
        setIsOpen(false);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please check your connection.");
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const triggerButton = document.getElementById(
        "volunteer-modal-trigger-button"
      );
      // Close if click is outside modal AND not on the trigger button
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        triggerButton &&
        !triggerButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      // Add a small delay to avoid closing immediately if the click
      // that opened the modal also registers outside it (rare, but good practice)
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // 100ms delay
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Volunteer Trigger Button (Position and Background as per original request) */}
      <motion.button
        id="volunteer-modal-trigger-button"
        onClick={() => setIsOpen(true)}
        className="fixed top-32 right-6 z-[1000] bg-blue-900 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out font-bold text-lg
                   hover:bg-blue-800 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-100" // Original background and hover/focus styles
        initial={{ opacity: 0, x: 50 }} // Animation to slide in from right
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHeart className="text-xl" />
        <span>Volunteer</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          // Modal Container (No black background overlay)
          <motion.div
            // No opacity animation on this outer div if you don't want an overlay effect
            className="fixed inset-0 flex justify-end z-[1000]" // No background color here
          >
            {/* Modal Content Panel (Slides from right, original positioning) */}
            <motion.div
              initial={{ x: "100%" }} // Slide in from right
              animate={{ x: 0 }}
              exit={{ x: "100%" }} // Slide out to right
              transition={{ type: "spring", stiffness: 300, damping: 30 }} // Original spring physics
              className="relative w-full sm:w-[450px] bg-white  h-full shadow-2xl border-l border-amber-100 flex flex-col "
              ref={modalRef}
            >
              {/* Modal Header */}
              <div className="mt-1 flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-amber-700 to-amber-500 text-white shadow-md rounded-xl">
                <h2 className="text-2xl font-bold flex items-center">
                  <FaHandsHelping className="mr-3 text-white" /> Become a
                  Volunteer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 text-3xl transition-colors"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body (Form) */}
              <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                <p className="text-gray-600 mb-6 text-md leading-relaxed">
                  Join our mission to help animals in need. Fill out the form
                  below and we'll connect with you!
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Fields with Icons and enhanced styling */}
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      icon: FaUser,
                      placeholder: "John Doe",
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      type: "email",
                      icon: FaEnvelope,
                      placeholder: "john.doe@example.com",
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      type: "tel",
                      icon: FaPhone,
                      placeholder: "+91 98765 43210",
                    },
                    {
                      name: "age",
                      label: "Age",
                      type: "number",
                      icon: FaCalendarAlt,
                      placeholder: "18 (minimum)",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <field.icon className="text-amber-600" /> {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 text-gray-800 placeholder-gray-400 appearance-none" // Added appearance-none for number input
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                      <FaClipboardList className="text-amber-600" /> Preferred
                      Role
                    </label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 text-gray-800 bg-white"
                    >
                      <option value="">Select a role</option>
                      <option value="Animal Care">Animal Care</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Awareness Campaigns">
                        Awareness Campaigns
                      </option>
                      <option value="Events">Events</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                      <FaClock className="text-amber-600" /> Availability
                      (Days/Times)
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="e.g., Weekends, Mon-Wed evenings"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                      <FaCommentDots className="text-amber-600" /> Why do you
                      want to volunteer?
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 text-gray-800 placeholder-gray-400 resize-y"
                      placeholder="Tell us about your motivation and expectations..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-6 py-3 rounded-lg transition duration-300 text-white font-bold text-lg shadow-lg transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-75 ${
                      loading
                        ? "bg-amber-400 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    {loading ? (
                      <span className="flex justify-center items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VolunteerModal;
