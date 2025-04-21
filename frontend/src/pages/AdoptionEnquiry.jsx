import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Modal from "../components/EnquiryConfirmationModal";

const AdoptionEnquiry = () => {
  const { state } = useLocation();
  const dog = state?.dog;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null); // Hold data before confirmation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingFormData({ ...formData }); // Save data before confirmation
    setShowModal(true);
  };

  const sendEnquiry = async (dataToSend) => {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/enquiries", {
        ...dataToSend,
        dog: {
          id: dog._id,
          name: dog.name,
          breed: dog.breed,
          image: dog.image, // used in backend for attachment
        },
      });

      toast.success("Your adoption enquiry has been submitted!");
      setFormData({ name: "", email: "", phone: "", reason: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setPendingFormData(null);
    }
  };

  const handleModalClose = (confirmed) => {
    setShowModal(false);
    if (confirmed && pendingFormData) {
      sendEnquiry(pendingFormData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-2">
          Adoption Enquiry
        </h2>
        {dog && (
          <p className="text-center text-gray-600 mb-6">
            You're adopting <strong>{dog.name}</strong> ({dog.breed})
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Textarea
            label="Why do you want to adopt?"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isLoading}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={25} />
            ) : (
              "Submit Enquiry"
            )}
          </motion.button>
        </form>
      </motion.div>

      {showModal && (
        <Modal
          message="Are you sure you want to submit the adoption enquiry?"
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

// Reusable input and textarea for cleanliness
const Input = ({ label, name, value, onChange, disabled, type = "text" }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      rows="4"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
    ></textarea>
  </div>
);

export default AdoptionEnquiry;
