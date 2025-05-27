import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"; // Don't forget to import useState
import AnimatedCard from "../components/AnimatedCard"; // Import AnimatedCard

// You'll need an image for your mission. Replace this placeholder path.
// For example, you could use a heart icon, a paw print, or a globe.
import missionIcon from "../assets/images/early-shelter.jpg"; // <--- CHANGE THIS PATH AND IMAGE

const OurMissionSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <section className="bg-gradient-to-br from-rose-50 to-white py-16 sm:py-24 overflow-hidden">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <AnimatedCard
          animation={{
            from: { y: 60, opacity: 0 },
            to: { y: 0, opacity: 1 },
          }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-l-[8px] border-rose-500 relative overflow-hidden"
        >
          {/* Subtle decorative element in the top-right corner */}
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-rose-100 rounded-full opacity-60 blur-lg"></div>

          {/* Heading and Image Container */}
          <div className="flex items-center justify-between mb-6">
            {" "}
            {/* Use flex to align title and image */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-rose-700 leading-tight tracking-tight flex-1">
              Our Mission
            </h2>
            <div
              className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-4 border-white ring-2 ring-rose-300 ml-4 cursor-pointer group" // Circular image styling, clickable
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              <img
                src={missionIcon} // Your mission image
                alt="Mission icon representing compassion and care" // Descriptive alt text
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>

          {/* Mission Content */}
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            At Prani Seva Ashram, we believe that every life—human or
            animal—deserves dignity, care, and protection. Our mission is to{" "}
            <strong>
              rescue, rehabilitate, and provide a safe sanctuary for animals in
              need,
            </strong>
            ensuring they receive the medical care, nourishment, and love they
            deserve.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            Beyond rescue, we advocate for systemic change in animal welfare,
            promoting ethical treatment and responsible guardianship through
            awareness and community engagement. We strive to build a future
            where no animal suffers in silence, and where kindness transforms
            lives.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            With the support of compassionate individuals and corporate
            partners, we aim to{" "}
            <strong>
              expand our shelter, improve facilities, and strengthen our
              outreach,{" "}
            </strong>{" "}
            creating a world where every animal finds safety and every act of
            generosity leaves a lasting impact.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Together, let’s turn compassion into action and make a
            difference—one life at a time.
          </p>
        </AnimatedCard>
      </motion.div>

      {/* Circular Modal Component for Mission Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)} // Click outside to close
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-[85vw] h-[85vw] sm:w-[500px] sm:h-[500px] rounded-full overflow-hidden shadow-2xl border-8 border-white ring-4 ring-rose-400" // Rose accent for modal border
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
              <img
                src={missionIcon} // Your mission image for the modal
                alt="Enlarged view of mission icon"
                className="object-cover w-full h-full" // Image fills the circular modal
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurMissionSection;
