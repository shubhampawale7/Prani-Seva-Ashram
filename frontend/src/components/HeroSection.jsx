import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import homehero from "../assets/images/homehero.jpg"; // Ensure this path is correct and the image is high-quality
import { FaHeart, FaPaw, FaLeaf } from "react-icons/fa"; // New icons for inline text

// Using Google Fonts example (you'd link these in public/index.html or via @import in CSS)
// For a professional aesthetic, consider:
// Heading: 'Playfair Display' (serif, elegant) or 'Inter' (modern sans-serif)
// Body: 'Roboto', 'Open Sans', or 'Lato' (clean, readable sans-serif)

const HeroSection = () => {
  // Animation variants for staggered text
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between children animations
      },
    },
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-22 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
      {/* Background Overlay/Shape - More complex and subtle */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          // Layer 1: Faint organic blob (subtle curve/shape element)
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f9f9f6' fill-opacity='0.8' d='M0,192L60,186.7C120,181,240,171,360,176C480,181,600,200,720,192C840,184,960,149,1080,138.7C1200,128,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top -50px left -100px",
          backgroundSize: "150% auto", // Scale to cover
          zIndex: 0,
        }}
      ></div>
      {/* Layer 2: Even fainter subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none" // Even lower opacity
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm50 0v100M0 50h100' stroke='%23f0ead6' stroke-width='0.3'/%3E%3C/svg%3E\")", // Very faint grid
          backgroundSize: "30px 30px", // Finer grid cells
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        {/* Left Section: Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <motion.h1
            variants={textVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 leading-tight tracking-tight"
          >
            Prani Seva Ashram <span className="text-orange-500">🐾</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-xl sm:text-2xl text-gray-700 font-serif italic max-w-xl mx-auto lg:mx-0"
          >
            "Your CSR: A Legacy of Compassion and Home for the Voiceless."
          </motion.p>

          <motion.p
            variants={textVariants}
            className="text-lg text-gray-700 max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            We are not just a shelter — we are a{" "}
            <strong className="text-amber-800">
              sanctuary of second chances
            </strong>
            . At Prani Seva Ashram, we rescue, heal, and provide lifelong care
            to stray and injured dogs. Each life we touch reflects the power of
            <strong className="text-amber-800">
              {" "}
              compassion and collective kindness
            </strong>
            . Partner with us in building a world where{" "}
            <strong className="text-amber-800">no paw is left behind</strong>.
          </motion.p>

          <motion.div variants={textVariants}>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
              aria-label="Donate Now and support Prani Seva Ashram"
            >
              Donate Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.5 9.086 5.707 7.293a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l4.5-4.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 2 }} // Initial slight rotation for dynamism
          animate={{ opacity: 1, x: 0, rotate: 0 }} // Animate to no rotation
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="lg:w-1/2 flex justify-center items-center relative mt-12 lg:mt-0"
        >
          {/* Enhanced Subtle Border/Frame effect with more depth and gentle pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-300 rounded-3xl opacity-60 blur-xl animate-pulse-slow"></div>

          {/* Image container with subtle inner shadow and refined styling */}
          <div
            className="relative z-10 max-w-xs sm:max-w-sm p-3 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md transform transition-transform duration-500 ease-in-out hover:scale-[1.02] border border-amber-100
                       after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:shadow-inner after:shadow-orange-200/50" // Inner shadow effect
          >
            <img
              src={homehero}
              alt="An individual gently petting a rescued dog, symbolizing compassion and care at Prani Seva Ashram"
              className="w-full h-auto object-cover rounded-2xl border border-gray-50"
              loading="lazy"
              width={500}
              height={500}
            />
          </div>

          {/* Testimonial Snippet - Small, impactful, integrated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-8 md:-bottom-12 -left-4 sm:left-4 lg:-left-8 bg-white p-3 rounded-lg shadow-xl text-center text-sm font-medium text-gray-700 w-48 sm:w-56 border border-amber-100"
          >
            <FaHeart className="inline text-rose-500 mr-1" /> "A true
            sanctuary!"
            <span className="block text-xs text-gray-500 mt-1">
              - Happy Adopter
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
