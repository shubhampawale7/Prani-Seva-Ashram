import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const quotes = [
  "Every abandoned animal has a story. Some were once loved, some never knew kindness. At Prani Seva Ashram, we rewrite their stories—giving them shelter, care, and hope. With your support, we can turn more tragedies into triumphs.",
  "In today's world, businesses thrive not only on profits but on purpose. By supporting Prani Seva Ashram, your organisation joins the movement toward ethical, responsible, and meaningful impact—creating a better world for animals while aligning with CSR goals.",
  "Meet Maya, a street dog left to fend for herself. Malnourished and scared, she found safety at Prani Seva Ashram. Today, she plays, thrives, and knows love. Maya is just one of many lives we've changed—with your partnership, we can save even more.",
  "Over 30,000 stray animals in Pune struggle for food and shelter every day. Many suffer from injury, disease, and neglect. Prani Seva Ashram is changing that—but we need partners like you to expand our impact. Together, let's build a future where no animal is left behind.",
  "Your support isn't just a donation—it's a legacy. It's a commitment to compassion, sustainability, and a better world. At Prani Seva Ashram, we invite you to become part of something bigger: a movement of care, kindness, and corporate responsibility.",
];

const closingQuotes = [
  "Every life we save is a step toward a kinder world. Your support can be the difference between suffering and safety. Join us in creating a future where every animal gets the care they deserve. Donate today—because compassion knows no boundaries.",
  "Every moment counts. Every donation makes a difference. Join Prani Seva Ashram today and be the reason an animal finds hope, health, and happiness. Together, we can create a legacy of kindness.",
  "Partnering with Prani Seva Ashram means investing in ethical impact, social responsibility, and compassionate change. Your organisation has the power to create lasting good. Let's build something extraordinary together—reach out today.",
  "With every act of kindness, we build a better world. Thank you for standing with us in this mission. Your support fuels our work, strengthens our shelter, and ensures that no animal is left behind. Let's continue this journey together!",
  "Change begins with us. It begins with you. Join hands with Prani Seva Ashram and be part of a movement that safeguards lives, fosters compassion, and builds a future where every animal thrives. The time to act is now!",
];

const PawIcon = () => (
  <svg
    className="w-7 h-7 text-coral-400 flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 14c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zM8.5 6.5C7.67 6.5 7 7.17 7 8s.67 1.5 1.5 1.5S10 8.83 10 8 9.33 6.5 8.5 6.5zm7 0C14.67 6.5 14 7.17 14 8s.67 1.5 1.5 1.5S17 8.83 17 8 16.33 6.5 15.5 6.5zM7 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm10 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
  </svg>
);

const OurImpactPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-coral-50 via-white to-teal-50 text-teal-900 font-sans py-16 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
      <Helmet>
        <title>Our Impact | Prani Seva Ashram</title>
        <meta
          name="description"
          content="Discover the real stories behind our rescue efforts at Prani Seva Ashram. Learn how your support brings hope, healing, and a better life for thousands of animals."
        />
      </Helmet>

      {/* Header Hero */}
      <motion.header
        className="max-w-3xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          Our{" "}
          <span className="text-coral-600 underline decoration-teal-400 decoration-4 underline-offset-8">
            Impact
          </span>
        </h1>
        <p className="text-lg md:text-xl text-teal-800/90 italic max-w-2xl mx-auto font-semibold">
          Prani Seva Ashram — A{" "}
          <span className="text-coral-600">Sanctuary of Hope</span> and
          Compassion where every life matters.
        </p>
      </motion.header>

      {/* Inspirational Quotes with icons, vertical timeline style */}
      <section className="max-w-4xl mx-auto relative before:absolute before:left-4 before:top-0 before:h-full before:w-1 before:rounded-full before:bg-teal-300">
        <ul className="space-y-10 relative z-10">
          {quotes.map((quote, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-6"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 60 }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-coral-400 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                  <PawIcon />
                </div>
                {idx !== quotes.length - 1 && (
                  <span className="block w-1 h-16 bg-teal-300 rounded mx-auto mt-1"></span>
                )}
              </div>
              <p className="text-lg leading-relaxed flex-grow text-teal-900">
                {quote}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Call to Action / Closing Quotes */}
      <section className="max-w-5xl mx-auto mt-24 bg-white rounded-3xl shadow-xl px-8 py-12 sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold text-coral-600 mb-10 text-center">
          Join Our Movement of Compassion
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {closingQuotes.map((quote, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl border border-teal-200 p-6 cursor-default select-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.15 + 0.3,
                type: "spring",
                stiffness: 50,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(236, 72, 153, 0.3)",
              }}
            >
              <div className="absolute top-3 right-3 opacity-10">
                <PawIcon />
              </div>
              <p className="text-teal-900 font-semibold text-base leading-relaxed flex items-start gap-3">
                <span className="text-coral-500 mt-1">
                  <PawIcon />
                </span>
                <span>{quote}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Divider */}
      <div className="max-w-4xl mx-auto mt-20 border-t-2 border-coral-300 opacity-30" />
    </main>
  );
};

export default OurImpactPage;
