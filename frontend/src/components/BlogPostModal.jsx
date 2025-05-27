// src/components/BlogPostModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FaPaw, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa"; // Ensure all icons are imported

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0, scale: 0.8 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const BlogPostModal = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Transparent Backdrop Overlay - blurred and slightly darker */}
          <motion.div
            className="absolute inset-0 bg-amber-950 bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-4xl h-[90vh] md:h-[80vh] flex flex-col overflow-hidden transform-gpu border-4 border-orange-200" // Increased max-width for side-by-side
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-amber-800 transition-colors duration-200 text-4xl p-2 rounded-full hover:bg-amber-100 z-10"
              aria-label="Close"
            >
              <MdClose />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center text-center mb-6 pb-4 border-b border-orange-200">
              <FaPaw className="text-orange-400 text-5xl mb-3 animate-bounce-subtle" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 leading-tight mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                {post.date} &bull; {post.category}
              </p>
            </div>

            {/* Modal Body (Scrollable Content with Image) */}
            <div className="flex-grow overflow-y-auto pr-3 custom-scrollbar-amber">
              <div className="flex flex-col md:flex-row gap-6">
                {" "}
                {/* Flex container for image and text */}
                {post.image && (
                  <div className="md:w-1/3 flex-shrink-0">
                    {" "}
                    {/* Image wrapper, takes 1/3 width on medium screens */}
                    <div className="relative w-full pb-[100%] rounded-lg overflow-hidden shadow-md">
                      {" "}
                      {/* Aspect ratio box for square */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg" // object-cover applied here
                      />
                    </div>
                    {/* Optionally, if you have a 'before' image for success stories */}
                    {post.beforeImage && (
                      <div className="relative w-full pb-[100%] rounded-lg overflow-hidden shadow-md mt-4">
                        <img
                          src={post.beforeImage}
                          alt={`${post.title} (Before)`}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg grayscale"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="md:w-2/3">
                  {" "}
                  {/* Text content takes 2/3 width */}
                  <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif tracking-wide">
                    <p>{post.fullContent}</p>
                    {/* Example of more content */}
                    {/* <p className="mt-4">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="mt-4">
                      Curabitur pretium tincidunt lacus. Nulla facilisi. Donec
                      lacinia porta leo. Maecenas a fermentum lorem. Aliquam ac
                      consectetur. Praesent sed lacus at nisl imperdiet dictum.
                      Sed non leo et elit egestas pharetra. Nulla facilisi.
                      Maecenas commodo. Praesent et nisl. Quisque id justo et
                      nulla convallis facilisis. Proin vitae risus. Nulla
                      facilisi.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: Call to Action/Share Buttons */}
            <div className="mt-8 pt-6 border-t border-orange-200 text-center">
              <p className="text-gray-700 text-base mb-4 font-semibold">
                Inspired? Share this story and help us spread awareness!
              </p>
              <div className="flex justify-center space-x-6 text-xl">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=YOUR_BLOG_POST_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={`whatsapp://send?text=${encodeURIComponent(
                    post.title + " - " + "YOUR_BLOG_POST_URL"
                  )}`}
                  data-action="share/whatsapp/share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 transition-colors duration-200"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                {/* Instagram requires direct sharing from app, but you can link to your profile */}
                <a
                  href="https://www.instagram.com/pranisevaashram_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
                  aria-label="Visit our Instagram"
                >
                  <FaInstagram />
                </a>
                {/* Custom Paw Share (can be a copy URL or another action) */}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText("YOUR_BLOG_POST_URL")
                  }
                  className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
                  aria-label="Copy Link"
                >
                  <FaPaw />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogPostModal;
