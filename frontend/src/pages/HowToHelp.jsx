// src/pages/HowToHelp.jsx (or ReportAbuse.jsx if separate)
import React from "react";
import { motion } from "framer-motion";
import { MdCall, MdMail, MdWarning } from "react-icons/md";

const HowToHelp = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-amber-800 text-center mb-10"
      >
        How You Can Help
      </motion.h1>

      <section id="report-abuse" className="mb-12">
        <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center md:text-left">
          <MdWarning className="inline-block mr-3 text-red-500" />
          Report Animal Abuse
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg border border-red-100">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Witnessing animal abuse or neglect can be distressing, but your
            swift action can save a life. It's crucial to report cruelty
            promptly.
          </p>

          <h3 className="text-2xl font-semibold text-amber-800 mb-4">
            What Constitutes Abuse?
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Physical violence or harm</li>
            <li>Severe neglect (starvation, lack of water, no shelter)</li>
            <li>Abandonment of pets</li>
            <li>Illegal animal fighting</li>
            <li>Cruel handling or transport</li>
          </ul>

          <h3 className="text-2xl font-semibold text-amber-800 mb-4">
            Steps to Report Animal Cruelty:
          </h3>
          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3">
            <li>
              **Gather Information:**
              <ul className="list-disc list-inside ml-5 mt-1">
                <li>Exact location (address, landmarks)</li>
                <li>Date and time of incident</li>
                <li>Description of the animal(s) involved</li>
                <li>Details of the abuse (what you saw)</li>
                <li>Photos or videos (if safe to obtain)</li>
                <li>Any witness information</li>
              </ul>
            </li>
            <li>
              **Contact Local Authorities (Emergency Cases):**
              <p className="mt-2">
                For immediate danger or ongoing cruelty, contact:
              </p>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  <span className="font-semibold">Local Police:</span> Dial 100
                </li>
                <li>
                  <span className="font-semibold">
                    Local Animal Control / Municipal Corporation:
                  </span>{" "}
                  [Add specific local numbers if known]
                </li>
              </ul>
            </li>
            <li>
              **Contact Prani Seva Ashram:**
              <p className="mt-2">
                We can provide guidance, assess the situation, and sometimes
                intervene or coordinate with authorities. Please provide as much
                detail as possible.
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <MdCall className="text-orange-500" />
                  <a
                    href="tel:+919225633029"
                    className="text-amber-800 hover:underline font-semibold"
                  >
                    +91 92256 33029
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MdMail className="text-orange-500" />
                  <a
                    href="mailto:report@pranisevaashram.com"
                    className="text-amber-800 hover:underline"
                  >
                    report@pranisevaashram.com
                  </a>
                </li>
              </ul>
            </li>
            <li>
              **Follow Up:** Keep a record of who you spoke with and when.
              Persistence can be key.
            </li>
          </ol>

          <div className="bg-amber-50 p-6 rounded-lg text-amber-900 border border-amber-200">
            <h4 className="font-semibold text-lg mb-2">
              Important Safety Note:
            </h4>
            <p className="text-base">
              Never put yourself in danger. If an animal or perpetrator seems
              aggressive, observe from a safe distance and prioritize contacting
              authorities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToHelp;
