/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heartAnimation from "../assets/heart.json";
import dogHero from "../assets/dog-hero.png";
import dogAnimation from "../assets/lotties/dog.json";

const Donate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.amount || form.amount <= 0)
      tempErrors.amount = "Please enter a valid amount";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await loadRazorpayScript();
      if (!window.Razorpay) {
        toast.error("Failed to load Razorpay.");
        return;
      }

      const { data: order } = await axios.post("/api/donate/razorpay-order", {
        amount: parseFloat(form.amount),
      });

      if (!order || !order.id) {
        toast.error("Failed to create Razorpay order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Prani Seva Ashram",
        description: "Donation",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post("/api/donate", {
              name: form.name,
              email: form.email,
              amount: parseFloat(form.amount),
              message: form.message,
              paymentId: response.razorpay_payment_id,
            });

            setForm({ name: "", email: "", amount: "", message: "" });

            navigate(
              `/donation-success?name=${form.name}&amount=${form.amount}`
            );
          } catch (err) {
            toast.error("Donation could not be processed.");
            console.error("Error during donation:", err);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: "#16a34a",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error("Payment failed or cancelled.");
      console.error("Error during Razorpay payment initialization:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setShowConfirm(true);
    }
  };

  return (
    <section className="bg-[#fdfaf6] px-4 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-green-100 p-6 md:p-4 md:flex gap-10 items-start">
        {/* Left side - Content */}
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Lottie
              animationData={heartAnimation}
              loop={true}
              className="w-20 h-20 mx-auto md:mx-0 mb-4"
            />

            <Lottie
              animationData={dogAnimation}
              loop={true}
              className="w-full  max-w-xl mx-auto md:mx-0 absolute   opacity-20"
            />
          </div>
          <h2 className="text-4xl font-bold text-green-700 flex items-center gap-3 mt-4">
            <FaHeart className="text-red-500" />
            Make a Paw-sitive Impact
          </h2>
          <p className="text-gray-600 mt-3 text-lg leading-relaxed">
            Every donation brings hope, healing, and happiness to a rescued dog.
            🐾❤️
          </p>
          <p className="text-gray-700 mt-4">
            At <strong>Prani Seva Ashram</strong>, we care for abandoned and
            injured dogs, providing them food, shelter, medical aid, and most
            importantly, love.
          </p>
          <p className="mt-3 text-gray-700">
            Whether it's a small or large amount, your contribution makes a real
            difference. Thank you for standing by our furry friends. 🐶💚
          </p>

          {/* <img
            src={dogHero}
            alt="Dog looking hopeful"
            className="w-auto h-40 rounded-xl mt-6 shadow-md"
          /> */}
        </motion.div>

        {/* Right side - Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-5  space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Donation Amount (INR)"
              className="w-full px-5 py-3 pl-10 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
            />
            <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Leave a message of hope (optional)"
              className="w-full px-4 py-2  rounded-lg border  focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition duration-300 shadow-lg"
            >
              Donate Now
            </button>
          </div>
        </motion.form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
              Confirm Your Kindness
            </h2>
            <p className="text-gray-600 text-center mb-4">
              You’re about to donate <strong>₹{form.amount}</strong>. This will
              go directly towards food, shelter, and medical care for dogs in
              need. 💚
            </p>
            <div className="h-2 bg-green-100 rounded-full overflow-hidden mb-6">
              <div className="w-full h-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handlePayment();
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm & Donate
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default Donate;
