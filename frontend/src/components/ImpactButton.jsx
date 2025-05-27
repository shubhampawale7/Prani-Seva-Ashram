import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ImpactButton = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-12">
      <button
        onClick={() => navigate("/our-impact")}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        See Our Impact <FiArrowRight className="text-xl mt-0.5" />
      </button>
    </div>
  );
};

export default ImpactButton;
