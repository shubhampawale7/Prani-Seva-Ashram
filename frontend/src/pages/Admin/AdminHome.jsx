/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import dogAnimation from "../../assets/lotties/dog-hello.json";
import axios from "axios";
import AdminGalleryUpload from "./AdminGalleryUpload";
import { Dialog } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import {
  FaDonate,
  FaRupeeSign,
  FaDog,
  FaUpload,
  FaImages,
} from "react-icons/fa";

const AdminHome = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [rescueCount, setRescueCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [galleryRefreshToggle, setGalleryRefreshToggle] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);

  const fetchTrends = async () => {
    try {
      const res = await axios.get("/api/donate/trends", {
        withCredentials: true,
      });
      setTotalAmount(res.data?.totalAmount || 0);
      setTotalDonations(res.data?.totalDonations || 0);
    } catch (err) {
      console.error("Error fetching donation stats:", err);
    }
  };

  const fetchRescueCount = async () => {
    try {
      const res = await axios.get("/api/rescues/count", {
        withCredentials: true,
      });
      setRescueCount(res.data?.count || 0);
    } catch (err) {
      console.error("Error fetching rescue count:", err);
    }
  };

  const handleConfirmAction = (type, data) => {
    setActionType(type);
    if (type === "upload") {
      setSelectedFile(data);
    } else if (type === "delete") {
      setSelectedDeleteId(data);
    }
    setIsModalOpen(true);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("No image selected.");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("/api/gallery/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image uploaded successfully.");
      setGalleryRefreshToggle((prev) => !prev);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeleteId)
      return toast.error("No image selected for deletion.");
    setIsUploading(true);
    try {
      await axios.delete(`/api/gallery/${selectedDeleteId}`, {
        withCredentials: true,
      });
      toast.success("Image deleted successfully.");
      setGalleryRefreshToggle((prev) => !prev);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchTrends();
    fetchRescueCount();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
        <div className="md:w-1/2 space-y-2">
          <h1 className="text-4xl font-extrabold text-amber-700">
            👋 Welcome, Admin!
          </h1>
          <p className="text-gray-600 text-lg">
            Here's an overview of recent stats and gallery management.
          </p>
        </div>
        <div className="md:w-1/4">
          <Lottie animationData={dogAnimation} loop />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-amber-100 p-6 rounded-2xl shadow-lg flex items-center gap-4"
          whileHover={{ scale: 1.03 }}
        >
          <FaDonate className="text-4xl text-amber-700" />
          <div>
            <p className="text-gray-600">Total Donations</p>
            <h2 className="text-3xl font-bold text-amber-900">
              {totalDonations}
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="bg-green-100 p-6 rounded-2xl shadow-lg flex items-center gap-4"
          whileHover={{ scale: 1.03 }}
        >
          <FaRupeeSign className="text-4xl text-green-700" />
          <div>
            <p className="text-gray-600">Total Amount</p>
            <h2 className="text-3xl font-bold text-green-900">
              ₹{totalAmount}
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-100 p-6 rounded-2xl shadow-lg flex items-center gap-4"
          whileHover={{ scale: 1.03 }}
        >
          <FaDog className="text-4xl text-blue-700" />
          <div>
            <p className="text-gray-600">Dogs Rescued</p>
            <h2 className="text-3xl font-bold text-blue-900">{rescueCount}</h2>
          </div>
        </motion.div>
      </div>

      {/* Toggle Gallery Upload */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowUploadSection(!showUploadSection)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow transition"
        >
          <FaImages />
          {showUploadSection ? "Hide Gallery Upload" : "Open Gallery Upload"}
        </button>
      </div>

      <AnimatePresence>
        {showUploadSection && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                <FaUpload /> Rescue Gallery Upload
              </h2>
              <AdminGalleryUpload
                onConfirmUpload={(file) => handleConfirmAction("upload", file)}
                onConfirmDelete={(id) => handleConfirmAction("delete", id)}
                refreshToggle={galleryRefreshToggle}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-3">
              {actionType === "upload" ? "Confirm Upload" : "Confirm Deletion"}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {actionType} this item?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={actionType === "upload" ? handleUpload : handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg min-w-[100px] flex justify-center items-center"
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
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default AdminHome;
