/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PawPrint, Heart, Users } from "lucide-react";
import pranisevahome from "../assets/images/pranisevahome.jpg";
import featuredDog from "../assets/images/featured-dog.jpg";

const Home = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-tagline", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-desc", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".impact-stats", {
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".why-support", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.7,
        ease: "power3.out",
      });

      gsap.from(".featured-dog", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(".testimonials", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative min-h-screen flex flex-col items-center   justify-center px-4 py-16 overflow-hidden bg-no-repeat bg-cover bg-center text-gray-800 
             bg-[url('/src/assets/images/pranisevahome-mobile.jpg')] 
             sm:bg-[url('/src/assets/images/pranisevahome.jpg')]"
    >
      {/* Blurred Background Shapes */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl px-4 py-20 bg-black/20 rounded-2xl shadow-2xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight hero-title">
          <span className="text-amber-400">Prani Seva Ashram 🐾</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-white hero-tagline"
          style={{ textShadow: "2px 2px 4px #000" }}
        >
          Your CSR: A Legacy of Compassion and Home for the Voiceless.
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-300 font-medium mb-10 hero-desc max-w-2xl">
          A loving sanctuary dedicated to the rescue, care, and rehabilitation
          of stray and injured dogs. We provide shelter, medical care, and the
          warmth of companionship — all fueled by compassion and community
          support.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center hero-buttons">
          <a
            href="/donate"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Donate Now
          </a>
          <a
            href="/adopt"
            className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Adopt a Friend
          </a>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="mt-24 max-w-5xl mx-auto px-4 sm:px-8 text-center impact-stats">
        <div className="bg-amber-50 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-amber-700">
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <PawPrint size={32} />,
                title: "500+",
                desc: "Dogs Rescued",
              },
              {
                icon: <Heart size={32} />,
                title: "300+",
                desc: "Adoptions Completed",
              },
              {
                icon: <Users size={32} />,
                title: "150+",
                desc: "Volunteers & Supporters",
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="text-rose-500">{stat.icon}</div>
                <h3 className="text-2xl font-bold">{stat.title}</h3>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Support */}
      <div className="mt-24 max-w-5xl mx-auto px-4 sm:px-8 text-center why-support">
        <div className="bg-amber-50 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-amber-700">
            Why Support Prani Seva Ashram?
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-left text-gray-700 px-4">
            <li>✅ Transparent use of donations</li>
            <li>✅ Immediate medical aid for injured strays</li>
            <li>✅ Safe and clean shelter environment</li>
            <li>✅ Passionate and trained caregivers</li>
          </ul>
        </div>
      </div>

      {/* Featured Dog */}
      <div className="mt-24 max-w-5xl mx-auto px-4 sm:px-8 text-center featured-dog">
        <div className="flex flex-col sm:flex-row gap-8 items-center bg-amber-50 p-6 rounded-xl shadow-md">
          <img
            src={featuredDog}
            alt="Bruno the dog"
            className="hero-image w-60 h-60 object-cover rounded-xl border-4 border-amber-100"
          />
          <div className="text-left space-y-4">
            <h2 className="text-3xl font-semibold mb-6 text-amber-700">
              Meet Bruno – Our Star Pup 🐶
            </h2>
            <p className="text-gray-700 text-lg">
              Bruno was rescued after being hit by a vehicle and left
              unattended. With your support, he received surgery, lots of love,
              and now he's ready for a forever home!
            </p>
            <a
              href="/adopt"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full font-semibold transition"
            >
              Adopt Bruno
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-24 max-w-6xl mx-auto px-4 sm:px-8 text-center testimonials">
        <h2 className="text-3xl font-semibold mb-8 text-amber-200">
          What Our Supporters Say ❤️
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              name: "Anita Desai",
              quote:
                "Adopting from Prani Seva Ashram changed my life. I found my best friend and helped save a life!",
            },
            {
              name: "Rahul Mehta",
              quote:
                "The love and care they give to these dogs is unmatched. Truly inspiring work!",
            },
            {
              name: "Meena Kapoor",
              quote:
                "I volunteer here every weekend and it’s been a fulfilling journey. The dogs are treated like family.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white shadow-md border border-gray-100 p-5 rounded-xl"
            >
              <p className="text-gray-600 italic">“{t.quote}”</p>
              <div className="mt-4 font-semibold text-rose-500">– {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
