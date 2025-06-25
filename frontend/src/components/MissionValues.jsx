import React from "react";
import { Parallax } from "react-scroll-parallax";
import { FiHeart, FiUserCheck, FiUsers } from "react-icons/fi";

const MissionValues = () => {
  const values = [
    {
      icon: <FiHeart size={32} aria-hidden="true" className="text-rose-500" />,
      title: "Compassion First",
      desc: "Every action is rooted in kindness and love for animals.",
    },
    {
      icon: (
        <FiUserCheck size={32} aria-hidden="true" className="text-rose-500" />
      ),
      title: "Hands-on Rescued and Home",
      desc: "We go to the streets, treat the injured, and provide shelter.",
    },
    {
      icon: <FiUsers size={32} aria-hidden="true" className="text-rose-500" />,
      title: "Community Powered",
      desc: "Our strength comes from people who care deeply.",
    },
  ];

  return (
    <Parallax speed={-10}>
      <div className="bg-amber-50 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-amber-600 mb-4">
          Our Mission & Values
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          At the heart of Prani Seva Ashram lies a commitment to unconditional
          care. We strive to rescue abandoned and injured dogs, nurture them
          back to health, and offer a life filled with dignity and love. Our
          values are guided by empathy, ethical responsibility, and a strong
          sense of community involvement.
        </p>
        <div className="grid sm:grid-cols-3 gap-8 mt-12">
          {values.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Parallax>
  );
};

export default MissionValues;
