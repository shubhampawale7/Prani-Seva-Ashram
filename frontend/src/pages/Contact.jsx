/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // or 'react-toastify' if you're using that
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import Lottie from "lottie-react";
import dogAnimation from "../assets/lotties/dog.json";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open confirmation modal
  };

  const confirmSendMessage = async () => {
    setLoading(true); // Set loading to true when form submission starts
    try {
      await axios.post("/api/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Close confirmation modal
    }
  };

  const cancelSendMessage = () => {
    setIsModalOpen(false); // Close confirmation modal without sending
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16 relative overflow-hidden">
      {/* Decorative background blur circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <Lottie
            animationData={dogAnimation}
            loop={true}
            className="w-full max-w-sm mx-auto md:mx-0"
          />
          <h2 className="text-3xl font-bold text-amber-600 mt-6">
            We'd love to hear from you!
          </h2>
          <p className="text-gray-600 mt-2">
            Whether you have a question, want to volunteer, or just want to say
            hello — drop us a message below.
          </p>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-rose-600 flex items-center gap-2">
            <FaPaw /> Contact Us
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending message..." : "Send Message"}{" "}
            {/* Button text chanrge */}
          </button>
        </motion.form>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#ffffff00] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center relative">
            <div className="absolute top-0 left-0 right-0 p-2 text-amber-600">
              <FaPaw size={24} className="mx-auto" />
            </div>
            <h4 className="text-lg font-bold text-rose-600 mb-4">
              Are you sure you want to send this message?
            </h4>
            <p className="text-gray-600 mb-6">
              This action will send your message to us.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelSendMessage}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendMessage}
                className="bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-3xl mx-auto mt-16 bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6 text-center"
      >
        <h3 className="text-2xl font-semibold text-amber-600">
          Contact Information
        </h3>
        <div className="text-gray-700 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-rose-600" />
            <span className="font-medium text-gray-800">Phone:</span>
            <a
              href="tel:+919876543210"
              className="text-rose-600 hover:underline"
            >
              +91 98765 43210
            </a>
          </p>

          <p>
            📧 <span className="font-medium text-gray-800">Email:</span>{" "}
            <a
              href="mailto:contact@praniseva.org"
              className="text-rose-600 hover:underline"
            >
              contact@praniseva.org
            </a>
          </p>
          <p>
            📍 <span className="font-medium text-gray-800">Address:</span> Prani
            Seva Ashram, Lane 5, Wagholi, Pune - 412207
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
