import React from "react";
import {
  CheckCircle,
  Heart,
  Handshake,
  Shield,
  Bone,
  PawPrint,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ourWorkHero from "../assets/images/ourwork-hero.jpg"; // Assuming this path is correct

const OurWorkPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Our Work | Prani Seva Ashram - Animal Rescue, Rehabilitation & CSR
          Partnerships
        </title>
        <meta
          name="description"
          content="Discover Prani Seva Ashram's core work: animal rescue, rehabilitation, veterinary care, and adoption. Learn how our CSR partnerships and volunteer programs make a lasting impact on animal welfare in India."
        />
        <meta
          name="keywords"
          content="animal rescue NGO, dog shelter India, animal welfare charity, CSR animal welfare, veterinary support for animals, animal adoption programs, volunteer animal care, Prani Seva Ashram, abandoned animals, injured animals, ethical giving, tax exemption 80G 12A, E-Anudan registration, ESG ratings"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <link rel="canonical" href="https://www.praniseva.org/our-work" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Our Work | Prani Seva Ashram - Animal Rescue, Rehabilitation & CSR Partnerships"
        />
        <meta
          property="og:description"
          content="Learn about Prani Seva Ashram's rescue missions, rehabilitation, veterinary care, adoption initiatives, and CSR partnerships for sustainable animal welfare."
        />
        <meta property="og:url" content="https://www.praniseva.org/our-work" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.praniseva.org/assets/images/ourwork-hero.jpg" // Ensure this image is high-quality and descriptive
        />
        <meta
          property="og:image:alt"
          content="Hero image showing an animal being cared for at Prani Seva Ashram"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Our Work | Prani Seva Ashram - Animal Welfare NGO"
        />
        <meta
          name="twitter:description"
          content="Discover how Prani Seva Ashram rescues, rehabilitates, and cares for abandoned animals. Explore our CSR partnership opportunities for impactful giving."
        />
        <meta
          name="twitter:image"
          content="https://www.praniseva.org/assets/images/ourwork-hero.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Hero image showing an animal being cared for at Prani Seva Ashram"
        />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Our Work at Prani Seva Ashram",
            description:
              "Prani Seva Ashram is dedicated to rescuing, rehabilitating, and providing lifelong care for abandoned and injured animals, offering comprehensive veterinary support, adoption programs, and impactful CSR partnerships.",
            url: "https://www.praniseva.org/our-work",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.praniseva.org/our-work",
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: "https://www.praniseva.org/assets/images/ourwork-hero.jpg",
              contentUrl:
                "https://www.praniseva.org/assets/images/ourwork-hero.jpg",
              caption: "Prani Seva Ashram animal rescue and care",
            },
            publisher: {
              "@type": "Organization",
              name: "Prani Seva Ashram",
              url: "https://www.praniseva.org",
              logo: {
                "@type": "ImageObject",
                url: "https://www.praniseva.org/assets/images/logo.png",
                width: 600, // Replace with actual logo dimensions
                height: 60, // Replace with actual logo dimensions
              },
              sameAs: [
                "https://www.facebook.com/praniseva",
                "https://www.instagram.com/praniseva",
                "https://wa.me/your-number", // Replace with actual WhatsApp link
              ],
            },
            mentions: [
              {
                "@type": "Thing",
                name: "Animal Welfare",
              },
              {
                "@type": "Thing",
                name: "Corporate Social Responsibility",
              },
              {
                "@type": "Thing",
                name: "Veterinary Care",
              },
            ],
          })}
        </script>
      </Helmet>

      <main
        className="bg-[#fefcf9] min-h-screen px-4 py-12 sm:px-8 md:px-12 lg:px-20 xl:px-24 text-gray-800"
        role="main"
      >
        {/* Hero Section */}
        <motion.section
          className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-16 bg-amber-50 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between"
          aria-labelledby="our-work-heading"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1
              id="our-work-heading"
              className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-4 drop-shadow-md leading-tight"
              tabIndex={0}
            >
              Our Work: <br />
              <span className="text-amber-900">
                Rescuing Lives, Restoring Hope for Animals
              </span>
            </h1>
            <p
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              tabIndex={0}
            >
              At{" "}
              <strong className="text-amber-600 font-semibold">
                Prani Seva Ashram
              </strong>
              , we are dedicated to saving, protecting, and empowering the
              voiceless—providing abandoned and injured animals with vital
              rescue, medical care, rehabilitation, and a lifelong sanctuary.
              Our journey began with a single act of kindness and has since
              grown into a movement of compassion, ensuring every animal
              receives the dignity and love they deserve.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <motion.img
              src={ourWorkHero}
              alt="An animal receiving care at Prani Seva Ashram, symbolizing rescue and hope" // More descriptive alt text
              className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              loading="eager" // Hint to browser for immediate loading
            />
          </div>
        </motion.section>

        {/* Core Services Section */}
        <motion.section
          aria-labelledby="work-details-heading"
          className="max-w-7xl mx-auto my-24 px-4 sm:px-8 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2
              id="work-details-heading"
              className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-6"
              tabIndex={0}
            >
              Our Core Animal Welfare Services
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-semibold"
              tabIndex={0}
            >
              Grounded in compassion and driven by purpose, these pillars define
              our mission and extend hope to every animal life we touch.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              // {
              //   title: "Animal Rescue & Emergency Intervention",
              //   text: "Swift response for injured, sick, or abandoned animals, ensuring immediate medical aid and safe relocation to our shelter.",
              //   icon: Heart,
              //   bgColor: "bg-amber-50",
              //   borderColor: "border-amber-600",
              //   iconColor: "text-amber-600",
              // },
              {
                title: "Animal Shelter & Long-term Rehabilitation",
                text: "A secure, nurturing home for over 60 rescued animals, where they receive continuous nutrition, essential medical treatment, and emotional care.",
                icon: Shield,
                bgColor: "bg-white",
                borderColor: "border-amber-400",
                iconColor: "text-amber-400",
              },
              // {
              //   title: "Comprehensive Veterinary Support",
              //   text: "Access to on-call veterinary services, tailored post-recovery rehabilitation, and dedicated lifelong care for rescued animals with special needs.",
              //   icon: Bone,
              //   bgColor: "bg-amber-100",
              //   borderColor: "border-amber-700",
              //   iconColor: "text-amber-700",
              // },
              {
                title: "Animal Adoption & Foster Programs",
                text: "Dedicated initiatives helping rescued animals find loving, permanent homes through responsible and thorough adoption processes.",
                icon: PawPrint,
                bgColor: "bg-white",
                borderColor: "border-amber-500",
                iconColor: "text-amber-500",
              },
              {
                title: "Corporate CSR Partnerships for Animal Welfare",
                text: "Empowering businesses to align with responsible social impact, integrating ethical giving into their CSR initiatives and supporting animal welfare.",
                icon: Handshake,
                bgColor: "bg-amber-50",
                borderColor: "border-amber-300",
                iconColor: "text-amber-300",
              },
              {
                title: "Volunteer & Community Engagement Programs",
                text: "Opportunities for individuals and groups to actively participate in hands-on animal care, public education, and animal rights advocacy.",
                icon: CheckCircle,
                bgColor: "bg-white",
                borderColor: "border-amber-600",
                iconColor: "text-amber-600",
              },
            ].map(
              (
                { title, text, icon: Icon, bgColor, borderColor, iconColor },
                index
              ) => (
                <motion.article
                  key={index}
                  className={`${bgColor} ${borderColor} border-b-4 rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  variants={itemVariants}
                  tabIndex={0}
                  aria-label={`${title}: ${text}`} // Added aria-label for better accessibility
                >
                  <Icon
                    className={`${iconColor} mb-4 flex-shrink-0 w-10 h-10`}
                    aria-hidden="true" // Icon is decorative, screen readers can ignore
                  />
                  <h3 className="text-xl font-bold text-amber-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {text}
                  </p>
                </motion.article>
              )
            )}
          </div>

          <div className="mt-24 max-w-5xl mx-auto space-y-12">
            <p
              className="text-xl text-gray-800 font-semibold leading-relaxed text-center"
              tabIndex={0}
            >
              Every rescue, every act of kindness, and every partnership fuels a
              future where no animal is left behind. Through structured
              programs, strategic collaborations, and donor-driven impact, Prani
              Seva Ashram is not only saving lives but also changing mindsets,
              fostering compassion, and advocating for lasting change in animal
              welfare across India.
            </p>
            <p
              className="text-xl text-gray-800 font-semibold leading-relaxed text-center"
              tabIndex={0}
            >
              Your support makes this mission stronger, broader, and more
              sustainable, ensuring more lives are rescued, more stories are
              rewritten, and more ethical responsibility is embraced by society.
            </p>
            <p
              className="text-2xl text-amber-700 font-extrabold italic leading-relaxed text-center drop-shadow-sm"
              tabIndex={0}
            >
              "Let's create a world where compassion is the standard, and
              kindness knows no limits."
            </p>
          </div>
        </motion.section>

        {/* Why Partner With Us Section */}
        <motion.section
          aria-labelledby="partner-with-us-heading"
          className="bg-amber-50 py-16 px-4 sm:px-8 md:px-12 rounded-3xl max-w-7xl mx-auto text-center shadow-xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <h2
            id="partner-with-us-heading"
            className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-8 leading-tight"
            tabIndex={0}
          >
            Why Partner Your CSR Initiatives with Prani Seva Ashram?
          </h2>

          <p
            className="text-gray-800 text-lg max-w-4xl mx-auto mb-6 font-semibold"
            tabIndex={0}
          >
            <strong className="text-amber-700">
              Strategic Partnership with Prani Seva Ashram:
            </strong>{" "}
            Drive Meaningful Impact with Certified CSR Giving for Animal Welfare
          </p>

          <p
            className="text-gray-700 text-lg max-w-4xl mx-auto mb-14 text-center leading-relaxed"
            tabIndex={0}
          >
            At Prani Seva Ashram, we recognize that corporate social
            responsibility (CSR) is more than just philanthropy—it’s about{" "}
            <strong className="font-semibold text-amber-600">
              creating sustainable impact
            </strong>
            ,{" "}
            <strong className="font-semibold text-amber-600">
              strengthening brand values
            </strong>
            , and{" "}
            <strong className="font-semibold text-amber-600">
              fostering a culture of ethical leadership
            </strong>
            . By partnering with us, corporations have the unique opportunity to
            integrate purpose-driven giving into their CSR strategy while
            gaining financial and regulatory advantages.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                heading: "Government-Certified & Fully Compliant for CSR",
                points: [
                  "Registered NGO with official government certifications and approvals, ensuring legitimate CSR engagement.",
                  "Validated CSR Registration, ensuring direct alignment with corporate responsibility initiatives.",
                  "Income Tax Act permissions for donation benefits, including 80G & 12A tax exemptions for your contributions.",
                  "E-Anudan Registration, enabling transparent access to government grants and robust financial governance.",
                ],
              },
              {
                heading: "Maximize Your CSR Impact & Financial Benefits",
                points: [
                  "Corporate donations qualify for significant tax deductions, enabling cost-efficient and impactful giving.",
                  "Receive structured impact reporting to transparently track and showcase your sustainability goals and contributions to animal welfare.",
                  "Benefit from ethical transparency—every donation is traceable and systematically accounted for, building trust.",
                  "Gain enhanced public recognition as a socially responsible organization, significantly boosting your brand image and consumer loyalty.",
                ],
              },
              {
                heading: "Align Your Brand with Meaningful Change",
                points: [
                  "Directly support ethical animal welfare and humane treatment of abandoned and injured animals.",
                  "Engage employees in impactful volunteer programs, fostering team building and social responsibility within your workforce.",
                  "Enhance your company's ESG (Environmental, Social & Governance) ratings through ethical initiatives that demonstrate commitment to social good.",
                  "Be part of a growing movement for animal rights, contributing to a more empathetic society and leaving a lasting positive legacy for future generations.",
                ],
              },
            ].map(({ heading, points }, i) => (
              <motion.article
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 border border-amber-200 flex flex-col justify-between"
                whileHover={{ y: -8 }}
                variants={itemVariants}
                tabIndex={0}
                aria-label={`Benefit of partnering: ${heading}`} // Added aria-label
              >
                <h3 className="text-2xl font-bold text-amber-700 mb-5 leading-snug">
                  {heading}
                </h3>
                <ul className="list-disc list-inside space-y-3 text-gray-800 font-medium text-base">
                  {points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div
            className="mt-16 bg-amber-100 border border-amber-300 rounded-2xl max-w-4xl mx-auto p-10 text-left shadow-inner"
            tabIndex={0}
          >
            <p className="text-2xl font-extrabold text-amber-800 mb-6">
              Together, Let's Build a Legacy of Compassion & Corporate
              Excellence in Animal Welfare
            </p>
            <p className="text-gray-800 text-lg mb-5 font-semibold leading-relaxed">
              Prani Seva Ashram is not just an NGO—it’s a movement. With over 60
              rescued animals under our care, we strive for systemic change in
              animal welfare through strategic partnerships, advocacy, and
              corporate collaboration.
            </p>
            <p className="text-gray-800 text-lg font-semibold leading-relaxed">
              Join us in creating a future where kindness meets corporate
              responsibility, where every contribution strengthens your brand’s
              impact, and where compassion is not just a choice, but a business
              imperative.
            </p>
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default OurWorkPage;
