// FloatingButton.jsx
import { FaDog } from "react-icons/fa";

const FloatingButton = () => {
  const scrollToAdopt = () => {
    const adoptSection = document.getElementById("adopt");
    if (adoptSection) {
      adoptSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/adopt";
    }
  };

  return (
    <button
      onClick={scrollToAdopt}
      className="fixed bottom-20 right-6 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg z-50 animate-bounce hover:animate-none transition-all"
      title="Adopt a Paw Friend 🐾"
    >
      <FaDog size={24} />
    </button>
  );
};

export default FloatingButton;
