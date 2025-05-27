import { motion } from "framer-motion";

const DogCard = ({ dog, onClick }) => {
  const isAdopted = dog.adopted;

  return (
    <motion.article
      onClick={!isAdopted ? onClick : undefined}
      whileHover={!isAdopted ? { scale: 1.05 } : {}}
      whileTap={!isAdopted ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 relative 
        ${
          isAdopted
            ? "opacity-70 grayscale cursor-not-allowed"
            : "hover:shadow-2xl"
        }`}
      role="button"
      aria-disabled={isAdopted}
      aria-label={`Dog card for ${dog.name}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:5000/uploads/${dog.image}`}
          alt={`${dog.name}, a ${dog.age} year old ${dog.breed}`}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />

        {/* Gender Badge */}
        <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded shadow">
          {dog.gender}
        </span>

        {/* Adopted Badge */}
        {isAdopted && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Adopted
          </span>
        )}
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
    </motion.article>
  );
};

export default DogCard;
