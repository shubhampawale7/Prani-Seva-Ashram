import { FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactSection({
  form,
  handleChange,
  handleSubmit,
  loading,
  submitted,
}) {
  return (
    <section className="relative py-24 px-6 bg-[url('/bg-texture.png')] bg-fixed bg-cover bg-center text-gray-800 overflow-hidden">
      {/* 🐾 Animated Paw Prints */}
      <motion.img
        src="/paw1.svg"
        alt="Floating Paw"
        className="absolute top-10 left-10 w-10 opacity-20 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.img
        src="/paw2.svg"
        alt="Floating Paw"
        className="absolute bottom-20 right-16 w-12 opacity-15 rotate-12 pointer-events-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.img
        src="/paw3.svg"
        alt="Floating Paw"
        className="absolute top-1/3 right-1/4 w-10 opacity-10 -rotate-6 hidden md:block pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <div className="max-w-3xl mx-auto z-10 relative">
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl px-10 py-12 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            aria-label="Contact form"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-700 flex justify-center items-center gap-2">
                <FaPaw className="text-2xl" aria-hidden="true" />
                Contact Us
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                We'd love to hear from you — get in touch below!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="category"
                >
                  Reason for Contact
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Volunteering</option>
                  <option>Donations</option>
                  <option>Adoption Help</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition shadow-md"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <div className="text-center p-10 bg-white/80 rounded-3xl shadow-2xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-green-700">Thank you!</h2>
            <p className="text-gray-700 mt-3">
              We’ve received your message and will be in touch shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
