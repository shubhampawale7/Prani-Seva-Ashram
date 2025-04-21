// components/DogCard.jsx
import { motion } from "framer-motion";

const DogCard = ({ dog, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:5000/uploads/${dog.image}`}
          alt={dog.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded shadow">
          {dog.gender}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-amber-700 mb-1 truncate">
          {dog.name}
        </h3>
        <p className="text-gray-600 text-sm mb-1 truncate">
          {dog.breed} • {dog.age}
        </p>
        {dog.mood && (
          <p className="text-sm text-gray-500 italic truncate">{dog.mood}</p>
        )}
        {dog.vaccinated !== undefined && (
          <p
            className={`text-xs font-semibold mt-2 ${
              dog.vaccinated ? "text-green-600" : "text-red-500"
            }`}
          >
            {dog.vaccinated ? "Vaccinated ✅" : "Not Vaccinated ❌"}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default DogCard;
