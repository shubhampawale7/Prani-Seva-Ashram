/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  FaHeart,
  FaRupeeSign,
  FaEnvelope,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa"; // Import FaTimesCircle for the close button
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import ImpactButton from "../components/ImpactButton";

const typingPhrases = ["Support.", "Love.", "Heal."];

const Donate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
    purpose: "Food Support",
    // Added for potential future use or if you capture phone/paymentMethod on this form
    phone: "",
    paymentMethod: "Razorpay", // Default to Razorpay
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

  // NEW STATE: For the countdown timer
  const [countdown, setCountdown] = useState(30);

  // Typing effect logic (kept as is)
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

  // Load/save form draft (kept as is)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("donation-draft"));
    if (saved) setForm(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("donation-draft", JSON.stringify(form));
  }, [form]);

  // NEW EFFECT: Countdown timer for the download modal
  useEffect(() => {
    let timer;
    if (showDownload && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showDownload && countdown === 0) {
      // Close the modal when countdown reaches 0
      handleCloseDownloadModal();
    }
    return () => clearTimeout(timer); // Clear timeout on component unmount or if dependencies change
  }, [showDownload, countdown]); // Dependencies for this effect

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
              // IMPORTANT: Add paymentMethod if it's not already in 'form'
              paymentMethod: "Razorpay",
              // If you capture phone on this form, send it:
              // phone: form.phone,
            });
            localStorage.removeItem("donation-draft");

            const paymentData = {
              ...form,
              paymentId: response.razorpay_payment_id,
              date: new Date().toLocaleString(),
              paymentMethod: "Razorpay", // Ensure this is stored for receipt
            };
            setPaymentDetails(paymentData);
            setSuccess(true);
            setShowDownload(true);
            setCountdown(30); // Start the countdown when the modal is shown
            setForm({
              name: "",
              email: "",
              amount: "",
              message: "",
              purpose: "Food Support",
              phone: "",
              paymentMethod: "Razorpay",
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
      setShowConfirm(false); // Hide the confirmation modal after payment attempt
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
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineSpacing = 10; // Increased line spacing for better readability
    let y = margin; // Start content from the top margin

    // Define Amber Colors (using hex for precision, converted to RGB)
    const amber50 = [255, 248, 225]; // #FFF8E1 (Amber 50)
    const amber500 = [255, 152, 0]; // #FF9800 (Amber 500)
    const greyText = [70, 70, 70]; // Darker grey for content text
    const lightGreyText = [120, 120, 120]; // Lighter grey for subtle text

    // Load Logo
    const logo = new Image();
    logo.src = "/logo2.png.png";

    logo.onload = () => {
      // Header Section
      // Amber 50 background strip
      doc.setFillColor(amber50[0], amber50[1], amber50[2]);
      doc.rect(0, 0, pageWidth, 50, "F"); // Full width header background

      // Logo and Organization Name
      doc.addImage(logo, "PNG", margin, 10, 30, 30); // Positioned to the left
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(amber500[0], amber500[1], amber500[2]); // Amber 500 for organization name
      doc.text("Prani Seva Ashram", margin + 40, 30); // Aligned with logo

      // Title Section
      y = 70; // Adjust start Y after header
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50); // Dark grey for the main title
      doc.text("Donation Receipt", pageWidth / 2, y, { align: "center" });
      y += lineSpacing * 1.5;

      // Decorative line below title
      doc.setDrawColor(amber500[0], amber500[1], amber500[2]);
      doc.setLineWidth(1);
      doc.line(margin, y, pageWidth - margin, y);
      y += lineSpacing * 1.5;

      // Donor Information Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(amber500[0], amber500[1], amber500[2]); // Amber 500 for section titles
      doc.text("Donor Information:", margin, y);
      y += lineSpacing;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(greyText[0], greyText[1], greyText[2]);
      doc.text(`Name: ${paymentDetails.name}`, margin + 10, y);
      y += lineSpacing;
      doc.text(`Email: ${paymentDetails.email}`, margin + 10, y);
      y += lineSpacing * 2;

      // Donation Details Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(amber500[0], amber500[1], amber500[2]);
      doc.text("Donation Details:", margin, y);
      y += lineSpacing;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(greyText[0], greyText[1], greyText[2]);
      doc.text(
        `Amount Donated: Rs. ${paymentDetails.amount}/-`,
        margin + 10,
        y
      );
      y += lineSpacing;
      doc.text(`Purpose: ${paymentDetails.purpose}`, margin + 10, y);
      y += lineSpacing;
      doc.text(`Date: ${paymentDetails.date}`, margin + 10, y);
      y += lineSpacing;
      doc.text(`Payment ID: ${paymentDetails.paymentId}`, margin + 10, y);
      y += lineSpacing * 2;

      // Organization Information Section
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(amber500[0], amber500[1], amber500[2]);
      doc.text("Organization Details:", margin, y);
      y += lineSpacing;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(greyText[0], greyText[1], greyText[2]);
      doc.text("Prani Seva Ashram", margin + 10, y);
      y += lineSpacing;
      doc.text("KP Housing Society, East Street Camp,", margin + 10, y);
      y += lineSpacing;
      doc.text("Pune - 411001, Maharashtra, India", margin + 10, y);
      y += lineSpacing;
      doc.text("Email: donate@pranisevaashram.com", margin + 10, y);
      y += lineSpacing;
      doc.text("Website: www.pranisevaashram.com", margin + 10, y);
      y += lineSpacing;
      doc.text("Phone: +91-9011523456", margin + 10, y);
      y += lineSpacing * 2;

      // Thank You Message & Quote
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(amber500[0], amber500[1], amber500[2]);
      doc.text("Thank you for your generous support!", pageWidth / 2, y, {
        align: "center",
      });
      y += lineSpacing * 1.5;

      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(lightGreyText[0], lightGreyText[1], lightGreyText[2]);
      doc.text(
        `"Your kindness feeds more than just stomachs—it feeds hope."`,
        pageWidth / 2,
        y,
        { align: "center" }
      );
      // Reduced space after quote to bring footer up
      y += lineSpacing;

      // ---
      // Footer
      // The footer now occupies a smaller height for a single line
      const footerHeight = 25; // Adjusted height for the footer strip
      doc.setFillColor(amber50[0], amber50[1], amber50[2]);
      doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");

      // Decorative line above footer - Adjusted position to be just above the new footer height
      doc.setDrawColor(amber500[0], amber500[1], amber500[2]);
      doc.line(
        margin,
        pageHeight - footerHeight - 5,
        pageWidth - margin,
        pageHeight - footerHeight - 5
      );

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(lightGreyText[0], lightGreyText[1], lightGreyText[2]);
      doc.text(
        "© Prani Seva Ashram | www.praniseva.com | donate@praniseva.org",
        pageWidth / 2,
        pageHeight - footerHeight / 2 + 2, // Vertically center text in new footer height
        { align: "center" }
      );

      doc.save("DonationReceipt.pdf");
      toast.success("Receipt downloaded successfully!");
    };
  };
  // NEW FUNCTION: To close the download modal and reset countdown
  const handleCloseDownloadModal = () => {
    setShowDownload(false);
    setCountdown(30); // Reset countdown for next time
    // Optional: Navigate away or do something else after modal closes
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Donate to Prani Seva Ashram - Support Rescued Animals</title>
        <meta
          name="description"
          content="Make a meaningful impact by donating to Prani Seva Ashram. Your contribution helps provide food, shelter, and medical aid to rescued animals."
        />
        <link rel="canonical" href="https://www.praniseva.org/donate" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph */}
        <meta property="og:title" content="Donate to Prani Seva Ashram" />
        <meta
          property="og:description"
          content="Support rescued animals by donating to Prani Seva Ashram. Every bit helps!"
        />
        <meta property="og:url" content="https://www.praniseva.org/donate" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.praniseva.org/logo2.png.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate to Prani Seva Ashram" />
        <meta
          name="twitter:description"
          content="Support rescued animals by donating to Prani Seva Ashram. Every bit helps!"
        />
        <meta
          name="twitter:image"
          content="https://www.praniseva.org/logo2.png.png"
        />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DonationOrganization",
            name: "Prani Seva Ashram",
            url: "https://www.praniseva.org",
            logo: "https://www.praniseva.org/logo2.png.png",
            sameAs: [
              "https://www.facebook.com/praniseva",
              "https://www.instagram.com/praniseva",
              "https://wa.me/your-number",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              email: "donate@praniseva.org",
              contactType: "customer support",
            },
            description:
              "Non-profit organization dedicated to animal welfare and rescue.",
          })}
        </script>
      </Helmet>

      <section className="bg-[#fdfaf6] px-4 py-8 min-h-screen">
        {/* Donation Options */}
        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl border border-gray-100 space-y-14 mb-10">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4">
              Support Prani Seva Ashram: Transform Lives Through Ethical Giving
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every contribution to{" "}
              <strong className="text-green-800">Prani Seva Ashram</strong> is
              more than just a donation—it’s an investment in compassion,
              responsibility, and lasting impact. Your support directly saves
              lives, provides medical care, and builds a future where animals
              are treated with dignity and care.
            </p>
          </div>

          {/* Ways to Give */}
          <div className="bg-green-50/50 p-6 md:p-8 rounded-2xl border border-green-200 shadow-md">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ways to Give
            </h3>
            <ul className="space-y-4 text-gray-800 list-disc pl-6 text-base leading-relaxed">
              <li>
                <strong>Corporate CSR Contributions:</strong> Align your
                company's CSR strategy with ethical animal welfare. As a
                government-registered NGO, donations qualify under CSR mandates,
                helping businesses meet their social responsibility goals while
                creating measurable impact.
              </li>
              <li>
                <strong>Tax-Exempt Monetary Donations:</strong> Individuals and
                businesses can contribute through one-time or recurring
                donations, all of which qualify for 80G & 12A tax exemptions
                under the Income Tax Act, ensuring financial benefits while
                supporting a meaningful cause.
              </li>
              <li>
                <strong>Sponsorship & Naming Rights:</strong> Corporates can
                directly sponsor shelter operations, medical care, and
                rehabilitation programs, gaining exclusive naming rights for
                animal enclosures or rescue initiatives, leaving a lasting
                legacy of compassion.
              </li>
              <li>
                <strong>In-Kind Donations:</strong> From pet food and medical
                supplies to shelter enhancements, physical contributions provide
                essential care and comfort to rescued animals.
              </li>
              <li>
                <strong>Workplace Giving & Employee Engagement:</strong>{" "}
                Encourage payroll giving, corporate matching programs, and
                employee volunteering, strengthening workplace culture while
                contributing to meaningful change.
              </li>
              <li>
                <strong>Legacy & Long-Term Giving:</strong> Support sustainable
                animal welfare by pledging long-term contributions, endowments,
                or estate planning donations, ensuring a continuous impact for
                years to come.
              </li>
            </ul>
          </div>

          {/* Why It Matters */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-md">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Why Your Support Matters
            </h3>
            <ul className="space-y-4 text-gray-800 list-disc pl-6 text-base leading-relaxed">
              <li>
                <strong>Fully Registered & Certified:</strong> Prani Seva Ashram
                is recognized under CSR, Income Tax Act, and E-Anudan,
                guaranteeing financial transparency and donor credibility.
              </li>
              <li>
                <strong>Ethical & Accountable Giving:</strong> Donations are
                tracked, utilized transparently, and directly fuel life-saving
                rescues, ensuring real impact.
              </li>
              <li>
                <strong>
                  Dual Benefits – Social Responsibility & Financial Advantage:
                </strong>{" "}
                Gain tax deductions while driving meaningful change, making
                corporate giving both strategic and rewarding.
              </li>
            </ul>
          </div>

          {/* Closing Note */}
          <div className="relative overflow-hidden rounded-2xl border border-green-100 shadow-md bg-gradient-to-br from-green-50 via-white to-white p-8 sm:p-10 mb-10 space-y-6">
            {/* Main Heading */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-green-900 leading-snug">
              Kindly Join Us & Be Part of a Movement for Compassion
            </h3>

            {/* Descriptive Text */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Your support doesn’t just rescue animals—it builds a kinder, more
              responsible world. Let’s make compassion a corporate value, social
              impact a business legacy, and giving a force for meaningful
              change.
            </p>

            {/* Quote Block */}
            <div className="bg-green-100/50 border-l-4 border-green-500 p-6 rounded-xl shadow-inner">
              <p className="text-lg sm:text-xl font-semibold text-green-800 italic leading-relaxed">
                “Partner with Prani Seva Ashram today and turn corporate
                responsibility into ethical action.”
              </p>
            </div>

            {/* Decorative Bubble */}
            <div
              className="absolute -bottom-6 -right-6 opacity-10 w-32 h-32 bg-green-300 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <ImpactButton />
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-12 space-y-10">
          {/* Heading */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
              Make a Difference Today 💚
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Your donation brings food, shelter, and hope to rescued animals.
              Fill out the form below and become a hero for paws!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-green-600">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-green-600">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Amount + Purpose */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-green-600">
                    <FaRupeeSign />
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Donation Purpose
                </label>
                <select
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
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
                placeholder="Write a message to the rescued animals (optional)"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full md:w-1/2 mx-auto bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </div>
          </form>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-green-700">
                Confirm Your Donation 💚
              </h2>
              <p className="mt-4 text-lg">
                You're about to donate <strong>₹{form.amount}/- </strong> to
                <strong> Prani Seva Ashram</strong> for{" "}
                <strong>{form.purpose}</strong> . Click "Proceed with Payment"
                to confirm.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed with Payment"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDownload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center relative">
              {" "}
              {/* Added relative for positioning close button */}
              {/* Close Button */}
              <button
                onClick={handleCloseDownloadModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <FaTimesCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold text-green-700">
                Thank You for Your Donation! 💚
              </h2>
              <p className="mt-4 text-lg">
                Your generous support will help us continue our work with
                rescued animals.
              </p>
              {/* Countdown Message */}
              <p className="mt-2 text-sm text-gray-600">
                This window will close in {countdown} seconds.
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

        {/* Direct Bank Transfer Section */}
        <div className="max-w-xl mx-auto mt-20 transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src="src/assets/images/hdfc-bank.png"
                alt="HDFC Bank Logo"
                className="w-32 md:w-40 transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                🏦 Direct Bank Donations
              </h2>
            </div>

            <div className="text-gray-800 text-sm md:text-base space-y-3">
              <div>
                <strong>Bank Name:</strong> HDFC Bank
              </div>
              <div>
                <strong>Branch:</strong> KP Housing Society, Gen Thimaya Road,
                East Street Camp, Pune - 411001, Maharashtra
              </div>
              <div>
                <strong>Account Number:</strong> 50200009901095
              </div>
              <div>
                <strong>IFSC Code:</strong> HDFC0000148
              </div>
            </div>

            <div className="bg-green-100/60 border border-green-300 text-green-800 text-sm p-4 rounded-lg">
              📧 After donating, please email your transaction details to{" "}
              <strong>donate@praniseva.org</strong> to receive a donation
              receipt.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
