// src/pages/FAQs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Centralized dynamic data for links and contact info
const appRoutes = {
  contact: "/contact",
  donate: "/donate",
  volunteer: "/volunteer",
  aboutUs: "/about-us",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
};

const contactInfo = {
  address: "135-B, B.A. Chowk, Pune - 411001, Maharashtra, India",
  googleMapsLink: "https://maps.app.goo.gl/YourActualGoogleMapsLinkHere", // Replace with actual Google Maps link
  phone: "+91 98765 43210", // Example phone number
  email: "info@pranisevaashram.org", // Example email
};

const faqData = [
  {
    category: "About Prani Seva Ashram",
    questions: [
      {
        q: "What is Prani Seva Ashram?",
        a: "Prani Seva Ashram is a non-profit organization dedicated to the welfare, rescue, and rehabilitation of abandoned, injured, and neglected animals in Pune, India. We strive to provide a safe haven and find loving homes for all animals.",
      },
      {
        q: "Where is Prani Seva Ashram located?",
        a: (
          <>
            We are located at **{contactInfo.address}**. You can find our exact
            location and directions on our{" "}
            <Link
              to={appRoutes.contact}
              className="text-orange-500 hover:underline"
            >
              Contact Us
            </Link>{" "}
            page or view our location on{" "}
            <a
              href={contactInfo.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Google Maps
            </a>
            .
          </>
        ),
      },

      {
        q: "What are your operating hours?",
        a: `Our ashram is generally open for visitors and inquiries from 10:00 AM to 6:00 PM, Monday to Saturday. For emergencies, please call us immediately at **${contactInfo.phone}**.`,
      },
      {
        q: "How can I visit Prani Seva Ashram?",
        a: (
          <>
            Visitors are welcome during our operating hours. We encourage you to{" "}
            <Link
              to={appRoutes.contact}
              className="text-orange-500 hover:underline"
            >
              contact us
            </Link>{" "}
            in advance to schedule your visit and ensure staff availability for
            a guided tour.
          </>
        ),
      },
    ],
  },
  {
    category: "Donations & Support",
    questions: [
      {
        q: "How can I donate to Prani Seva Ashram?",
        a: (
          <>
            You can donate securely online via our{" "}
            <Link
              to={appRoutes.donate}
              className="text-orange-500 hover:underline"
            >
              Donate
            </Link>{" "}
            page using various payment methods. We also accept in-kind donations
            of food, blankets, and medical supplies. Details are on the donation
            page.
          </>
        ),
      },
      {
        q: "Are my donations tax-deductible?",
        a: "Yes, Prani Seva Ashram is a registered non-profit organization, and all donations are tax-deductible under Section 80G of the Income Tax Act in India. You will receive a receipt for your contribution.",
      },
      {
        q: "Can I sponsor an animal?",
        a: "Yes, our sponsorship program allows you to contribute directly to the care of a specific animal at our ashram. This helps cover their food, medical, and shelter needs. More information can be found on our Donate page.",
      },
      {
        q: "What other ways can I support Prani Seva Ashram?",
        a: (
          <>
            Beyond financial donations, you can support us by volunteering your
            time, fostering animals, spreading awareness about our mission, or
            donating essential supplies.
          </>
        ),
      },
    ],
  },
  {
    category: "Volunteering & Community Involvement",
    questions: [
      {
        q: "How can I become a volunteer?",
        a: (
          <>
            We welcome volunteers who are passionate about animal welfare! You
            can find details about volunteer opportunities and fill out an
            application form on our page.
          </>
        ),
      },
      {
        q: "What kind of tasks do volunteers perform?",
        a: "Volunteers assist with a variety of tasks, including animal feeding, cleaning kennels, assisting with adoption events, administrative tasks, and promoting our mission online and offline.",
      },
      {
        q: "Do you offer educational programs or workshops?",
        a: "Yes, we occasionally host educational workshops and awareness programs for schools, colleges, and the general public to promote responsible pet ownership and animal welfare. Please check our social media or contact us for upcoming events.",
      },
      {
        q: "Can I foster an animal through your program?",
        a: (
          <>
            Yes, we have a fostering program! Fostering provides a temporary
            loving home for animals preparing for adoption. If you're interested
            in fostering, please visit or section or contact us for more
            details.
          </>
        ),
      },
    ],
  },
  {
    category: "General Inquiries",
    questions: [
      {
        q: "How do I report an injured or abandoned animal?",
        a: `If you encounter an injured or abandoned animal in Pune, please contact our rescue hotline immediately at +91-9225633029 Provide us with the exact location and details of the animal's condition.`,
      },
      {
        q: "What is your policy on euthanasia?",
        a: "Prani Seva Ashram is a no-kill shelter. Euthanasia is only considered in cases of extreme suffering where a veterinarian determines there is no hope for recovery, or when an animal poses an unavoidable danger to others. This decision is always made with the utmost care and compassion.",
      },
      {
        q: "Do you provide veterinary services to the public?",
        a: "Currently, our veterinary services are primarily for the animals under our direct care. However, we can provide recommendations for local veterinarians if you need assistance with your own pet.",
      },
      {
        q: "How can I stay updated with Prani Seva Ashram's activities?",
        a: "You can follow us on our social media channels (Facebook, Instagram, etc.), subscribe to our newsletter via our website, or regularly check our 'News & Events' section for the latest updates and success stories.",
      },
      {
        q: "What is your privacy policy?",
        a: (
          <>
            You can read our full privacy policy detailing how we handle your
            data and protect your information on our{" "}
            <Link
              to={appRoutes.privacyPolicy}
              className="text-orange-500 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            page.
          </>
        ),
      },
      {
        q: "What are your terms of service?",
        a: (
          <>
            Our terms of service outline the rules and guidelines for using our
            website and services. You can review them on our{" "}
            <Link
              to={appRoutes.termsOfService}
              className="text-orange-500 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            page.
          </>
        ),
      },
    ],
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "#FFFBF0" : "#FFFFFF" }}
      className="border border-amber-200 rounded-lg shadow-sm mb-4 overflow-hidden transform transition-all duration-300 hover:shadow-md"
    >
      <button
        className="w-full text-left p-5 flex justify-between items-center bg-amber-50 hover:bg-amber-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-amber-900 leading-relaxed">
          {question}
        </span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-amber-700 text-xl" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-5 pb-5 text-gray-700 border-t border-amber-100 pt-3"
          >
            <p className="leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs = () => {
  return (
    <>
      <Helmet>
        <title>
          Frequently Asked Questions (FAQs) | Prani Seva Ashram - Animal Welfare
          Pune
        </title>
        <meta
          name="description"
          content="Find answers to common questions about Prani Seva Ashram, our animal rescue and rehabilitation efforts, donations, volunteering, and more. Your guide to supporting animal welfare in Pune."
        />
        <meta
          name="keywords"
          content="FAQ, Prani Seva Ashram, animal rescue, animal welfare, Pune, India, animal shelter, donate, volunteer, animal care, frequently asked questions"
        />
        <link rel="canonical" href="https://www.yourwebsite.com/faqs" />
        <meta
          property="og:title"
          content="Frequently Asked Questions (FAQs) | Prani Seva Ashram"
        />
        <meta
          property="og:description"
          content="Find answers to common questions about Prani Seva Ashram, our animal rescue and rehabilitation efforts, donations, volunteering, and more. Your guide to supporting animal welfare in Pune."
        />
        <meta property="og:url" content="https://www.yourwebsite.com/faqs" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.yourwebsite.com/images/og-image-faqs.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Frequently Asked Questions (FAQs) | Prani Seva Ashram"
        />
        <meta
          name="twitter:description"
          content="Find answers to common questions about Prani Seva Ashram, our animal rescue and rehabilitation efforts, donations, volunteering, and more. Your guide to supporting animal welfare in Pune."
        />
        <meta
          name="twitter:image"
          content="https://www.yourwebsite.com/images/twitter-image-faqs.jpg"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-amber-800 text-center mb-12 drop-shadow-sm"
        >
          <span className="block">Your Questions, Answered</span>
          <span className="block text-xl font-normal text-amber-600 mt-2">
            Everything you need to know about Prani Seva Ashram
          </span>
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          {faqData.map((category, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="mb-10 p-6 bg-amber-50 rounded-xl shadow-lg"
            >
              <h2 className="text-4xl font-bold text-amber-700 mb-7 text-center md:text-left border-b-2 border-amber-300 pb-3">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="text-center mt-16 text-xl text-gray-700 p-6 bg-amber-50 rounded-xl shadow-inner">
          <p className="mb-4 font-medium">
            Still have questions or need more personalized assistance?
          </p>
          <Link
            to={appRoutes.contact}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <span className="mr-2">Reach Out to Us Directly</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FAQs;
