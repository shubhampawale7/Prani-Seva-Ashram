import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const OurWorkPage = () => {
  return (
    <div className="bg-[#fefcf9] min-h-screen px-6 py-12 sm:px-12 lg:px-32 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-700 mb-6">
          Our Work
        </h1>
        <p className="text-lg sm:text-xl font-medium mb-10">
          <strong>Prani Seva Ashram:</strong> Rescuing Lives, Restoring Hope
        </p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-700 leading-relaxed text-lg mb-12"
        >
          At Prani Seva Ashram, we are dedicated to saving, protecting, and
          empowering the voiceless—providing abandoned and injured animals with
          rescue, medical care, rehabilitation, and a lifelong sanctuary. Our
          journey began with a single act of kindness and has since grown into a
          movement of compassion, ensuring every animal receives the dignity and
          love they deserve.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
        {[
          "Rescue & Emergency Intervention: Swift response for injured, sick, or abandoned animals, ensuring immediate medical aid and safe relocation.",
          "Animal Shelter & Rehabilitation: A secure, nurturing home for over 60 rescued animals, where they receive nutrition, medical treatment, and emotional care.",
          "Comprehensive Veterinary Support: On-call veterinary services, post-recovery rehabilitation, and lifelong care for rescued animals with special needs.",
          "Adoption & Foster Programs: Helping rescued animals find loving, permanent homes through responsible adoption initiatives.",
          "Corporate CSR Partnerships & Volunteer Programs: Empowering businesses to align with responsible social impact, integrating ethical giving and employee engagement into their CSR initiatives.",
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-start space-x-4 border-l-4 border-amber-600"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="text-amber-600 mt-1" />
            <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-amber-50 py-12 px-6 rounded-3xl max-w-6xl mx-auto text-center shadow-inner">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-700 mb-6">
          Why Partner With Us?
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
          Drive meaningful impact with certified CSR giving and make a lasting
          difference through ethical animal welfare.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {[
            [
              "Government-Certified & Fully Compliant",
              [
                "Registered NGO with official certifications",
                "CSR Registration & 80G / 12A tax exemptions",
                "E-Anudan Registered for government grants",
              ],
            ],
            [
              "Maximize CSR Impact While Ensuring Financial Benefits",
              [
                "Donations qualify for tax deductions",
                "Structured impact reporting",
                "Transparent and traceable investment",
              ],
            ],
            [
              "Align Your Brand with Meaningful Change",
              [
                "Support ethical animal welfare",
                "Engage employees via volunteer programs",
                "Boost ESG scores with social good",
              ],
            ],
          ].map(([heading, points], i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-amber-100"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold text-amber-600 mb-3">
                {heading}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-lg mt-12 font-semibold text-gray-800 max-w-3xl mx-auto">
          Join us in creating a future where kindness meets corporate
          responsibility, where every contribution strengthens your brand’s
          impact, and where compassion becomes a business imperative.
        </p>
      </div>
    </div>
  );
};

export default OurWorkPage;
