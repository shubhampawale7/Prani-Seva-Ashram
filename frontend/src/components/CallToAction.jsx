import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-rose-500 to-amber-500 py-20 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Be the Change. Make a Difference.
      </h2>
      <p className="mb-6 text-lg">
        Every rupee, every minute, and every voice helps save another life.
      </p>
      <Link
        to="/donate"
        className="bg-white text-rose-600 font-bold px-8 py-3 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Donate Now"
      >
        Donate Now
      </Link>
    </div>
  );
};

export default CallToAction;
