import { Parallax } from "react-scroll-parallax";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef(null);

  // Scroll-based fade out for background only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const stats = [
    { label: "Dogs Rescued", value: "1,200+" },
    { label: "Successful Treatments", value: "900+" },
    { label: "Volunteers Joined", value: "300+" },
  ];

  return (
    <Parallax speed={-2}>
      <div ref={containerRef} className="relative py-20 px-6 text-center">
        {/* Fading white background */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-white pointer-events-none z-0"
        />

        {/* Content above background */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-bold text-rose-500 mb-10">
            Our Impact in Numbers
          </h2>
        </motion.div>

        <div className="relative z-10 grid sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-600">
                {stat.value}
              </div>
              <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Parallax>
  );
};

export default StatsSection;
