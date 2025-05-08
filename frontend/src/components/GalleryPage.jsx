import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;
  const touchStart = useRef(null);
  const imgRef = useRef(null);

  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery", {
        withCredentials: true,
      });
      setImages(res.data || []);
    } catch (err) {
      toast.error("Failed to load images.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    const index = currentImages.findIndex((img) => img._id === image._id);
    setActiveIndex(index);
    setZoom(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleCloseModal = () => {
    setActiveIndex(null);
    setZoom(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const selectedImage =
    activeIndex !== null ? currentImages[activeIndex] : null;

  const showPrevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setActiveIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") showPrevImage();
      else if (e.key === "ArrowRight") showNextImage();
      else if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, currentImages]);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const deltaX = touchEnd - touchStart.current;

    if (deltaX > 50) showPrevImage();
    else if (deltaX < -50) showNextImage();
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000${url}`;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (url) => {
    const fullUrl = `http://localhost:5000${url}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this image!",
          url: fullUrl,
        });
      } else {
        await navigator.clipboard.writeText(fullUrl);
        toast.success("Image link copied to clipboard!");
      }
    } catch (err) {
      toast.error("Could not share image.");
    }
  };

  const toggleZoom = () => {
    if (isZoomed) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoom(2);
    }
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const bounds = imgRef.current.getBoundingClientRect();
    const offsetX = e.clientX - bounds.left;
    const offsetY = e.clientY - bounds.top;
    const x = (offsetX / bounds.width - 0.5) * 100;
    const y = (offsetY / bounds.height - 0.5) * 100;
    setPosition({ x, y });
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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-amber-600 mb-12"
      >
        Rescue Gallery 🐾
      </motion.h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-dashed border-amber-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading cute pups...</p>
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No images available.
        </p>
      ) : (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="my-masonry-column"
          >
            {currentImages.map((img) => (
              <motion.div
                key={img._id}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => handleImageClick(img)}
              >
                <img
                  src={`http://localhost:5000${img.url}`}
                  alt={img.title || "Gallery"}
                  className="w-full h-auto object-cover rounded-xl transition duration-300 ease-in-out group-hover:brightness-90 mb-2"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </Masonry>

          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-white bg-black/60 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold z-50"
            >
              &times;
            </button>

            <button
              onClick={showPrevImage}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 z-40 text-white bg-black/60 hover:bg-black/80 p-3 rounded-full"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 z-40 text-white bg-black/60 hover:bg-black/80 p-3 rounded-full"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage._id}
                  ref={imgRef}
                  onDoubleClick={toggleZoom}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  src={`http://localhost:5000${selectedImage.url}`}
                  alt={selectedImage.title || "Preview"}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                  }}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Controls and Thumbnails */}
            <div className="absolute bottom-5 w-full px-4 flex flex-col items-center justify-center gap-4">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleDownload(selectedImage.url)}
                  className="bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-md"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare(selectedImage.url)}
                  className="bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-md"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <div className="text-white text-center">
                <p className="text-sm">
                  {activeIndex + 1} of {currentImages.length}
                </p>
                {selectedImage.title && (
                  <p className="text-lg font-medium mt-1">
                    {selectedImage.title}
                  </p>
                )}
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex overflow-x-auto gap-2 mt-2 px-2 pb-1 max-w-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scroll-snap-x mandatory">
                {currentImages.map((img, idx) => (
                  <div
                    key={img._id}
                    onClick={() => setActiveIndex(idx)}
                    className={`scroll-snap-start w-16 h-16 min-w-[4rem] rounded-md overflow-hidden border-2 cursor-pointer ${
                      img._id === selectedImage._id
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000${img.url}`}
                      alt={img.title || "Thumb"}
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
