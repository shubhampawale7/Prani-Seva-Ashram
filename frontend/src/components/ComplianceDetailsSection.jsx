import { motion } from "framer-motion";
import { FaBalanceScale, FaHandshake, FaShieldAlt } from "react-icons/fa";
import Tilt from "react-parallax-tilt"; // Import Tilt

const ComplianceDetailsSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
    },
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-28 bg-gradient-to-br from-white to-amber-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-amber-700 mb-8 leading-tight drop-shadow-sm "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          Our Pillars of Trust & Accountability
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-16 text-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Beyond just fulfilling legal requirements, our commitment to
          compliance is deeply woven into the fabric of Prani Seva Ashram. It
          reflects our unwavering dedication to ethical conduct, transparency,
          and responsible stewardship of every resource entrusted to us.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1: Ethical Governance */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            // Apply delay to individual motion.div directly
            transition={{ ...itemVariants.visible.transition, delay: 0.3 }}
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
              className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center text-start group h-full justify-between"
            >
              <div className="p-4 rounded-full bg-amber-50 text-amber-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaBalanceScale className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4 leading-snug">
                Ethical Governance
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                Our operations are guided by a strong moral compass and
                stringent governance practices. We ensure that every decision
                aligns with our mission of compassionate animal welfare and the
                highest standards of organizational integrity. This commitment
                forms the bedrock of our trustworthy reputation.
              </p>
            </Tilt>
          </motion.div>

          {/* Card 2: Transparent Operations */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...itemVariants.visible.transition, delay: 0.5 }}
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
              className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center text-start group h-full justify-between"
            >
              <div className="p-4 rounded-full bg-amber-50 text-amber-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaHandshake className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4 leading-snug">
                Transparent Operations
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                We believe in complete transparency in our financial dealings
                and project impacts. Our public records, annual reports, and
                government registrations are readily accessible, providing our
                donors and partners with full visibility into how their
                contributions are utilized to save and protect animals.
              </p>
            </Tilt>
          </motion.div>

          {/* Card 3: Donor Confidence */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...itemVariants.visible.transition, delay: 0.7 }}
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
              className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center text-start group h-full justify-between"
            >
              <div className="p-4 rounded-full bg-amber-50 text-amber-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-md">
                <FaShieldAlt className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4 leading-snug">
                Donor Confidence
              </h3>
              <p className="text-gray-700 leading-relaxed text-base flex-grow">
                Your trust is paramount. Our adherence to all governmental
                norms, including 80G and 12A tax exemptions, not only offers
                financial benefits but also assures you that your support is
                channeled through a legally sound and reputable organization.
                Every rupee you donate fuels real change.
              </p>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceDetailsSection;
