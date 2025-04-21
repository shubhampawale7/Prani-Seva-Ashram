/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (image) => setSelectedImage(image);
  const handleCloseModal = () => setSelectedImage(null);

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
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="my-masonry-column"
        >
          {images.map((img) => (
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
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white rounded-xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition"
              >
                &times;
              </button>
              <img
                src={`http://localhost:5000${selectedImage.url}`}
                alt={selectedImage.title || "Preview"}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              {selectedImage.title && (
                <p className="text-center p-4 text-gray-800 font-semibold bg-white">
                  {selectedImage.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
