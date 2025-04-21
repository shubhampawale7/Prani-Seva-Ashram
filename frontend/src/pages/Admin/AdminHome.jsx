/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import dogAnimation from "../../assets/lotties/dog-hello.json";
import axios from "axios";
import AdminGalleryUpload from "./AdminGalleryUpload";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const AdminHome = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [rescueCount, setRescueCount] = useState(0);

  const [donationsOpen, setDonationsOpen] = useState(false);
  const [rescuesOpen, setRescuesOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [galleryRefreshToggle, setGalleryRefreshToggle] = useState(false); // Used to trigger re-fetch in AdminGalleryUpload

  const toggleDonations = () => setDonationsOpen(!donationsOpen);
  const toggleRescues = () => setRescuesOpen(!rescuesOpen);

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

  const handleLogout = () => {
    axios
      .post("/api/auth/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
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
    <section className="flex max-w-7xl mx-auto px-4 py-10">
      {/* Sidebar */}
      {/* <div className="w-1/4 min-h-full bg-gradient-to-r from-amber-500 to-yellow-400 p-6 rounded-lg shadow-xl flex flex-col">
        <h2 className="text-2xl font-semibold text-white mb-6">Admin Panel</h2>
        <div className="flex-grow">
          <ul className="space-y-4">
            <li>
              <button
                onClick={toggleDonations}
                className="text-lg text-white hover:text-yellow-100 transition w-full text-left"
              >
                Donations
              </button>
              {donationsOpen && (
                <ul className="pl-6 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/admin/donations"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      View Donations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/donation-trends"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      Donation Trends
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/average-donations"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      Average Donations
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={toggleRescues}
                className="text-lg text-white hover:text-yellow-100 transition w-full text-left"
              >
                Rescues
              </button>
              {rescuesOpen && (
                <ul className="pl-6 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/admin/rescues"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      View Rescues
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/track-rescues"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      Track Rescues
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/add-edit-rescue"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      Add/Edit Rescues
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/rescue-stats"
                      className="text-white hover:text-yellow-100 transition"
                    >
                      Rescue Stats
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/admin/inquiries"
                className="text-lg text-white hover:text-yellow-100 transition w-full text-left"
              >
                View Inquiries
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="text-lg text-red-700 hover:text-red-900"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="flex justify-center mt-6">
          <Lottie animationData={dogAnimation} loop={true} className="w-20" />
        </div>
      </div> */}

      {/* Main Content */}
      <div className="w-full ml-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-amber-700">
              Welcome, Admin 🐾
            </h1>
            <p className="text-gray-700 text-lg">
              Here’s an overview of Prani Seva Ashram’s recent activities and
              stats.
            </p>
          </div>
          <div className="md:w-1/6 max-w-sm">
            <Lottie animationData={dogAnimation} loop={true} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            className="bg-amber-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Total Donations
            </h2>
            <p className="text-3xl font-bold text-amber-900">
              {totalDonations}
            </p>
          </motion.div>

          <motion.div
            className="bg-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Total Amount
            </h2>
            <p className="text-3xl font-bold text-green-900">₹{totalAmount}</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Dogs Rescued
            </h2>
            <p className="text-3xl font-bold text-blue-900">{rescueCount}</p>
          </motion.div>
        </div>

        {/* Gallery Upload */}
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-amber-700 mb-4">
            📸 Rescue Gallery Upload
          </h2>
          <AdminGalleryUpload
            onConfirmUpload={(file) => handleConfirmAction("upload", file)}
            onConfirmDelete={(id) => handleConfirmAction("delete", id)}
            refreshToggle={galleryRefreshToggle}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {actionType === "upload" ? "Confirm Upload" : "Confirm Deletion"}
            </h3>
            <p className="mb-4">
              Are you sure you want to {actionType} this item?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={actionType === "upload" ? handleUpload : handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg min-w-[100px] flex justify-center items-center"
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
