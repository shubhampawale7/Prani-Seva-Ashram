import { FaCheckCircle, FaDonate } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "CSR Registration",
    description:
      "Enables corporate donations to align with CSR mandates, enhancing brand reputation and social impact.",
  },
  {
    title: "Income Tax Act Permissions (80G & 12A)",
    description:
      "Donations qualify for tax deductions, making philanthropic contributions financially viable.",
  },
  {
    title: "E-Anudan Registration",
    description:
      "Ensures eligibility for government grants and enhances operational transparency.",
  },
  {
    title: "Government Recognition",
    description:
      "Valid NGO certification to build trust among donors, corporate partners, and policy stakeholders.",
  },
];

const Compliance = () => {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-white text-gray-800 py-16 px-6 md:px-10 lg:px-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-700 mb-6 text-center">
          Government Registrations & Compliance
        </h1>

        <p className="text-lg text-center text-gray-700 mb-10 leading-relaxed">
          <strong>Prani Seva Ashram</strong> is a{" "}
          <span className="text-green-700 font-medium">
            registered and certified NGO
          </span>
          , ensuring <strong>transparency, credibility</strong>, and compliance
          in all our ethical animal welfare efforts.
        </p>

        <div className="grid gap-8">
          {features.map(({ title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-white border-l-8 border-green-500 shadow-md p-6 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <FaCheckCircle className="text-green-600 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-green-800">
                    {title}
                  </h3>
                  <p className="text-gray-700 mt-1">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 text-center text-base text-gray-700"
        >
          These registrations offer <strong>financial relief</strong> through
          tax exemptions and the satisfaction of{" "}
          <strong>supporting a noble cause</strong> in animal welfare.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/donate"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition"
          >
            <FaDonate className="text-xl" />
            Donate Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Compliance;
