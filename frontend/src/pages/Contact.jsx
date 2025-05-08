/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPaw,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem("contactDraft");
    if (savedDraft) {
      setForm(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactDraft", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmSendMessage = async () => {
    setLoading(true);
    try {
      await axios.post("/api/contact", form);
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        category: "General Inquiry",
        message: "",
      });
      localStorage.removeItem("contactDraft");
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const cancelSendMessage = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen px-4 py-20 bg-white overflow-hidden">
      <div className="max-w-xl mx-auto">
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/60 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-green-700 flex items-center gap-2">
              <FaPaw /> Contact Us
            </h3>

            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="floating-input peer"
              />
              <label className="floating-label">Your Name</label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                className="floating-input peer"
              />
              <label className="floating-label">Your Email</label>
            </div>

            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="floating-input peer bg-transparent"
              >
                <option>General Inquiry</option>
                <option>Volunteering</option>
                <option>Donations</option>
                <option>Adoption Help</option>
              </select>
              <label className="floating-label">Reason for Contact</label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="floating-input peer resize-none"
              ></textarea>
              <label className="floating-label">Your Message</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        ) : (
          <div className="text-center p-10 bg-white/80 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">Thank you!</h3>
            <p className="text-gray-700 mt-2">
              We’ve received your message and will be in touch soon.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl text-center relative">
            <div className="text-green-700 mb-3">
              <FaPaw size={28} className="mx-auto" />
            </div>
            <h4 className="text-lg font-bold text-green-700 mb-4">
              Confirm to Send?
            </h4>
            <p className="text-gray-600 mb-6">
              This will send your message to Prani Seva Ashram.
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
                className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20 bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h3 className="text-2xl font-semibold text-green-700 text-center">
          Contact Information
        </h3>

        <div className="text-gray-700 space-y-2 text-center">
          <p>
            🌐 <span className="font-medium">Website:</span>{" "}
            <a
              href="https://www.pranisevaashram.com"
              className="text-green-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.pranisevaashram.com
            </a>
          </p>

          <p>
            📧 <span className="font-medium">Email:</span>{" "}
            <span className="text-green-700 space-x-2">
              <a
                href="mailto:contact@pranisevaashram.com"
                className="hover:underline"
              >
                contact@pranisevaashram.com
              </a>{" "}
              •{" "}
              <a
                href="mailto:bharat@pranisevaashram.com"
                className="hover:underline"
              >
                bharat@pranisevaashram.com
              </a>{" "}
              •{" "}
              <a
                href="mailto:kishore@pranisevaashram.com"
                className="hover:underline"
              >
                kishore@pranisevaashram.com
              </a>{" "}
              •{" "}
              <a
                href="mailto:sonia@pranisevaashram.com"
                className="hover:underline"
              >
                sonia@pranisevaashram.com
              </a>{" "}
              •{" "}
              <a
                href="mailto:bina@pranisevaashram.com"
                className="hover:underline"
              >
                bina@pranisevaashram.com
              </a>{" "}
              •{" "}
              <a
                href="mailto:karuna@pranisevaashram.com"
                className="hover:underline"
              >
                karuna@pranisevaashram.com
              </a>
            </span>
          </p>

          <p>
            📞 <span className="font-medium">Phone:</span>{" "}
            <span className="text-green-700 space-x-2">
              <a href="tel:+919225633029" className="hover:underline">
                +91 92256 33029
              </a>{" "}
              •{" "}
              <a href="tel:+919011523456" className="hover:underline">
                +91 90115 23456
              </a>{" "}
              •{" "}
              <a href="tel:+919011623456" className="hover:underline">
                +91 90116 23456
              </a>{" "}
              •{" "}
              <a href="tel:+919822033670" className="hover:underline">
                +91 98220 33670
              </a>
            </span>
          </p>

          <p>
            📍 <span className="font-medium">Address:</span>{" "}
            <a
              href="https://www.google.com/maps/place/Prani+Seva+Ashram,+Lane+5,+Wagholi,+Pune+-+412207"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              Prani Seva Ashram, Lane 5, Wagholi, Pune - 412207
            </a>
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-4 text-xl text-green-700">
          <a href="#" className="hover:text-green-800">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-green-800">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-green-800">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-green-800">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
