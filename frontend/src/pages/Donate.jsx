/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaHeart, FaRupeeSign, FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const typingPhrases = ["Support.", "Love.", "Heal."];

const Donate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
    purpose: "Food Support",
  });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const phrase = typingPhrases[typingIndex];
        if (!deleting) {
          setTypingText(phrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          if (charIndex + 1 === phrase.length) setDeleting(true);
        } else {
          setTypingText(phrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          if (charIndex === 0) {
            setDeleting(false);
            setTypingIndex((typingIndex + 1) % typingPhrases.length);
          }
        }
      },
      deleting ? 60 : 100
    );
    return () => clearInterval(interval);
  }, [charIndex, deleting, typingIndex]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("donation-draft"));
    if (saved) setForm(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("donation-draft", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleValidation = () => {
    const tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email || !isValidEmail(form.email)) {
      tempErrors.email = "Valid email is required";
    }
    if (!form.amount || form.amount <= 0) {
      tempErrors.amount = "Enter a valid amount";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);
    try {
      await loadRazorpayScript();
      const { data: order } = await axios.post("/api/donate/razorpay-order", {
        amount: parseFloat(form.amount),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Prani Seva Ashram",
        description: "Donation",
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post("/api/donate", {
              ...form,
              paymentId: response.razorpay_payment_id,
            });
            localStorage.removeItem("donation-draft");

            const paymentData = {
              ...form,
              paymentId: response.razorpay_payment_id,
              date: new Date().toLocaleString(),
            };
            setPaymentDetails(paymentData);
            setSuccess(true);
            setShowDownload(true);
            setForm({
              name: "",
              email: "",
              amount: "",
              message: "",
              purpose: "Food Support",
            });
          } catch (err) {
            toast.error("Donation could not be processed.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: { color: "#16a34a" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Payment failed or cancelled.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) setShowConfirm(true);
  };

  const downloadReceipt = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const logo = new Image();
    logo.src = "/logo2.png.png";
    logo.onload = () => {
      doc.addImage(logo, "PNG", 80, 10, 50, 50);
      doc.setFontSize(18);
      doc.setTextColor(34, 139, 34);
      doc.text("Prani Seva Ashram", pageWidth / 2, 70, { align: "center" });
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Donation Receipt", pageWidth / 2, 80, { align: "center" });
      doc.setFontSize(12);
      doc.text(`Name: ${paymentDetails.name}`, 20, 100);
      doc.text(`Email: ${paymentDetails.email}`, 20, 110);
      doc.text(`Amount Donated: ₹${paymentDetails.amount}`, 20, 120);
      doc.text(`Purpose: ${paymentDetails.purpose}`, 20, 130);
      doc.text(`Date: ${paymentDetails.date}`, 20, 140);
      doc.text(`Payment ID: ${paymentDetails.paymentId}`, 20, 150);
      doc.setFontSize(11);
      doc.setTextColor(85, 85, 85);
      doc.text("Thank you for supporting Prani Seva Ashram!", 20, 170);
      doc.text(
        '"Your kindness feeds more than just stomachs—it feeds hope."',
        20,
        180
      );
      doc.setDrawColor(200);
      doc.line(20, 270, pageWidth - 20, 270);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        "© Prani Seva Ashram | www.praniseva.org | donate@praniseva.org",
        pageWidth / 2,
        278,
        { align: "center" }
      );

      doc.save("Donation_Receipt.pdf");
    };
  };

  return (
    <section className="bg-[#fdfaf6] px-4 py-8 min-h-screen">
      {/* Donation Options */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-white/30 mb-8">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          Support Prani Seva Ashram: Transform Lives Through Ethical Giving
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Every contribution to Prani Seva Ashram is more than just a donation—
          it’s an investment in compassion, responsibility, and lasting impact.
          Your support directly saves lives, provides medical care, and builds a
          future where animals are treated with dignity and care.
        </p>

        <h3 className="text-xl font-semibold text-green-700 mb-2">
          Ways to Give:
        </h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>Corporate CSR Contributions</strong>: Align your company’s
            CSR strategy with ethical animal welfare. Donations qualify under
            CSR mandates.
          </li>
          <li>
            <strong>Tax-Exempt Monetary Donations</strong>: Donations qualify
            for 80G & 12A tax exemptions under the Income Tax Act.
          </li>
          <li>
            <strong>Sponsorship & Naming Rights</strong>: Corporates can sponsor
            shelter operations and medical care.
          </li>
          <li>
            <strong>In-Kind Donations</strong>: Contribute pet food, medical
            supplies, or shelter enhancements.
          </li>
          <li>
            <strong>Workplace Giving & Employee Engagement</strong>: Payroll
            giving, corporate matching, and employee volunteering.
          </li>
          <li>
            <strong>Legacy & Long-Term Giving</strong>: Pledge long-term
            contributions or estate donations.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-green-700 mt-4 mb-2">
          Why Your Support Matters?
        </h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>Fully Registered & Certified</strong>: Prani Seva Ashram is
            recognized under CSR, Income Tax Act, and E-Anudan.
          </li>
          <li>
            <strong>Ethical & Accountable Giving</strong>: Donations are tracked
            and used transparently for life-saving rescues.
          </li>
          <li>
            <strong>Dual Benefits</strong>: Social responsibility and financial
            advantages for businesses.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-green-700 mt-4">
          Kindly Join Us & Be Part of a Movement for Compassion
        </h3>
        <p className="text-gray-700 mt-2">
          Your support doesn’t just rescue animals—it builds a kinder, more
          responsible world. Let’s make compassion a corporate value, social
          impact a business legacy, and giving a force for change.
        </p>
      </div>

      <div className="max-w-3xl mx-auto rounded-3xl bg-white/50 backdrop-blur-lg shadow-2xl border border-white/30 p-8 md:p-10 space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 text-center">
          Make a Difference Today 💚
        </h2>
        <p className="text-center text-gray-700">
          Your donation brings food, shelter, and hope to rescued animals. Fill
          out the form below and become a hero for paws!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {[
            {
              label: "Name",
              icon: <FaUser />,
              name: "name",
              type: "text",
              placeholder: "Full Name",
            },
            {
              label: "Email",
              icon: <FaEnvelope />,
              name: "email",
              type: "email",
              placeholder: "Email Address",
            },
            {
              label: "Amount (INR)",
              icon: <FaRupeeSign />,
              name: "amount",
              type: "number",
              placeholder: "e.g. 500",
            },
          ].map(({ label, icon, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-green-600">
                  {icon}
                </span>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                />
              </div>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Donation Purpose
            </label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {[
                "Food Support",
                "Medical Help",
                "Shelter Aid",
                "General Support",
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write a message to the rescued animals (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-green-700">
              Thank You for Your Donation! 💚
            </h2>
            <p className="mt-4 text-lg">
              Your generous support will help us continue our work with rescued
              animals.
            </p>
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white mt-6 rounded-lg px-4 py-2 hover:bg-green-700"
            >
              Proceed with Payment
            </button>
          </div>
        </div>
      )}

      {showDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-green-700">
              Thank You for Your Donation! 💚
            </h2>
            <p className="mt-4 text-lg">
              Your generous support will help us continue our work with rescued
              animals.
            </p>
            <button
              onClick={downloadReceipt}
              className="w-full bg-green-600 text-white mt-6 rounded-lg px-4 py-2 hover:bg-green-700"
            >
              Download Receipt
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Donate;
