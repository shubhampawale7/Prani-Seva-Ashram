/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { Helmet } from "react-helmet-async"; //
import TeamMember from "../components/TeamMember";
import OurStorySection from "../components/OurStorySection";
import OurVisionSection from "../components/OurVisionSection";
import OurMissionSection from "../components/OurMissionSection";

// AnimatedCard component remains the same
const AnimatedCard = ({ children, animation, className = "" }) => {
  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && ref.current) {
      gsap.fromTo(ref.current, animation.from, {
        ...animation.to,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [inView]);
  return (
    <div
      ref={(el) => {
        ref.current = el;
        inViewRef(el);
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const About = () => {
  // Define base URL for canonical and image paths (IMPORTANT: Update this to your live domain)
  const baseURL = "https://www.pranisevaashram.org";

  return (
    <section className="relative bg-amber-50 min-h-screen py-20 px-6 lg:px-24 overflow-hidden">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Prani Seva Ashram | Our Story, Mission & Vision</title>
        <meta
          name="description"
          content="Learn about Prani Seva Ashram's inspiring journey, our dedicated mission to rescue and rehabilitate animals, and our vision for a compassionate world, founded by Mr. Bharat Gidwani."
        />
        <meta
          name="keywords"
          content="Prani Seva Ashram, animal welfare NGO, animal rescue Pune, dog shelter India, Bharat Gidwani, animal sanctuary, our mission, our vision, animal rehabilitation, pet care charity"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <link rel="canonical" href={`${baseURL}/about`} />
        <meta name="robots" content="index, follow" />{" "}
        {/* Explicitly ensure indexing */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph / Social Media Meta Tags */}
        <meta
          property="og:title"
          content="About Prani Seva Ashram | Our Story, Mission & Vision"
        />
        <meta
          property="og:description"
          content="Discover Prani Seva Ashram's roots in compassion, our commitment to animal welfare, and our vision for a future where every animal thrives."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseURL}/about`} />
        <meta
          property="og:image"
          content={`${baseURL}/assets/images/og-about-image.jpg`}
        />{" "}
        {/* Recommended: Specific image for About page */}
        <meta
          property="og:image:alt"
          content="Mr. Bharat Gidwani with a rescued dog, symbolizing Prani Seva Ashram's compassion"
        />
        <meta property="og:site_name" content="Prani Seva Ashram" />
        <meta property="og:locale" content="en_IN" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Prani Seva Ashram | Story, Mission, Vision"
        />
        <meta
          name="twitter:description"
          content="Explore the impactful journey of Prani Seva Ashram and its dedication to rescuing and restoring hope for voiceless animals."
        />
        <meta
          name="twitter:image"
          content={`${baseURL}/assets/images/twitter-about-image.jpg`}
        />{" "}
        {/* Recommended: Specific image for About page */}
        <meta
          name="twitter:image:alt"
          content="Prani Seva Ashram facility, clean and caring environment"
        />
        <meta name="twitter:site" content="@yourtwitterhandle" />{" "}
        {/* Replace with your actual Twitter handle */}
        {/* Structured Data (JSON-LD) - Organization Schema specific to About page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage", // More specific schema type for an about page
            name: "About Prani Seva Ashram",
            description:
              "Learn about Prani Seva Ashram's inspiring journey, our dedicated mission to rescue and rehabilitate animals, and our vision for a compassionate world, founded by Mr. Bharat Gidwani.",
            url: `${baseURL}/about`,
            mainEntity: {
              "@type": "Organization",
              name: "Prani Seva Ashram",
              url: baseURL,
              logo: `${baseURL}/assets/images/prani-seva-logo.png`, // Path to your organization's logo
              founder: {
                "@type": "Person",
                name: "Bharat Gidwani",
                jobTitle: "Founder",
                alumniOf: "Industrial Engineer", // Assuming this is relevant for his profile
                description:
                  "Industrial Engineer, research scholar, and passionate innovator dedicated to improving the quality of life for both people and animals, and founder of Prani Seva Ashram.",
              },
              slogan:
                "Your CSR: A Legacy of Compassion and Home for the Voiceless.",
              sameAs: [
                "https://www.facebook.com/pranisevaashram", // Your actual Facebook URL
                "https://www.instagram.com/pranisevaashram", // Your actual Instagram URL
                // Add other relevant social profiles if applicable
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "general inquiries",
                email: "info@pranisevaashram.org",
              },
            },
          })}
        </script>
      </Helmet>

      {/* Subtle background element - Ensure 'paw-pattern.png' exists in public folder */}
      <div className="absolute inset-0 bg-[url('/paw-pattern.png')] bg-repeat opacity-5 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 leading-tight">
            Prani Seva Ashram
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700">
            A Vision Born from Compassion
          </p>
        </motion.div>

        {/* About Card - Our Story */}

        <OurStorySection />

        {/* Mission Card */}
        <OurMissionSection />

        {/* Vision Card */}

        <OurVisionSection />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TeamMember />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
