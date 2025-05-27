import { useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaPaw,
  FaSeedling,
  FaHandHoldingHeart,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    title: "A Spark of Compassion",
    date: "2015",
    icon: <FaPaw />,
    description:
      "Mr. Gidwani rescues a wounded street puppy, sparking a life-changing mission toward animal welfare.",
  },
  {
    title: "Foundation of Prani Seva Ashram",
    date: "2016",
    icon: <FaSeedling />,
    description:
      "Prani Seva Ashram is born—providing a safe sanctuary for injured, abandoned, and homeless animals.",
  },
  {
    title: "Growth & Rescue Milestones",
    date: "2017 - 2021",
    icon: <FaHandHoldingHeart />,
    description:
      "The ashram shelters over 60 animals, offers medical care, food, love, and builds strong community support.",
  },
  {
    title: "A Vision for the Future",
    date: "2022 - Present",
    icon: <FaRocket />,
    description:
      "Prani Seva Ashram advocates for systemic change and expands partnerships to grow a movement of compassion.",
  },
];

const floatingShapesConfig = [
  { Icon: FaPaw, size: 40, color: "#d97706", opacity: 0.3 },
  { Icon: FaSeedling, size: 50, color: "#b45309", opacity: 0.25 },
  { Icon: FaHandHoldingHeart, size: 30, color: "#f59e0b", opacity: 0.2 },
  { Icon: FaStar, size: 25, color: "#fbbf24", opacity: 0.15 },
  { Icon: FaRocket, size: 35, color: "#ca8a04", opacity: 0.2 },
];

const createRandomPosition = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
});

const OurJourneyTimeline = () => {
  const timelineRef = useRef(null);
  const titleRef = useRef(null);
  const floatingIconRefs = useRef([]);
  const sparkleContainerRef = useRef(null);

  floatingIconRefs.current = [];

  const addFloatingIconRef = (el) => {
    if (el && !floatingIconRefs.current.includes(el)) {
      floatingIconRefs.current.push(el);
    }
  };

  const createSparkles = () => {
    const container = sparkleContainerRef.current;
    if (!container) return;

    const sparkleCount = 30;
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.position = "absolute";
      sparkle.style.width = `${Math.random() * 3 + 1}px`;
      sparkle.style.height = sparkle.style.width;
      sparkle.style.background =
        "radial-gradient(circle, #fbbf24, transparent)";
      sparkle.style.borderRadius = "50%";
      sparkle.style.opacity = Math.random() * 0.8 + 0.2;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.pointerEvents = "none";
      container.appendChild(sparkle);

      gsap.to(sparkle, {
        y: "-=100",
        opacity: 0,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 5,
        onRepeat: () => {
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = "100%";
          sparkle.style.opacity = Math.random() * 0.8 + 0.2;
          gsap.set(sparkle, { y: 0 });
        },
      });
    }
  };

  useEffect(() => {
    if (!timelineRef.current) return;

    gsap.utils.toArray(".vertical-timeline-element").forEach((element, i) => {
      gsap.fromTo(
        element,
        { x: i % 2 === 0 ? -100 : 100, opacity: 1 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "restart none none none",
          },
        }
      );
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.8, y: 20 },
        {
          scale: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "restart none none none",
          },
        }
      );

      gsap.to(titleRef.current, {
        backgroundPosition: "200% center",
        duration: 6,
        repeat: -1,
        ease: "linear",
        css: { backgroundSize: "200% auto" },
        backgroundImage:
          "linear-gradient(270deg, #d97706, #fbbf24, #ca8a04, #b45309, #d97706)",
        backgroundClip: "text",
        textFillColor: "transparent",
        webkitBackgroundClip: "text",
        webkitTextFillColor: "transparent",
      });
    }

    gsap.to(timelineRef.current, {
      backgroundPosition: "55% 105%",
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    floatingIconRefs.current.forEach((icon, i) => {
      const driftX = Math.random() * 20 - 10;
      const driftY = 10 + Math.random() * 10;
      gsap.to(icon, {
        x: driftX,
        y: `+=${driftY}`,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    gsap.utils.toArray(".vertical-timeline-element-icon").forEach((iconEl) => {
      iconEl.style.cursor = "pointer";
      iconEl.addEventListener("mouseenter", () => {
        gsap.to(iconEl, {
          scale: 1.3,
          boxShadow: "0 0 15px 5px rgba(217, 119, 6, 0.8)",
          duration: 0.3,
          ease: "power1.out",
        });
      });
      iconEl.addEventListener("mouseleave", () => {
        gsap.to(iconEl, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power1.out",
        });
      });
    });

    createSparkles();
  }, []);

  return (
    <>
      <Helmet>
        {/* <title>Our Journey | Prani Seva Ashram</title> */}
        <meta
          name="description"
          content="Explore the heartwarming journey of Prani Seva Ashram, from a single act of compassion to a full-fledged movement for animal welfare."
        />
        <meta
          name="keywords"
          content="animal rescue, Prani Seva Ashram, timeline, journey, animal shelter, compassion"
        />
        <meta name="author" content="Prani Seva Ashram" />
        <meta property="og:title" content="Our Journey | Prani Seva Ashram" />
        <meta
          property="og:description"
          content="Discover how Prani Seva Ashram grew from a small rescue effort into a compassionate mission helping countless animals."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Journey | Prani Seva Ashram" />
        <meta
          name="twitter:description"
          content="Follow our timeline of compassion and care for animals."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        />
      </Helmet>

      <div
        ref={timelineRef}
        className="relative bg-[#fdfaf6] py-16 px-4 md:px-10 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div
          ref={sparkleContainerRef}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        ></div>

        {floatingShapesConfig.map(({ Icon, size, color, opacity }, i) => {
          const pos = createRandomPosition(window.innerWidth, 600);
          return (
            <Icon
              key={`floating-${i}`}
              ref={addFloatingIconRef}
              className="absolute z-10"
              size={size}
              style={{
                color,
                opacity,
                left: pos.x,
                top: pos.y,
                filter: "drop-shadow(0 0 4px rgba(217,119,6,0.6))",
                userSelect: "none",
              }}
            />
          );
        })}

        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 select-none"
          style={{
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
            backgroundImage:
              "linear-gradient(270deg, #d97706, #fbbf24, #ca8a04, #b45309, #d97706)",
          }}
        >
          Our Journey
        </h2>

        <VerticalTimeline lineColor="#d97706" className="relative z-20">
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{
                background: "#fff7ed",
                color: "#b45309",
                borderTop: "4px solid #ca8a04",
                boxShadow:
                  "0 4px 10px rgba(202, 138, 4, 0.1), 0 0 8px rgba(202, 138, 4, 0.05)",
              }}
              contentArrowStyle={{ borderRight: "7px solid #fff7ed" }}
              date={item.date}
              dateClassName="text-white font-semibold"
              iconStyle={{
                background: "#ca8a04",
                color: "#fff",
                boxShadow: "0 0 8px rgba(202, 138, 4, 0.8)",
                transition: "box-shadow 0.3s ease",
              }}
              icon={item.icon}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold text-[#b45309]">
                {item.title}
              </h3>
              <p className="mt-2">{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default OurJourneyTimeline;
