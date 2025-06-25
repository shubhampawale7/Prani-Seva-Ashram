import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import bharatGidwani from "../assets/images/homehero.jpg"; // Adjust path if your image is elsewhere
import AnimatedCard from "../components/AnimatedCard"; // Import AnimatedCard

const OurStorySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-2"
    >
      <AnimatedCard
        animation={{
          from: { x: -60, opacity: 0 },
          to: { x: 0, opacity: 1 },
        }}
        className="bg-white p-8 rounded-3xl shadow-2xl border-l-[6px] border-amber-400 flex flex-col-reverse md:flex-row items-start gap-8 "
      >
        {/* Story Content */}
        <div className="flex-1 text-gray-700 leading-relaxed text-base sm:text-lg">
          <h2 className="text-3xl font-semibold text-amber-600 mb-4">
            Our Story
          </h2>
          <p className="mb-4">
            Prani Seva Ashram was founded by <strong>Mr. Bharat Gidwani</strong>
            , an Industrial Engineer, research scholar, and a passionate
            innovator dedicated to improving the quality of life for both people
            and animals. Throughout his career, Mr. Gidwani has developed
            groundbreaking products designed to uplift the common man, with
            special emphasis on green and eco-friendly products, always striving
            to make meaningful contributions to society. However, his most
            profound innovation may not be technological—it is the creation of a
            haven for the voiceless animals in need.
          </p>
          <p className="mb-4">
            His journey toward animal welfare began unexpectedly, yet fatefully,
            on a quiet street where a bruised, abandoned puppy lay, suffering in
            pain, unnoticed by passersby.{" "}
            <strong>
              Something in that moment sparked a deep sense of responsibility
            </strong>{" "}
            —he couldn't turn away. With care and determination, he rescued the
            puppy, nurtured it back to health, and realized the overwhelming
            need for a safe space where injured, neglected, and homeless animals
            could receive love and protection. From that single act of
            compassion, Prani Seva Ashram was born—a sanctuary that now shelters
            over 60 rescued animals, offering them medical aid, food, and a
            second chance at life.
          </p>
          <p className="mb-4">
            Mr. Gidwani’s vision extends beyond rescue; his mission is
            <strong> systemic change,</strong> advocating for animal welfare,
            promoting ethical treatment, and creating a compassionate ecosystem
            where animals are not just saved but cherished.
          </p>
          <p className="mb-4">
            Today,{" "}
            <strong>
              Prani Seva Ashram stands as a testament to how one act of kindness
              can ignite a movement,
            </strong>{" "}
            proving that innovation isn't only about inventions—it’s also about{" "}
            <strong>
              humanity, responsibility, and the courage to make a difference.{" "}
            </strong>{" "}
          </p>
          <p>
            Through corporate partnerships and community support, the shelter
            aims to expand its outreach, enhance facilities, and ensure that no
            animal is left behind. With <strong> your support, </strong> this
            dream can grow into a movement where{" "}
            <strong>compassion becomes action.</strong>
          </p>
        </div>

        {/* Circular Image on the right side - now clickable */}
        <div
          className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative md:ml-8 mt-4 md:mt-0 cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={bharatGidwani}
            alt="Bharat Gidwani, Founder of Prani Seva Ashram (Click to enlarge)"
            className="rounded-full object-cover w-full h-full shadow-lg border-4 border-white ring-2 ring-amber-300 transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </AnimatedCard>

      {/* Circular Modal Component */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-[85vw] h-[85vw] sm:w-[500px] sm:h-[500px] rounded-full overflow-hidden shadow-2xl border-8 border-white ring-4 ring-amber-400"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={bharatGidwani}
                alt="Bharat Gidwani in full view"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OurStorySection;
