import React from "react";
import { motion } from "framer-motion";
import { MdCall, MdHealthAndSafety, MdLocationOn } from "react-icons/md";

const EmergencyRescue = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section
        id="emergency-rescue"
        className="mt-12 pt-8 border-t border-gray-200"
      >
        <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center md:text-left">
          <MdHealthAndSafety className="inline-block mr-3 text-green-500" />
          Emergency Animal Rescue
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg border border-green-100">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            If you encounter an animal in immediate distress – injured, trapped,
            or in danger – please act quickly and safely.
          </p>

          <h3 className="text-2xl font-semibold text-amber-800 mb-4">
            When to Call for Emergency Rescue:
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Road accidents (hit by vehicle)</li>
            <li>Severely injured or bleeding animals</li>
            <li>Animals trapped in wells, drains, or high places</li>
            <li>
              Orphaned or abandoned young animals (kittens, puppies, birds)
            </li>
            <li>Animals showing signs of severe illness or poisoning</li>
          </ul>

          <h3 className="text-2xl font-semibold text-amber-800 mb-4">
            Your Role in an Emergency:
          </h3>
          <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-3">
            <li>
              **Ensure Safety:** Prioritize your safety first. Do not approach
              aggressive, large, or wild animals.
            </li>
            <li>
              **Observe and Gather Info:** From a safe distance, note:
              <ul className="list-disc list-inside ml-5 mt-1">
                <li>
                  Precise location (
                  <MdLocationOn className="inline-block text-gray-600" /> exact
                  address/landmarks)
                </li>
                <li>Type of animal (dog, cat, bird, etc.)</li>
                <li>Nature of injury or distress</li>
                <li>Any immediate dangers (traffic, other animals)</li>
              </ul>
            </li>
            <li>
              **Call Our Emergency Hotline:**
              <p className="mt-2 text-center text-2xl font-extrabold text-orange-600">
                <MdCall className="inline-block mr-3" />
                <a href="tel:+919225633029" className="hover:underline">
                  +91 92256 33029
                </a>
              </p>
              <p className="text-center text-gray-600 text-base">
                (Available 24/7 for urgent animal rescues)
              </p>
            </li>
            <li>
              **Other Contacts (if unavailable):**
              <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                <li>
                  <span className="font-semibold">
                    Local Veterinary Clinics:
                  </span>{" "}
                  [List known 24/7 clinics in Pune if applicable]
                </li>
                <li>
                  <span className="font-semibold">
                    Forest Department (for wildlife):
                  </span>{" "}
                  [Contact for local Pune Forest Dept]
                </li>
                <li>
                  <span className="font-semibold">
                    Fire Department (for specific entrapments):
                  </span>{" "}
                  Dial 101
                </li>
              </ul>
            </li>
            <li>
              **Stay with the Animal (if safe):** If you can safely wait, stay
              near the animal until help arrives, ensuring no further harm comes
              to it.
            </li>
          </ol>

          <div className="bg-amber-50 p-6 rounded-lg text-amber-900 border border-amber-200">
            <h4 className="font-semibold text-lg mb-2">Remember:</h4>
            <p className="text-base">
              Your quick and responsible action can make all the difference to
              an animal in need.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyRescue;
