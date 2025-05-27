import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Share2, X } from "lucide-react"; // Import X for close icon

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // Number of images per page

  // Modal state for zoom/pan
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null); // Ref for the image in the modal
  const touchStart = useRef(null); // For swipe gestures

  // Fetch images from API
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/gallery", {
        withCredentials: true,
      });
      setImages(res.data || []);
      // toast.success("Gallery loaded successfully!"); // Added success toast
    } catch (err) {
      toast.error("Failed to load images. Please try again.");
      console.error("Gallery fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback to memoize function

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Pagination Logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const selectedImage =
    activeIndex !== null ? currentImages[activeIndex] : null;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  // Modal handlers
  const openModal = useCallback((index) => {
    setActiveIndex(index);
    setZoom(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "hidden"; // Disable scrolling on body
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveIndex(null);
    setZoom(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "unset"; // Re-enable scrolling
  }, []);

  const showPrevImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
    setZoom(1); // Reset zoom on image change
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  }, [currentImages]);

  const showNextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
    setZoom(1); // Reset zoom on image change
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  }, [currentImages]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") showPrevImage();
      else if (e.key === "ArrowRight") showNextImage();
      else if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showPrevImage, showNextImage, handleCloseModal]);

  // Touch swipe for modal navigation
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStart.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (isZoomed) return; // Disable swipe if zoomed
    if (e.changedTouches.length === 1 && touchStart.current !== null) {
      const touchEnd = e.changedTouches[0].clientX;
      const deltaX = touchEnd - touchStart.current;

      if (deltaX > 75) showPrevImage(); // Increased threshold for better feel
      else if (deltaX < -75) showNextImage();
    }
    touchStart.current = null;
  };

  // Download and Share functions
  const handleDownload = (url, title = "image") => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000${url}`;
    link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.jpg`; // Dynamic filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleShare = async (url, title = "image") => {
    const fullUrl = `http://localhost:5000${url}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Prani Seva Ashram Gallery: ${title}`,
          url: fullUrl,
        });
        toast.success("Image shared!");
      } else {
        await navigator.clipboard.writeText(fullUrl);
        toast.success("Image link copied to clipboard!");
      }
    } catch (err) {
      toast.error("Could not share image.");
    }
  };

  // Zoom and Pan functions
  const toggleZoom = () => {
    if (isZoomed) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoom(2); // Zoom in
    }
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    // Calculate position relative to the image center for smoother pan
    const newX = (offsetX / width - 0.5) * (width * (zoom - 1));
    const newY = (offsetY / height - 0.5) * (height * (zoom - 1));

    setPosition({ x: -newX, y: -newY }); // Invert for natural pan direction
  };

  const handleTouchMove = (e) => {
    if (!isZoomed) return;
    if (e.touches.length === 1) {
      handleMouseMove({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
    }
  };

  // Masonry layout breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Framer Motion variants
  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans">
      {/* SEO Tags */}
      <Helmet>
        <title>Gallery | Prani Seva Ashram</title>
        <meta
          name="description"
          content="Explore the heartwarming photo gallery of Prani Seva Ashram, showcasing our rescued animals, care activities, and community events. Every image tells a story of hope and compassion."
        />
        <meta
          name="keywords"
          content="animal rescue gallery, Prani Seva Ashram photos, animal shelter images, pet care, animal welfare events, adopt animals"
        />
        <meta name="author" content="Prani Seva Ashram" />

        {/* Open Graph */}
        <meta property="og:title" content="Gallery | Prani Seva Ashram" />
        <meta
          property="og:description"
          content="Witness the impact of Prani Seva Ashram through our captivating gallery of rescued animals and their journey to recovery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/gallery" />
        {/* Replace with a representative image from your gallery or a default cover */}
        <meta
          property="og:image"
          content="http://localhost:5000/uploads/gallery_cover.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gallery | Prani Seva Ashram" />
        <meta
          name="twitter:description"
          content="See the compassionate work of Prani Seva Ashram. Our gallery is a testament to every life saved and nurtured."
        />
        <meta
          name="twitter:image"
          content="http://localhost:5000/uploads/gallery_cover.jpg"
        />
      </Helmet>

      {/* Hero Section / Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-amber-800 drop-shadow-lg mb-4">
          Our Cherished Moments
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-700 italic">
          "Every life deserves a second chance 🐾"
        </p>
        <p className="max-w-3xl mx-auto text-gray-600 mt-4 text-lg">
          Dive into our visual diary, a collection of heartwarming moments
          showcasing the lives we touch, the rescues we perform, and the joy we
          share with our beloved animals.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 border-4 border-dashed border-amber-500 rounded-full animate-spin"></div>
          <p className="mt-6 text-xl text-gray-600 font-semibold">
            Fetching heartwarming stories...
          </p>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500 text-xl py-20">
          No images available in the gallery yet. Check back soon!
        </p>
      ) : (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
            }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-6 -ml-6" // Masonry workaround for proper spacing
              columnClassName="pl-6" // Applies padding to individual columns
            >
              {currentImages.map((img, index) => (
                <motion.div
                  key={img._id}
                  variants={galleryItemVariants}
                  whileHover="hover" // This variant is defined directly on the element via Tailwind group
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group mb-6"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={`http://localhost:5000${img.url}`}
                    alt={img.title || `Gallery Image ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {img.title && (
                      <p className="text-white text-lg font-semibold truncate w-full">
                        {img.title}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 text-white bg-amber-600 rounded-full hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 shadow-md flex items-center justify-center"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-5 py-2 text-gray-700 font-semibold text-lg bg-amber-100 rounded-full">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 text-white bg-amber-600 rounded-full hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 shadow-md flex items-center justify-center"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={handleCloseModal} // Close modal on overlay click
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold z-[101] transition-colors shadow-lg"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-[101] text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-[101] text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Image Container */}
            <motion.div
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image itself
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={selectedImage._id} // Key for unique animation
                  ref={imgRef}
                  src={`http://localhost:5000${selectedImage.url}`}
                  alt={selectedImage.title || "Preview"}
                  className="max-w-full max-h-full object-contain cursor-grab transition-transform duration-300"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                    cursor: isZoomed ? "grab" : "zoom-in",
                    transformOrigin: "center center", // Ensures consistent zoom origin
                  }}
                  onDoubleClick={toggleZoom}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  initial={{ opacity: 0, scale: 0.9 }} // Initial state for new image
                  animate={{ opacity: 1, scale: 1 }} // Animate to full visibility
                  exit={{ opacity: 0, scale: 0.9 }} // Animate out
                  transition={{ duration: 0.2, ease: "easeOut" }} // Quick transition for image swap
                />
              </AnimatePresence>
            </motion.div>

            {/* Controls & Info */}
            <div className="absolute bottom-4 md:bottom-8 w-full px-4 flex flex-col items-center justify-center gap-4 z-[101]">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(selectedImage.url, selectedImage.title);
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold"
                  aria-label="Download image"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(selectedImage.url, selectedImage.title);
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold"
                  aria-label="Share image"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? "Zoom Out" : "Zoom In"}
                </button>
              </div>

              <div className="text-white text-center mt-2">
                <p className="text-base md:text-lg">
                  {activeIndex + 1} of {currentImages.length}
                </p>
                {selectedImage.title && (
                  <p className="text-xl md:text-2xl font-medium mt-1">
                    {selectedImage.title}
                  </p>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex overflow-x-auto gap-2 mt-4 px-2 pb-1 max-w-full scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-transparent scroll-snap-x mandatory rounded-lg">
                {currentImages.map((img, idx) => (
                  <div
                    key={img._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`scroll-snap-start w-20 h-20 min-w-[5rem] rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 shadow-md ${
                      img._id === selectedImage._id
                        ? "border-amber-400 scale-105" // Highlight active thumbnail
                        : "border-transparent hover:border-amber-200"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000${img.url}`}
                      alt={img.title || "Thumbnail"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
