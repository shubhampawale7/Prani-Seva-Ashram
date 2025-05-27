import React from "react";
import { Helmet } from "react-helmet-async"; // Keep this import
import { ParallaxProvider } from "react-scroll-parallax"; // Parallax removed as it's not directly SEO relevant for the head
// Removed unused imports like PawPrint, HeartHandshake, Users, HelpingHand from 'lucide-react'
// Removed homehero image import as it's used within HeroSection, not directly here.

// Import your section components
import HeroSection from "../components/HeroSection";
import MissionValues from "../components/MissionValues";
import StatsSection from "../components/StatsSection";
import GetInvolved from "../components/GetInvolved";
import RescueStories from "../components/RescueStories";
import CallToAction from "../components/CallToAction";
import OurJourneyTimeline from "../components/OurJourneyTimeline";
import Testimonials from "../components/Testimonials";

const Home = () => {
  // Define base URL for canonical and image paths
  const baseURL = "https://www.pranisevaashram.org"; // **IMPORTANT: Replace with your actual live domain**

  return (
    <ParallaxProvider>
      <>
        <Helmet>
          {/* Primary Meta Tags */}
          <title>
            Prani Seva Ashram | Animal Rescue & Welfare in Pune, India
          </title>
          <meta
            name="description"
            content="Prani Seva Ashram is a leading non-profit in Pune, dedicated to rescuing, healing, and rehoming stray and injured animals. Join our mission of compassion."
          />
          <meta
            name="keywords"
            content="animal rescue Pune, dog shelter Pune, stray animal care, animal welfare India, Prani Seva Ashram, animal adoption Pune, donate to animal charity, volunteer animal care, animal rehabilitation, pet care Pune"
          />
          <meta name="author" content="Prani Seva Ashram" />
          <link rel="canonical" href={`${baseURL}/`} />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />{" "}
          {/* Explicitly tell crawlers to index and follow links */}
          {/* Open Graph / Social Media Meta Tags */}
          <meta
            property="og:title"
            content="Prani Seva Ashram | Animal Rescue & Welfare in Pune, India"
          />
          <meta
            property="og:description"
            content="Prani Seva Ashram is a leading non-profit in Pune, dedicated to rescuing, healing, and rehoming stray and injured animals. Join our mission of compassion."
          />
          <meta property="og:url" content={`${baseURL}/`} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`${baseURL}/assets/images/og-home-image.jpg`}
          />{" "}
          {/* Recommended: Use a compelling, specific OG image */}
          <meta
            property="og:image:alt"
            content="A rescued dog being cared for at Prani Seva Ashram"
          />{" "}
          {/* Alt text for OG image */}
          <meta property="og:site_name" content="Prani Seva Ashram" />
          <meta property="og:locale" content="en_IN" />{" "}
          {/* Specify locale for India */}
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Prani Seva Ashram | Animal Rescue & Welfare in Pune, India"
          />
          <meta
            name="twitter:description"
            content="Join Prani Seva Ashram in Pune to support animal rescue, rehabilitation, and compassionate care for voiceless animals."
          />
          <meta
            name="twitter:image"
            content={`${baseURL}/assets/images/twitter-home-image.jpg`}
          />{" "}
          {/* Recommended: Use a compelling, specific Twitter image */}
          <meta
            name="twitter:image:alt"
            content="A happy rescued animal from Prani Seva Ashram"
          />{" "}
          {/* Alt text for Twitter image */}
          <meta name="twitter:site" content="@yourtwitterhandle" />{" "}
          {/* If you have a Twitter handle */}
          {/* Structured Data (JSON-LD) - Enhanced for Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Prani Seva Ashram",
              url: baseURL,
              logo: `${baseURL}/assets/images/prani-seva-logo.png`, // Use your actual logo path
              description:
                "Prani Seva Ashram is a non-profit organization dedicated to rescuing, healing, and providing lifelong care to stray, injured, and abandoned animals in Pune, Maharashtra, India. We strive to create a sanctuary where every animal receives dignity, medical attention, and love, fostering a community of compassion.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "135-B, B.A. Chowk",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                postalCode: "411001",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-98765-43210", // Your contact number
                contactType: "Customer Service",
                email: "info@pranisevaashram.org", // Your contact email
                areaServed: "IN",
              },
              sameAs: [
                "https://www.facebook.com/pranisevaashram", // Replace with actual Facebook URL
                "https://www.instagram.com/pranisevaashram", // Replace with actual Instagram URL
                "https://www.youtube.com/pranisevaashram", // If applicable
                "https://twitter.com/pranisevaashram", // If applicable
                // Add other social media profiles here
              ],
            })}
          </script>
        </Helmet>

        <section className="bg-white text-gray-800">
          <HeroSection />
          <MissionValues />
          <StatsSection />
          <GetInvolved />
          <RescueStories />
          <CallToAction />
          <OurJourneyTimeline />
          <Testimonials />
        </section>
      </>
    </ParallaxProvider>
  );
};

export default Home;
