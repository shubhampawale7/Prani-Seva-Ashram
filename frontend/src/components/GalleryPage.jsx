import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react"; // Import new icons

const GalleryPage = () => {
  // State Management
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 100; // Increased images per page for a richer initial view

  // Modal State for zoom/pan
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null); // Ref for the image in the modal
  const touchStart = useRef(null); // For swipe gestures

  // --- Data Fetching ---
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/gallery", {
        withCredentials: true,
      });
      setImages(res.data || []);
      toast.success("Gallery loaded successfully!");
    } catch (err) {
      toast.error("Failed to load images. Please try again.");
      console.error("Gallery fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is empty as fetchImages doesn't depend on any props/state

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // --- Pagination Logic ---
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const selectedImage =
    activeIndex !== null ? currentImages[activeIndex] : null;

  const paginate = useCallback(
    (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        setActiveIndex(null); // Reset activeIndex when page changes
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
      }
    },
    [totalPages]
  );

  // --- Modal Handlers ---
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
    // Reset zoom and position for the new image
    setZoom(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  }, [currentImages]);

  const showNextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
    // Reset zoom and position for the new image
    setZoom(1);
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

  // --- Download and Share functions ---
  const handleDownload = (url, title = "image") => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000${url}`;
    link.download = `${title.replace(/\s+/g, "_").toLowerCase()}.jpg`; // Dynamic filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
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
      console.error("Share error:", err);
      toast.error("Could not share image.");
    }
  };

  // --- Zoom and Pan functions ---
  const toggleZoom = () => {
    if (isZoomed) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoom(2); // Zoom in
    }
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isZoomed || !imgRef.current) return;

      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect();
      const offsetX = e.clientX - left;
      const offsetY = e.clientY - top;

      // Calculate position relative to the image center for smoother pan
      const newX = (offsetX / width - 0.5) * (width * (zoom - 1));
      const newY = (offsetY / height - 0.5) * (height * (zoom - 1));

      setPosition({ x: -newX, y: -newY }); // Invert for natural pan direction
    },
    [isZoomed, zoom]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isZoomed) return;
      if (e.touches.length === 1) {
        handleMouseMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
      }
    },
    [isZoomed, handleMouseMove]
  );

  // --- Masonry Layout Breakpoints ---
  const breakpointColumnsObj = {
    default: 4,
    1400: 3, // For larger screens
    1100: 3,
    700: 2,
    500: 1,
  };

  // --- Framer Motion Variants ---
  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05, // Slight scale up on hover
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // More pronounced shadow
      transition: { duration: 0.3 },
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans">
      {/* --- SEO Tags --- */}
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

      {/* --- Hero Section / Title --- */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-amber-800 drop-shadow-lg mb-4 leading-tight">
          Our Cherished Moments
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-700 italic mb-6">
          "Every life deserves a second chance 🐾"
        </p>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Dive into our visual diary, a collection of heartwarming moments
          showcasing the lives we touch, the rescues we perform, and the joy we
          share with our beloved animals.
        </p>
      </motion.div>

      {/* --- Gallery Content --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg shadow-inner">
          <div className="w-20 h-20 border-4 border-dashed border-amber-500 rounded-full animate-spin"></div>
          <p className="mt-6 text-xl text-gray-600 font-semibold">
            Fetching heartwarming stories...
          </p>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500 text-xl py-20 bg-gray-50 rounded-lg shadow-sm">
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
                  whileHover="hover"
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group mb-6 bg-white transform transition-transform duration-300" // Added background and transform
                  onClick={() => openModal(index)}
                  aria-label={`Open image: ${img.title || "Gallery Image"}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      openModal(index);
                    }
                  }}
                >
                  <img
                    src={`http://localhost:5000${img.url}`}
                    alt={img.title || `Gallery Image ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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

          {/* --- Pagination --- */}
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
              <span className="px-5 py-2 text-gray-700 font-semibold text-lg bg-amber-100 rounded-full shadow-inner">
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

      {/* --- Fullscreen Modal --- */}
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
            role="dialog"
            aria-modal="true"
            aria-label={`Image detail for ${
              selectedImage.title || "gallery image"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold z-[101] transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-[101] text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-[101] text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Image Container */}
            <motion.div
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image itself
              role="img"
              aria-label={selectedImage.title || "Zoomable image"}
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
                  draggable="false" // Prevent native drag
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
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Download image"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(selectedImage.url, selectedImage.title);
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Share image"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-colors flex items-center gap-2 text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <ZoomOut className="w-5 h-5" />
                  ) : (
                    <ZoomIn className="w-5 h-5" />
                  )}{" "}
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
              <div className="flex overflow-x-auto gap-3 mt-4 px-2 pb-1 max-w-full scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-transparent scroll-snap-x mandatory rounded-lg">
                {currentImages.map((img, idx) => (
                  <div
                    key={img._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`scroll-snap-start w-24 h-24 min-w-[6rem] rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 shadow-md flex-shrink-0 ${
                      // Added flex-shrink-0
                      img._id === selectedImage._id
                        ? "border-amber-400 scale-105 ring-2 ring-amber-400" // Highlight active thumbnail
                        : "border-transparent hover:border-amber-200"
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select image ${idx + 1}: ${
                      img.title || "thumbnail"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveIndex(idx);
                      }
                    }}
                  >
                    <img
                      src={`http://localhost:5000${img.url}`}
                      alt={img.title || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
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
