import { useEffect, useRef } from "react";
import pawImage from "../assets/images/pawprint.png"; // Use your uploaded PNG

const PawTrail = () => {
  const trailRef = useRef([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      const timeSinceLast = now - lastTime;

      // Add only if the cursor moved enough and enough time passed
      if (
        (Math.abs(e.clientX - lastX) > 30 ||
          Math.abs(e.clientY - lastY) > 30) &&
        timeSinceLast > 150 // control how often a paw is created (slower)
      ) {
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        const paw = document.createElement("img");
        paw.src = pawImage;
        paw.className = "paw-print";
        paw.style.position = "fixed";
        paw.style.left = `${e.clientX - 12}px`;
        paw.style.top = `${e.clientY - 12}px`;
        paw.style.width = "24px";
        paw.style.opacity = "0.8";
        paw.style.pointerEvents = "none";
        paw.style.zIndex = "9999";
        paw.style.transition = "transform 1s ease-out, opacity 1.5s ease-out";
        paw.style.transform = "scale(1) rotate(0deg)";

        document.body.appendChild(paw);

        setTimeout(() => {
          paw.style.transform = "scale(1.2) rotate(15deg)";
          paw.style.opacity = "0";
        }, 10);

        setTimeout(() => {
          document.body.removeChild(paw);
        }, 2000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default PawTrail;
