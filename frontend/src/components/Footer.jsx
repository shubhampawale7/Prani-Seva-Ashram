// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-100 shadow-inner border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo/Description */}
        <div>
          <h2 className="text-xl font-extrabold text-amber-300">
            Prani Seva Ashram 🐾
          </h2>
          <p className="mt-2 text-sm text-amber-100">
            Your CSR: A Legacy of Compassion and Home for the Voiceless.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-amber-200 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/adopt" className="hover:text-amber-400">
                Adopt
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-amber-400">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-amber-400">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-amber-200 mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:help@praniseva.org"
                className="hover:text-amber-400"
              >
                help@praniseva.org
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+919999999999" className="hover:text-amber-400">
                +91 99999 99999
              </a>
            </li>
            <li>Location: Pune, Maharashtra</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-amber-200 mb-3">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-100">
        &copy; {new Date().getFullYear()} Prani Seva Ashram. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
