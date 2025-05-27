import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaSignInAlt } from "react-icons/fa"; // Using FaSignInAlt for the button

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login | Prani Seva Ashram";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    try {
      const res = await axios.post(`${baseURL}/api/auth/login`, form, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Login successful!");
      navigate("/admin/");
    } catch (err) {
      console.error("Login error response:", err.response?.data);
      toast.error(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md p-8 sm:p-10 lg:p-12 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Decorative background circles/blobs */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative z-20">
          <h2 className="text-4xl font-extrabold text-center text-yellow-700 mb-3">
            Admin Portal
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Securely access your Prani Seva Ashram dashboard.
          </p>

          <motion.form
            onSubmit={handleLogin}
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="relative" variants={itemVariants}>
              <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-800 text-lg transition duration-200"
                aria-label="Username"
              />
            </motion.div>
            <motion.div className="relative" variants={itemVariants}>
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-800 text-lg transition duration-200"
                aria-label="Password"
              />
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, backgroundColor: "#D97706" }} // dark orange on hover
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-yellow-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              variants={itemVariants}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <FaSignInAlt className="mr-3" /> Login
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
