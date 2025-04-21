import { useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const DogModal = ({ dog, onClose }) => {
  const modalRef = useRef();
  const navigate = useNavigate(); // 👈 Initialize navigation

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBackdropClick);
    return () => document.removeEventListener("mousedown", handleBackdropClick);
  }, []);

  // 👇 Function to handle button click
  const handleAdoptClick = () => {
    navigate(`/adoption-enquiry`, { state: { dog } }); // pass dog data through state
    onClose(); // close modal
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
          >
            <FaTimes size={22} />
          </button>

          <div className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden">
            <motion.img
              src={`http://localhost:5000/uploads/${dog.image}`}
              alt={dog.name}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 w-full p-6 flex flex-col justify-center space-y-3">
            <h2 className="text-2xl font-bold text-amber-700">{dog.name}</h2>
            <p className="text-gray-600 text-sm">
              <strong>Breed:</strong> {dog.breed}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Age:</strong> {dog.age}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Gender:</strong> {dog.gender}
            </p>
            <p className="text-gray-800">{dog.description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-amber-600 hover:bg-amber-700 transition text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
              onClick={handleAdoptClick} // 👈 Button click handler
            >
              Adopt Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DogModal;
