// src/components/Hero.jsx
import { Parallax } from "react-scroll-parallax";

const Hero = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden flex items-center justify-center text-center bg-white">
      {/* Parallax Background */}
      <Parallax speed={-20}>
        <img
          src="/bg-dog.jpg" // Replace with your dog background image
          alt="Cute dog background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        />
      </Parallax>

      {/* Foreground Content */}
      <div className="relative z-10 text-black p-4">
        <h1 className="text-5xl font-extrabold mb-4">Prani Seva Ashram 🐾</h1>
        <p className="text-lg max-w-xl mx-auto">
          A home for rescued souls. Join us in spreading love and care to the
          voiceless.
        </p>
      </div>
    </div>
  );
};

export default Hero;
