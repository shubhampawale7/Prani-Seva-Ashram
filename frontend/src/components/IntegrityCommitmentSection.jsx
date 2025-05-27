import { motion } from "framer-motion";
import { FaClipboardCheck, FaRegLightbulb, FaChartLine } from "react-icons/fa";
import Tilt from "react-parallax-tilt"; // Import Tilt

const IntegrityCommitmentSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-28 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-green-700 mb-8 leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          Beyond Regulations: Our Commitment to Integrity
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-16 text-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          At Prani Seva Ashram, compliance isn't merely a checklist; it's a
          testament to our core values. We proactively embrace rigorous
          standards to ensure that every facet of our animal welfare work is
          conducted with the utmost honesty, efficiency, and dedication.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1: Proactive Adherence */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...cardVariants.visible.transition, delay: 0.3 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              transitionSpeed={2000}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.45}
              glareColor="#ffffff"
              glarePosition="all"
              className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 flex flex-col items-start text-left group h-full"
            >
              <div className="p-4 rounded-full bg-green-50 text-green-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaClipboardCheck className="text-5xl" />{" "}
                {/* Increased icon size */}
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 leading-snug">
                Proactive Adherence
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                We consistently monitor and update our practices to exceed legal
                requirements and industry best standards. This proactive
                approach ensures continuous improvement and safeguards our
                operations against any unforeseen challenges, allowing us to
                focus on our mission without hindrance.
              </p>
            </Tilt>
          </motion.div>

          {/* Feature 2: Building Public Trust */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...cardVariants.visible.transition, delay: 0.5 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              transitionSpeed={2000}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.45}
              glareColor="#ffffff"
              glarePosition="all"
              className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 flex flex-col items-start text-left group h-full"
            >
              <div className="p-4 rounded-full bg-green-50 text-green-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaRegLightbulb className="text-5xl" />{" "}
                {/* Increased icon size */}
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 leading-snug">
                Building Public Trust
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                Trust is earned through consistent action. By openly sharing our
                government registrations and audit reports, we empower the
                public to verify our legitimacy and the efficacy of our
                programs. This open-book policy fosters deep confidence among
                individuals and organizations alike.
              </p>
            </Tilt>
          </motion.div>

          {/* Feature 3: Sustainable Impact */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...cardVariants.visible.transition, delay: 0.7 }}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              transitionSpeed={2000}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.45}
              glareColor="#ffffff"
              glarePosition="all"
              className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 flex flex-col items-start text-left group h-full"
            >
              <div className="p-4 rounded-full bg-green-50 text-green-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaChartLine className="text-5xl" /> {/* Increased icon size */}
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 leading-snug">
                Sustainable Impact
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                Our robust compliance framework ensures the long-term
                sustainability of our efforts. By operating within all legal and
                ethical boundaries, we secure the future of our animal welfare
                initiatives, guaranteeing that Prani Seva Ashram remains a
                reliable force for good for years to come.
              </p>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrityCommitmentSection;
