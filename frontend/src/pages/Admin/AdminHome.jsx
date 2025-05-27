/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AdminGalleryUpload from "./AdminGalleryUpload"; // Assuming this path is correct
import { Dialog } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import {
  FaDollarSign,
  FaChartBar,
  FaImages,
  FaUpload,
  FaTimes,
  FaPaw,
  FaHandHoldingHeart,
  FaCloudUploadAlt,
  FaEyeSlash,
} from "react-icons/fa";

const AdminHome = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [rescueCount, setRescueCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false); // This seems to be for the modal's loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // 'upload' or 'delete'
  const [selectedFileForUpload, setSelectedFileForUpload] = useState(null); // Renamed for clarity
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [galleryRefreshToggle, setGalleryRefreshToggle] = useState(false);
  const [showGallerySection, setShowGallerySection] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Prani Seva Ashram Admin";
  }, []);

  const fetchTrends = async () => {
    try {
      const { data } = await axios.get("/api/donate/trends", {
        withCredentials: true,
      });
      setTotalAmount(data?.totalAmount || 0);
      setTotalDonations(data?.totalDonations || 0);
    } catch (err) {
      console.error("Error fetching donation statistics:", err);
      toast.error("Failed to load donation data.");
    }
  };

  const fetchRescueCount = async () => {
    try {
      const { data } = await axios.get("/api/rescues/count", {
        withCredentials: true,
      });
      setRescueCount(data?.count || 0);
    } catch (err) {
      console.error("Error fetching rescue count:", err);
    }
  };

  // This handler is now the central point for triggering the confirmation modal
  const handleConfirmAction = (type, data) => {
    setActionType(type);
    if (type === "upload") {
      setSelectedFileForUpload(data); // `data` here is the file object
      setSelectedDeleteId(null); // Clear delete ID
    } else if (type === "delete") {
      setSelectedDeleteId(data); // `data` here is the image ID
      setSelectedFileForUpload(null); // Clear selected file
    }
    setIsModalOpen(true); // Open the confirmation modal
  };

  // This function is called when 'Upload' is confirmed in the modal
  const handleUploadConfirmed = async () => {
    if (!selectedFileForUpload) {
      toast.error("No image selected for upload.");
      return;
    }
    setIsUploading(true); // Indicate loading in the modal button
    const formData = new FormData();
    formData.append("photo", selectedFileForUpload); // Ensure 'photo' matches your backend's expected field name

    try {
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image uploaded successfully!");
      setGalleryRefreshToggle((prev) => !prev); // Trigger gallery refresh
      setSelectedFileForUpload(null); // Clear selected file after successful upload
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.response?.data?.error || "Image upload failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false); // Close modal
    }
  };

  // This function is called when 'Delete' is confirmed in the modal
  const handleDeleteConfirmed = async () => {
    if (!selectedDeleteId) {
      toast.error("No image selected for deletion.");
      return;
    }
    setIsUploading(true); // Indicate loading in the modal button
    try {
      await axios.delete(
        `http://localhost:5000/api/gallery/${selectedDeleteId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Image deleted successfully!");
      setGalleryRefreshToggle((prev) => !prev); // Trigger gallery refresh
      setSelectedDeleteId(null); // Clear selected delete ID
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.response?.data?.error || "Image deletion failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false); // Close modal
    }
  };

  useEffect(() => {
    fetchTrends();
    fetchRescueCount();
  }, []);

  // Framer Motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="space-y-6 lg:space-y-8 py-4 sm:py-6 lg:py-8">
        {/* Dashboard Header */}
        <motion.div
          className="bg-white rounded-lg shadow-md py-6 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            A centralized hub for managing Prani Seva Ashram's operations.
          </p>
        </motion.div>

        {/* Key Metrics Section */}
        <motion.section
          className="bg-white rounded-lg shadow-md py-6 px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
            <FaChartBar className="mr-3 text-amber-500" /> Key Performance
            Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Total Donations Card */}
            <motion.div
              className="bg-amber-50 rounded-lg p-5 flex items-center justify-between border border-amber-100 shadow-sm"
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Total Donations
                </p>
                <h3 className="text-3xl font-extrabold text-amber-800 mt-1">
                  {totalDonations}
                </h3>
              </div>
              <div className="bg-amber-200 p-3 rounded-full">
                <FaHandHoldingHeart className="text-2xl text-amber-700" />
              </div>
            </motion.div>

            {/* Total Amount Card */}
            <motion.div
              className="bg-green-50 rounded-lg p-5 flex items-center justify-between border border-green-100 shadow-sm"
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Total Funds Raised
                </p>
                <h3 className="text-3xl font-extrabold text-green-800 mt-1">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </h3>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <FaDollarSign className="text-2xl text-green-700" />
              </div>
            </motion.div>

            {/* Animals Rescued Card */}
            {/* Uncomment this if you want to display the rescue count */}
            {/* <motion.div
              className="bg-blue-50 rounded-lg p-5 flex items-center justify-between border border-blue-100 shadow-sm"
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Animals Rescued
                </p>
                <h3 className="text-3xl font-extrabold text-blue-800 mt-1">
                  {rescueCount}
                </h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <FaPaw className="text-2xl text-blue-700" />
              </div>
            </motion.div> */}
          </div>
        </motion.section>

        {/* Gallery Management Section */}
        <motion.section
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-800 flex items-center mb-4 md:mb-0">
              <FaImages className="mr-4 text-amber-600 text-3xl" /> Gallery
              Management
            </h2>
            <button
              onClick={() => setShowGallerySection(!showGallerySection)}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-amber-500 focus:ring-offset-2 transform hover:scale-105"
            >
              {showGallerySection ? (
                <>
                  <FaEyeSlash className="text-xl" /> Hide Controls
                </>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-xl" /> Manage Images
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showGallerySection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden pt-6"
              >
                <p className="text-gray-600 mb-6 text-lg">
                  Upload new images or manage existing ones in your gallery.
                </p>
                <AdminGalleryUpload
                  // `onConfirmUpload` and `onConfirmDelete` props now directly trigger
                  // the `handleConfirmAction` in AdminHome.jsx
                  onConfirmUpload={(file) =>
                    handleConfirmAction("upload", file)
                  }
                  onConfirmDelete={(id) => handleConfirmAction("delete", id)}
                  refreshTrigger={galleryRefreshToggle}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel
            as={motion.div}
            className="bg-white rounded-lg p-6 sm:p-8 shadow-2xl w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
              {actionType === "upload"
                ? "Confirm Image Upload"
                : "Confirm Image Deletion"}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Are you sure you want to proceed with{" "}
              {actionType === "upload"
                ? "uploading this image"
                : "deleting this image"}
              ? This action cannot be undone.
            </Dialog.Description>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                // Call the specific handler based on actionType
                onClick={
                  actionType === "upload"
                    ? handleUploadConfirmed
                    : handleDeleteConfirmed
                }
                className={`px-5 py-2 rounded-md font-semibold min-w-[100px] flex justify-center items-center transition duration-200 ${
                  actionType === "upload"
                    ? "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500"
                    : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <BeatLoader size={8} color="#ffffff" />
                ) : actionType === "upload" ? (
                  "Upload"
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>
    </div>
  );
};

export default AdminHome;
