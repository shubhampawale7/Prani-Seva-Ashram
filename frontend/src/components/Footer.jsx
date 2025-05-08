import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-900 text-gray-100 border-t border-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo/Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-amber-300">
            Prani Seva Ashram 🐾
          </h2>
          <p className="mt-3 text-sm text-amber-100">
            Your CSR: A Legacy of Compassion and Home for the Voiceless.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-amber-200 text-lg mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Adopt", "Donate", "Gallery", "Compliance"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-amber-400 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-amber-200 text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:help@praniseva.org"
                className="hover:text-amber-400 transition"
              >
                help@praniseva.org
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919999999999"
                className="hover:text-amber-400 transition"
              >
                +91 99999 99999
              </a>
            </li>
            <li>Location: Pune, Maharashtra</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-amber-200 text-lg mb-4">Connect</h3>
          <div className="flex items-center space-x-4 text-2xl">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Prani Seva Ashram. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
