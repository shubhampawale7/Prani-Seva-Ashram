import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaPaw,
  FaHeart,
} from "react-icons/fa"; // Added FaYoutube, FaPaw, FaHeart
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import logo from "../assets/praniseva-logo.png"; // Assuming this is your original logo
import whiteLogo from "../assets/praniseva-logo.png"; // NEW: Assuming you have a white/light version for dark backgrounds
import MapModal from "./MapModal";
import pawPrint from "../assets/images/footerDog.jpg";
// Re-tuned iconVariants for a subtle staggered fade-in
const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1, // Faster stagger for compactness
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  }),
};

// General footer section variants for entrance animation
const footerSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Footer = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative bg-gradient-to-br from-amber-800 to-amber-950 text-amber-100 py-10 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerSectionVariants} // Apply main section variant
    >
      {/* Subtle background paw print overlay for branding */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img
          src={pawPrint} // Make sure this SVG/PNG exists and is subtle
          alt="Paw print background texture"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Desktop & Tablet View (md:grid) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
          {/* Column 1: Brand & Tagline */}
          <motion.div
            variants={footerSectionVariants}
            className="text-center sm:text-left"
          >
            <Link
              to="/"
              className="flex items-center justify-center sm:justify-start mb-3"
            >
              <img
                src={whiteLogo || logo}
                alt="Prani Seva Ashram Logo"
                className="h-18 w-auto mr-2 filter drop-shadow-md"
              />{" "}
              {/* Use white logo if available */}
              <span className="text-2xl font-extrabold text-white leading-tight">
                Prani Seva Ashram
              </span>
            </Link>
            <p className="text-amber-200 text-sm mt-2 max-w-xs mx-auto sm:mx-0">
              A legacy of compassion for the voiceless. Rescuing,
              rehabilitating, and rehoming animals in Pune.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-5">
              {[
                {
                  Icon: FaWhatsapp,
                  href: "https://wa.me/919225633029",
                  label: "WhatsApp",
                  color: "text-green-400",
                },
                {
                  Icon: FaInstagram,
                  href: "https://instagram.com/pranisevaashram",
                  label: "Instagram",
                  color: "text-pink-400",
                },
                {
                  Icon: FaFacebookF,
                  href: "https://facebook.com/pranisevaashram",
                  label: "Facebook",
                  color: "text-blue-400",
                },
                {
                  Icon: FaYoutube,
                  href: "https://youtube.com/pranisevaashram",
                  label: "YouTube",
                  color: "text-red-400",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  custom={i}
                  variants={iconVariants}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`${social.color} hover:text-white transition-colors duration-200 text-2xl`}
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            variants={footerSectionVariants}
            className="text-center sm:text-left"
          >
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-amber-200 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-work"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Our Work
                </Link>
              </li>

              <li>
                <Link
                  to="/donate"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Donate Now
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Our Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: How You Can Help */}
          <motion.div
            variants={footerSectionVariants}
            className="text-center sm:text-left"
          >
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Get Involved
            </h3>
            <ul className="space-y-2 text-amber-200 text-sm">
              <li>
                <Link
                  to="/report-abuse"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Report Abuse
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency-rescue"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Emergency Rescue
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* NEW Column: Legal Pages */}
          <motion.div
            variants={footerSectionVariants}
            className="text-center sm:text-left"
          >
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-amber-200 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Moved Contact Info & Location from original Column 4 to a combined section in mobile view */}
          {/* For desktop, contact info will be part of the main grid if desired, or kept implicitly for mobile */}
        </div>

        {/* Mobile View (sm:hidden for wider screens) */}
        <div className="md:hidden flex flex-col items-center text-center py-4 space-y-4">
          <Link to="/" className="flex items-center justify-center mb-2">
            <img
              src={whiteLogo || logo}
              alt="Prani Seva Ashram Logo"
              className="h-10 w-auto mr-2"
            />
            <span className="text-2xl font-extrabold text-white">
              Prani Seva Ashram
            </span>
          </Link>
          <p className="text-amber-200 text-sm max-w-xs">
            Compassion for the voiceless. Helping animals in Pune.
          </p>

          <div className="flex space-x-5 mt-3">
            {[
              {
                Icon: FaWhatsapp,
                href: "https://wa.me/919225633029",
                label: "WhatsApp",
                color: "text-green-400",
              },
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/pranisevaashram/",
                label: "Instagram",
                color: "text-pink-400",
              },
              {
                Icon: FaFacebookF,
                href: "https://www.facebook.com/profile.php?id=61576780949517",
                label: "Facebook",
                color: "text-blue-400",
              },
              {
                Icon: FaYoutube,
                href: "https://www.youtube.com/@PraniSevaAshram",
                label: "YouTube",
                color: "text-red-400",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                custom={i}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`${social.color} hover:text-white transition-colors duration-200 text-2xl`}
              >
                <social.Icon />
              </motion.a>
            ))}
          </div>

          {/* Mobile Contact Info */}
          <div className="space-y-2 text-zinc-300 text-sm mt-4">
            <p className="flex items-center justify-center gap-2">
              <MdPhone className="text-orange-300 text-lg" />
              <a
                href="tel:+919225633029"
                className="hover:text-white hover:underline"
              >
                +91 92256 33029
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <MdEmail className="text-orange-300 text-lg" />
              <a
                href="mailto:contact@pranisevaashram.com"
                className="hover:text-white hover:underline"
              >
                contact@pranisevaashram.com
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <MdLocationOn className="text-orange-300 text-lg" />
              <button
                onClick={() => setIsMapOpen(true)}
                className="hover:text-white hover:underline"
              >
                Prani Seva Ashram, 135-B, B.A. Chowk, Pune - 411001, India (View
                Map)
              </button>
            </p>
          </div>

          {/* NEW Mobile Legal Links Section */}
          <div className="w-full border-t border-amber-700 mt-5 pt-4 text-amber-200 text-sm">
            <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
              Legal
            </h3>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-white hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Universal Copyright & Made with Love */}
      <motion.div
        className="relative z-10 border-t border-amber-700 mt-8 pt-4 text-xs text-amber-300 text-center flex flex-col sm:flex-row justify-center items-center gap-2 px-4"
        variants={footerSectionVariants} // Applied again for separate animation if needed
      >
        <p className="order-2 sm:order-1 flex-shrink-0">
          © {currentYear} Prani Seva Ashram. All rights reserved.
        </p>
        <p className="order-1 sm:order-2 flex items-center justify-center gap-1.5 flex-shrink-0">
          Made with{" "}
          <FaHeart className="text-red-400 text-sm" aria-label="love" /> for our
          furry friends
        </p>
      </motion.div>

      <MapModal isOpen={isMapOpen} setIsOpen={setIsMapOpen} />
    </motion.footer>
  );
};

export default Footer;
