import { FaCheckCircle, FaDonate, FaFileAlt } from "react-icons/fa";
import {
  useAnimation,
  useInView, // <-- Keep this import
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ComplianceDetailsSection from "../components/ComplianceDetailsSection";
import IntegrityCommitmentSection from "../components/IntegrityCommitmentSection";

const features = [
  {
    title: "CSR Registration",
    description:
      "Enables corporate donations to align with CSR mandates, enhancing brand reputation and social impact.",
    certificate: "csr-registration.png",
  },
  {
    title: "Income Tax Act Permission (80G)",
    description:
      "Donations made to us qualify for tax deductions under Section 80G of the Income Tax Act, providing financial benefits to our generous donors.",
    certificate: "income-tax-80g.png", // Assuming you'll have a separate image for 80G
  },
  {
    title: "Income Tax Act Permission (12A)",
    description:
      "Our registration under Section 12A of the Income Tax Act grants us tax-exempt status, ensuring all contributions directly fuel our animal welfare initiatives.",
    certificate: "income-tax-12a.png", // Assuming you'll have a separate image for 12A
  },
  {
    title: "Darpan - NITI Aayog, Govt. of India",
    description:
      "Registered with NITI Aayog's Darpan portal, we are recognized by the Government of India, affirming our legitimacy and commitment to national development goals.",
    certificate: "darpan-niti-ayog.png", // Assuming you'll have an image for Darpan
  },
  {
    title: "E-Anudan Registration",
    description:
      "Ensures eligibility for government grants and enhances operational transparency.",
    certificate: "e-anudan-registration.png",
  },
  {
    title: "Government Recognition",
    description:
      "Valid NGO certification to build trust among donors, corporate partners, and policy stakeholders.",
    certificate: "government-recognition.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Compliance = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 40]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -60]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 30]);

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCertificate = (filename) => {
    setSelectedCertificate(filename);
    setIsModalOpen(true);
  };

  const ModalContent = ({ selectedCertificate, onClose }) => {
    const [zoomed, setZoomed] = useState(false);
    const [touchStartY, setTouchStartY] = useState(null);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      if (touchStartY !== null && endY - touchStartY > 80) {
        onClose();
      }
    };

    return (
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="bg-white/80 backdrop-blur-md border border-amber-200 p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-700 hover:text-red-500 text-3xl font-bold transition-transform transform hover:scale-125 focus:outline-none z-10"
          aria-label="Close certificate modal"
        >
          &times;
        </button>
        <img
          id="certificate-modal-title"
          src={`/assets/images/certificate/${selectedCertificate}`}
          alt={`Certificate: ${selectedCertificate
            .replace(/[-_]/g, " ")
            .replace(/\.[^/.]+$/, "")}`}
          onClick={() => setZoomed(!zoomed)}
          className={`rounded-xl w-full h-auto object-contain max-h-[80vh] border border-amber-100 shadow-inner transition-transform duration-300 cursor-zoom-in ${
            zoomed ? "scale-125 cursor-zoom-out" : ""
          }`}
        />
      </motion.div>
    );
  };

  return (
    <>
      <Helmet>
        <title>
          Government Registrations & Compliance | Prani Seva Ashram NGO
        </title>
        <meta
          name="description"
          content="Discover the official government registrations and compliance certifications of Prani Seva Ashram, a registered and certified NGO dedicated to ethical animal welfare."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.pranisevaashram.org/compliance"
        />
      </Helmet>

      <section
        aria-labelledby="page-title"
        className="relative bg-gradient-to-br from-amber-50 to-white min-h-screen py-24 px-6 md:px-16 lg:px-28 flex flex-col justify-center overflow-hidden font-sans"
      >
        {/* Parallax shapes (more refined) */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-[-80px] w-48 h-48 bg-amber-200 rounded-full opacity-20 filter blur-3xl animate-blob-one"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/3 right-[-90px] w-64 h-64 bg-green-100 rounded-full opacity-20 filter blur-3xl animate-blob-two"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-1/2 left-[10%] w-40 h-40 bg-amber-100 rounded-full opacity-15 filter blur-3xl animate-blob-three"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto z-10 w-full"
        >
          <h1
            id="page-title"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-amber-700 mb-8 md:mb-10 text-center select-none tracking-tighter drop-shadow-sm leading-tight"
          >
            Our Commitment: <br className="sm:hidden" />{" "}
            <span className="text-amber-800">
              Government Registrations & Compliance
            </span>
          </h1>

          <motion.p
            className="max-w-4xl mx-auto text-center text-lg md:text-xl text-gray-700 leading-relaxed mb-16 px-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            At **Prani Seva Ashram**, we pride ourselves on being a{" "}
            <span className="text-green-700 font-semibold italic">
              fully registered and certified NGO
            </span>
            , operating with utmost transparency, credibility, and adherence to
            all legal frameworks. Our compliance with government regulations
            ensures that every contribution makes a verified and impactful
            difference in our ethical animal welfare efforts.
          </motion.p>

          <ComplianceDetailsSection />

          <IntegrityCommitmentSection />

          {/* New Title for Certificates Section */}
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-amber-700 text-center mb-12 mt-16 select-none tracking-tighter drop-shadow-sm leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Our Official Certifications
          </motion.h2>

          <div
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
          >
            {features.map(({ title, description, certificate }, i) => {
              const controls = useAnimation();
              const ref = useRef(null);
              const inView = useInView(ref, { margin: "-100px", once: true });

              useEffect(() => {
                if (inView) controls.start("visible");
              }, [inView, controls]);

              return (
                <motion.article
                  key={title}
                  ref={ref}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                  tabIndex={0}
                  aria-label={`${title}: ${description} Click or tap to view certificate.`}
                  role="listitem"
                  className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center cursor-pointer
                             border border-amber-100 hover:border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group"
                >
                  <div className="p-4 rounded-full bg-green-50 text-green-600 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <FaCheckCircle className="text-5xl" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-green-800 mb-2 leading-snug">
                    {title}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                    {description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCertificate(certificate);
                    }}
                    aria-label={`View certificate for ${title}`}
                    className="mt-auto inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg py-2 px-4 border border-amber-300 hover:border-amber-500 transition-colors duration-200"
                  >
                    <FaFileAlt className="text-xl text-amber-600" />
                    View Certificate
                  </button>
                </motion.article>
              );
            })}
          </div>

          <motion.p
            className="mt-20 max-w-3xl mx-auto text-center text-gray-700 text-base md:text-lg leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            These crucial registrations not only offer financial relief through
            tax exemptions but also provide the profound satisfaction of{" "}
            <strong className="text-amber-700">
              supporting a truly noble cause
            </strong>
            —our unwavering commitment to animal welfare. Partner with us, and
            invest in a future of compassion and accountability.
          </motion.p>

          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link
              to="/donate"
              className="inline-flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-transform active:scale-95 text-xl tracking-wide uppercase group"
              aria-label="Donate now to support Prani Seva Ashram"
            >
              <FaDonate className="text-3xl transition-transform group-hover:scale-110" />
              Donate Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 backdrop-blur-sm bg-gradient-to-br from-transparent via-amber-100/30 to-green-100/30 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              role="presentation"
            >
              <ModalContent
                selectedCertificate={selectedCertificate}
                onClose={() => setIsModalOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Compliance;
