// import { useEffect, useState } from "react";

// const ScrollProgress = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const handleScroll = () => {
//     const scrollHeight =
//       document.documentElement.scrollHeight - window.innerHeight;
//     const scrollTop = window.scrollY;
//     const progress = (scrollTop / scrollHeight) * 100;
//     setScrollProgress(progress);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="mt-31 fixed top-0 left-0 w-full h-1 bg-transparent z-50">
//       <div
//         className="h-full bg-amber-500"
//         style={{
//           width: `${scrollProgress}%`,
//           transition: "width 0.25s ease-out",
//         }}
//       >
//         {/* Optional: Add Paw Print Icon */}
//         <div
//           className="absolute right-0 top-[-6px] text-amber-500 text-xl"
//           style={{
//             transform: `translateX(${scrollProgress - 100}%)`, // Move paw along the scroll
//             transition: "transform 0.25s ease-out",
//           }}
//         >
//           🐾
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScrollProgress;
