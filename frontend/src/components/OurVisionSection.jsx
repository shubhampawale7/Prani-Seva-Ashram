import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"; // Don't forget to import useState
import AnimatedCard from "../components/AnimatedCard"; // Import AnimatedCard

// You'll need an image for your vision. Replace this placeholder path.
// For example, you could use a lightbulb, a star, or a world icon.
import visionIcon from "../assets/images/mission-vision-bg.jpg"; // <--- CHANGE THIS PATH AND IMAGE

const OurVisionSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <section className="bg-gradient-to-br from-teal-50 to-white py-16 sm:py-24 overflow-hidden">
      <motion.div
        initial={{ y: 50, opacity: 0 }} // Subtle lift-in animation for the whole section
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" // Centralized and well-padded container
      >
        <AnimatedCard
          animation={{
            from: { x: 60, opacity: 0 }, // Card animation slides in from the right
            to: { x: 0, opacity: 1 },
          }}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-l-[8px] border-teal-500 relative overflow-hidden" // Enhanced card design with a prominent teal border
        >
          {/* Subtle decorative element in the bottom-left corner */}
          <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 bg-teal-100 rounded-full opacity-60 blur-lg"></div>

          {/* Heading and Image Container */}
          <div className="flex items-center justify-between mb-6">
            {" "}
            {/* Use flex to align title and image */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-700 leading-tight tracking-tight flex-1">
              Our Vision
            </h2>
            <div
              className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border-4 border-white ring-2 ring-teal-300 ml-4 cursor-pointer group" // Circular image styling, clickable
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              <img
                src={visionIcon} // Your vision image
                alt="Vision icon representing future and hope" // Descriptive alt text
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>

          {/* Vision Content */}
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            Prani Seva Ashram envisions a future where{" "}
            <strong>
              no animal suffers from neglect, cruelty, or abandonment
            </strong>{" "}
            —where every life is valued and cared for with dignity. Our goal is
            to create a <strong>thriving sanctuary</strong> that not only
            provides rescue and rehabilitation but also fosters a culture of
            compassion, awareness, and responsible guardianship.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            We aspire to be a beacon of hope, a model shelter that sets new
            standards for animal welfare through holistic care, ethical
            treatment, and sustainable solutions. Beyond individual rescues, we
            aim to influence communities, corporations, and policymakers to
            build a more humane world—one where kindness is a shared
            responsibility and every act{" "}
            <strong> of generosity strengthens the fabric of life. </strong>
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
            Through{" "}
            <strong>
              innovative initiatives, strategic partnerships, and unwavering
              dedication,
            </strong>{" "}
            Prani Seva Ashram seeks to expand its impact, ensuring that animals
            not only survive but truly thrive in an environment of love and
            protection.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            Together, let’s create a future where{" "}
            <strong>
              compassion is not just a choice—it is a way of life.
            </strong>
          </p>
        </AnimatedCard>
      </motion.div>

      {/* Circular Modal Component for Vision Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0   bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)} // Click outside to close
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-[85vw] h-[85vw] sm:w-[500px] sm:h-[500px] rounded-full overflow-hidden shadow-2xl border-8 border-white ring-4 ring-teal-400" // Teal accent for modal border
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
              <img
                src={visionIcon} // Your vision image for the modal
                alt="Enlarged view of vision icon"
                className="object-cover w-full h-full" // Image fills the circular modal
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurVisionSection;
