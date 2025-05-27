import React from "react";
import { Parallax } from "react-scroll-parallax"; // or your Parallax source

const GetInvolved = () => {
  const involvementSteps = [
    {
      title: "Volunteer",
      desc: "Walk dogs, feed them, clean kennels, or just give them love and time.",
    },
    {
      title: "Sponsor Treatments",
      desc: "Sponsor vaccinations, surgeries, or rehabilitation programs.",
    },
    {
      title: "Corporate Partnerships",
      desc: "Let your CSR efforts create lasting change through ethical collaborations.",
    },
  ];

  return (
    <Parallax speed={5}>
      <div className="py-20 px-6 bg-amber-50 text-center">
        <h2 className="text-3xl font-bold text-rose-500 mb-10">
          How You Can Get Involved
        </h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {involvementSteps.map((step, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md text-left"
            >
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Parallax>
  );
};

export default GetInvolved;
