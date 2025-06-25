/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for modal exit animation
import { Helmet } from "react-helmet-async";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPaw,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa"; // Keep FaPaw for consistency
import { X } from "lucide-react"; // Import X icon for modal close button

// Assuming ContactSection is a separate component and doesn't need to be imported here if not directly used.
// If it's a global component, ensure it is styled to match the new theme.

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

  // Ref for the modal to manage focus
  const modalRef = useRef(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem("contactDraft");
    if (savedDraft) {
      setForm(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactDraft", JSON.stringify(form));
  }, [form]);

  // Handle modal focus when opened
  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "unset"; // Re-enable background scroll
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmSendMessage = async () => {
    setLoading(true);
    try {
      // Assuming your backend expects data on '/api/contact'
      await axios.post("http://localhost:5000/api/contact", form); // Changed to absolute URL
      toast.success(
        "Thank you! Your message has been sent successfully. We'll be in touch soon!"
      );
      setForm({
        name: "",
        email: "",
        category: "General Inquiry",
        message: "",
      });
      localStorage.removeItem("contactDraft");
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form submission error:", err);
      toast.error(
        err.response?.data?.error ||
          "Oops! Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const cancelSendMessage = () => {
    setIsModalOpen(false);
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalContentVariants = {
    hidden: { y: -50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { y: 50, opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative min-h-screen px-4 py-20 bg-gradient-to-br from-amber-50 to-orange-100 font-sans overflow-hidden">
      {/* Subtle background paw prints for theme reinforcement */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="/paws-pattern.svg"
          alt="paw print pattern"
          className="absolute top-1/4 left-1/4 w-32 animate-pulse-slow"
          style={{ transform: "rotate(20deg)" }}
        />
        <img
          src="/paws-pattern.svg"
          alt="paw print pattern"
          className="absolute bottom-1/3 right-1/4 w-40 animate-pulse-slow delay-500"
          style={{ transform: "rotate(-40deg)" }}
        />
        <img
          src="/paws-pattern.svg"
          alt="paw print pattern"
          className="absolute top-1/2 left-10 w-24 animate-pulse-slow delay-1000"
          style={{ transform: "rotate(80deg)" }}
        />
      </div>

      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          Contact Us | Prani Seva Ashram - Animal Welfare & Adoption
        </title>
        <meta
          name="description"
          content="Get in touch with Prani Seva Ashram for inquiries, volunteering, donations, and adoption help. We are dedicated to animal welfare in Pune."
        />
        <meta
          name="keywords"
          content="contact, animal welfare, adoption, volunteering, donations, Prani Seva Ashram, Pune, animal rescue"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <meta name="robots" content="index, follow" />
        {/* Update CSP to allow your actual API endpoint and image sources */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' http://localhost:5000"
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Contact Prani Seva Ashram - Animal Welfare & Adoption"
        />
        <meta
          property="og:description"
          content="Reach out for volunteering, donations, adoption help, or general inquiries at Prani Seva Ashram."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.pranisevaashram.com/contact"
        />
        {/* Ensure this image exists and is relevant to your contact page */}
        <meta
          property="og:image"
          content="https://www.pranisevaashram.com/contact-og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Prani Seva Ashram - Animal Welfare & Adoption"
        />
        <meta
          name="twitter:description"
          content="Get in touch with Prani Seva Ashram for volunteering, donations, adoption help, or general inquiries."
        />
        <meta
          name="twitter:image"
          content="https://www.pranisevaashram.com/contact-twitter-image.jpg"
        />

        <link rel="canonical" href="https://www.pranisevaashram.com/contact" />
      </Helmet>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Information Section (Left) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-10 border border-amber-100 flex flex-col justify-center h-full"
          aria-label="Contact information"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-3xl font-extrabold text-amber-800 mb-6 leading-tight drop-shadow-md text-start lg:text-left"
          >
            Connect with Us
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 text-lg md:text-xl mb-8 text-center lg:text-left"
          >
            We'd love to hear from you! Whether you have questions, want to
            volunteer, or need assistance, our team is here to help.
          </motion.p>

          <div className="space-y-6 text-gray-800 text-lg">
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <FaMapMarkerAlt
                className="text-amber-600 text-2xl flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-amber-700">Our Location</h3>
                <a
                  href="https://www.google.com/maps/search/Prani+Seva+Ashram,+135-B,+B.A.+Chowk,+Pune+-+411001" // More specific Google Maps link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-amber-800 hover:underline transition text-base"
                >
                  Prani Seva Ashram, 135-B, B.A. Chowk, Pune - 411001
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <FaPhoneAlt
                className="text-amber-600 text-2xl flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-amber-700">Call Us</h3>
                <div className="flex flex-wrap gap-x-3 text-base">
                  {[
                    "+919225633029",
                    "+919011523456",
                    "+919011623456",
                    "+919822033670",
                  ].map((number, i) => (
                    <a
                      key={i}
                      href={`tel:${number}`}
                      className="text-black hover:text-amber-800 hover:underline transition"
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <FaEnvelope
                className="text-amber-600 text-2xl flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-amber-700">Email Us</h3>
                <div className="flex flex-wrap gap-x-5 text-base">
                  {[
                    "contact",
                    "bharat",
                    "kishore",
                    "sonia",
                    "karuna",
                    "bina",
                  ].map((name, i) => (
                    <a
                      key={i}
                      href={`mailto:${name}@pranisevaashram.com`}
                      className="text-black hover:text-amber-800 hover:underline transition"
                    >
                      {name}@pranisevaashram.com
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start gap-6 mt-10 text-3xl ml-5"
          >
            <a
              href="https://www.facebook.com/profile.php?id=61576780949517"
              aria-label="Facebook"
              className="hover:text-blue-700 text-blue-600 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/pranisevaashram/"
              aria-label="Instagram"
              className="hover:text-pink-700 text-pink-600 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@PraniSevaAshram"
              aria-label="Youtube"
              className="hover:text-red-700 text-red-600 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://wa.me/919225633029"
              aria-label="WhatsApp"
              className="hover:text-green-700 text-green-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Form Section (Right) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="flex flex-col justify-center h-full"
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-md border border-amber-100 shadow-2xl rounded-3xl p-8 md:p-10 space-y-7"
              aria-label="Contact form"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-800 flex justify-center items-center gap-3">
                  <FaPaw
                    className="text-3xl text-amber-600"
                    aria-hidden="true"
                  />
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mt-2 text-md">
                  We're eager to hear from you. Fill out the form below.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 outline-none"
                    aria-required="true"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 outline-none"
                    aria-required="true"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Reason for Contact
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 outline-none appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Donations">Donations</option>
                    <option value="Adoption Help">Adoption Help</option>
                    <option value="Report Animal in Need">
                      Report Animal in Need
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm resize-y focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 outline-none"
                    aria-required="true"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                  aria-live="polite"
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center p-10 bg-white/90 rounded-3xl shadow-2xl max-w-lg mx-auto border border-amber-100"
              role="alert"
              aria-live="polite"
            >
              <FaPaw className="text-5xl text-amber-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-amber-800">
                Message Sent!
              </h2>
              <p className="text-gray-700 mt-4 text-lg">
                Thank you for reaching out to Prani Seva Ashram. We've received
                your message and will get back to you shortly. Your support
                means the world to us and our furry friends!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition shadow-md"
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalOverlayVariants}
            onClick={cancelSendMessage} // Close modal on overlay click
          >
            <motion.div
              ref={modalRef} // Assign ref to the modal content
              tabIndex={-1} // Make it focusable
              className="bg-white rounded-2xl p-8 w-11/12 max-w-sm shadow-2xl text-center relative focus:outline-none border border-amber-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modalTitle"
              aria-describedby="modalDesc"
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              onKeyDown={(e) => {
                if (e.key === "Escape") cancelSendMessage();
              }}
            >
              <button
                onClick={cancelSendMessage}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full transition"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-amber-600 mb-4">
                <FaPaw size={32} className="mx-auto" aria-hidden="true" />
              </div>
              <h3
                className="text-2xl font-bold text-amber-800 mb-3"
                id="modalTitle"
              >
                Confirm Your Message
              </h3>
              <p className="text-gray-700 mb-6" id="modalDesc">
                Are you sure you want to send this message to Prani Seva Ashram?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={cancelSendMessage}
                  className="w-full sm:w-auto bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSendMessage}
                  className="w-full sm:w-auto bg-amber-600 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-700 transition duration-200 shadow-md"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
