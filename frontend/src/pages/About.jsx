/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeart, FaPaw, FaHandsHelping, FaDog } from "react-icons/fa";
import heroImg from "../assets/images/about-hero.jpg";
import CountUp from "react-countup";

import Team from "../components/Team";
import Gallery from "../components/Gallery";
import Timeline from "../components/Timeline";
import FacebookFeed from "../components/FacebookFeed";

const About = () => {
  const sectionRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    gsap.from(heroImgRef.current, {
      x: -80,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(heroTextRef.current, {
      x: 80,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(missionRef.current, {
      y: 50,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from(visionRef.current, {
      y: 50,
      duration: 0.8,
      delay: 0.7,
      ease: "power2.out",
    });

    statsRef.current.forEach((el, index) => {
      gsap.from(el, {
        y: 40,
        delay: 0.4 + index * 0.3,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-amber-50 py-12 overflow-hidden">
        {/* Gradient Overlay with Soft Blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-amber-100 to-white bg-opacity-30 backdrop-blur-sm pointer-events-none z-0" />

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <img
            ref={heroImgRef}
            src={heroImg}
            alt="about hero"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div ref={heroTextRef} className="flex-1">
            <h1 className="text-4xl font-bold text-amber-700 mb-4">
              About Prani Seva Ashram 🐾
            </h1>
            <p className="text-lg text-gray-700">
              We are a community-driven sanctuary for injured and abandoned
              dogs, committed to providing love, care, and a forever home.
            </p>
          </div>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div
          ref={missionRef}
          className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-400"
        >
          <FaHeart className="text-amber-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold text-amber-700 mb-2">
            Our Mission
          </h2>
          <p>
            To rescue, rehabilitate, and rehome stray and injured dogs while
            spreading awareness about compassion and animal welfare.
          </p>
        </div>

        <div
          ref={visionRef}
          className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-rose-400"
        >
          <FaPaw className="text-rose-500 text-4xl mb-4" />
          <h2 className="text-2xl font-semibold text-rose-700 mb-2">
            Our Vision
          </h2>
          <p>
            A world where no dog is left behind — every animal gets the love,
            shelter, and care it deserves.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-amber-100 py-12">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-center">
          {[
            { label: "Dogs Rescued", value: 1200, icon: <FaDog /> },
            { label: "Volunteers", value: 80, icon: <FaHandsHelping /> },
            { label: "Successful Adoptions", value: 950, icon: <FaHeart /> },
          ].map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl text-amber-600 mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800">
                <CountUp end={stat.value} duration={2} />
              </div>
              <p className="text-amber-700 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Component */}
      <Timeline />

      {/* Team Component */}
      <Team />

      {/* Rescue Stories Gallery Component */}
      <Gallery />

      {/* Facebook Feed Component */}
      <FacebookFeed />
    </section>
  );
};

export default About;
