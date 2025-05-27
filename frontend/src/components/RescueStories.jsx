import React from "react";

const RescueStories = () => {
  const stories = [
    {
      title: "Bruno's Comeback",
      desc: "Left abandoned with a fractured leg, Bruno was rescued and treated by our team. Today, he's a lively, happy dog living with a loving family.",
    },
    {
      title: "Maya's Journey",
      desc: "Maya was found injured and starving. After weeks of care, she’s now a therapy dog bringing joy to children in schools.",
    },
  ];

  return (
    <div className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-amber-600 mb-8">
        Rescue Stories That Inspire 🐶
      </h2>
      <div className="grid sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {stories.map((story, i) => (
          <article
            key={i}
            className="p-6 bg-amber-50 rounded-xl shadow-md"
            aria-labelledby={`story-title-${i}`}
          >
            <h3
              id={`story-title-${i}`}
              className="text-xl font-semibold text-rose-600 mb-2"
            >
              {story.title}
            </h3>
            <p className="text-gray-700">{story.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RescueStories;
