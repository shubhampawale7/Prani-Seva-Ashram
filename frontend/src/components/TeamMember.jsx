import React from "react";
import Tilt from "react-parallax-tilt";
import {
  FaCrown,
  FaUserTie,
  FaCoins,
  FaFeatherAlt,
  FaUsers,
  FaHeart, // Added for a touch of empathy/care
  FaHandHoldingHeart, // Another option for leadership/care icon
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const committee = [
  {
    name: "Bharat Vasudeo Gidwani",
    role: "President",
    icon: <FaCrown />,
    description:
      "Leading with vision and unwavering dedication to our mission.",
  },
  {
    name: "Sonia Dnyanesh Narhare",
    role: "Vice President",
    icon: <FaUserTie />,
    description:
      "Driving strategic initiatives and fostering community engagement.",
  },
  {
    name: "Kishore Vasudeo Gidwani",
    role: "Treasurer",
    icon: <FaCoins />,
    description:
      "Ensuring financial integrity and sustainable growth for the Ashram.",
  },
  {
    name: "Bina Vasudeo Gidwani",
    role: "Secretary",
    icon: <FaFeatherAlt />,
    description:
      "Orchestrating operations and championing effective communication.",
  },
  {
    name: "Sunito Bharat Gidwani",
    role: "Member",
    icon: <FaUsers />,
    description:
      "A vital voice contributing to the well-being of every animal.",
  },
  {
    name: "Bhokre Suhas Nagesh",
    role: "Member",
    icon: <FaUsers />,
    description:
      "Dedicated to the welfare of animals, supporting our core values.",
  },
  {
    name: "Karuna Shyam Bajaj",
    role: "Member",
    icon: <FaUsers />,
    description:
      "Bringing compassion and practical support to our daily operations.",
  },
  {
    name: "Suryanarayan Chembrollu Shastri",
    role: "Member",
    icon: <FaUsers />,
    description: "Providing invaluable insights and commitment to animal care.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Slightly faster stagger
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Cards will slide up
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80, // Slightly more rigid spring
      damping: 12,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5, // Slight lift on hover
    scale: 1.02, // Slight scale on hover
    boxShadow: "0 15px 30px rgba(255,193,7,0.3)", // More pronounced shadow on hover
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const ManagingCommittee = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-200 py-16">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About | Prani Seva Ashram</title>
        <meta
          name="description"
          content="Meet the compassionate and dedicated managing committee of Prani Seva Ashram, tirelessly working for animal welfare and our community."
        />
        <meta
          name="keywords"
          content="managing committee, leadership, animal welfare, Prani Seva Ashram, team, founders, nonprofit, compassionate leaders, animal rescue, India"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <meta property="og:title" content="Our Leaders | Prani Seva Ashram" />
        <meta
          property="og:description"
          content="Discover the dedicated individuals who guide Prani Seva Ashram's mission in animal care and compassion."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-image.jpg" // Update with your actual OG image
        />
        <meta
          property="og:url"
          content="https://yourdomain.com/committee" // Update with your actual URL
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Leaders | Prani Seva Ashram" />
        <meta
          name="twitter:description"
          content="Meet the heart of Prani Seva Ashram – our passionate leadership team."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-image.jpg" // Update with your actual Twitter image
        />
        <link rel="canonical" href="https://yourdomain.com/committee" />{" "}
        {/* Update with your actual URL */}
      </Helmet>

      {/* Hero Section for Committee */}
      <div className="text-center mb-16 px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-amber-800 mb-4 tracking-tight leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Our Guiding Lights
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Meet the dedicated individuals who form the backbone of Prani Seva
          Ashram. Their unwavering commitment, expertise, and compassion drive
          our mission to care for and protect animals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-6xl text-amber-600 animate-pulse"
        >
          <FaHandHoldingHeart /> {/* Changed icon to FaHandHoldingHeart */}
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Changed to once: true for initial animation only
      >
        {committee.map((member, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            whileHover="hover" // Apply hover animation from cardVariants
            className="group" // Added group for group-hover effects if needed later
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.2}
              glareColor="#ffd700"
              glarePosition="all"
              tiltMaxAngleX={8} // Slightly less tilt for a smoother feel
              tiltMaxAngleY={8}
              perspective={1000} // Add perspective for better 3D effect
              transitionSpeed={1500} // Smoother transition for tilt
              scale={1.0} // Ensure it doesn't scale on tilt itself
              className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <div
                className="relative bg-white/80 backdrop-blur-sm p-8 text-center flex flex-col items-center justify-center h-full border border-amber-100 rounded-2xl"
                aria-label={`Profile of ${member.name}, ${member.role}`}
              >
                {/* Member Icon Section - Now larger and more prominent */}
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-400 text-white text-5xl mb-5 shadow-lg">
                  {member.icon}
                </div>

                {/* Member Name and Role */}
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-md font-semibold text-amber-700 uppercase tracking-wide">
                  {member.role}
                </p>

                {/* Member Description (Optional but recommended for storytelling) */}
                {member.description && (
                  <p className="text-sm text-gray-600 mt-3 italic max-w-[250px]">
                    "{member.description}"
                  </p>
                )}

                {/* Subtle decorative element for the card */}
                <div className="absolute bottom-4 left-4 text-amber-300 opacity-20 text-4xl">
                  {member.icon}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ManagingCommittee;
