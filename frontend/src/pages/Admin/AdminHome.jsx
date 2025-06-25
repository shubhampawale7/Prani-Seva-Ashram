import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AdminGalleryUpload from "./AdminGalleryUpload";
import { Dialog } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import {
  FaDollarSign,
  FaChartBar,
  FaImages,
  FaHandHoldingHeart,
  FaCloudUploadAlt,
  FaEyeSlash,
  FaGlobe, // For website visitors/pages
  FaHeartbeat, // For uptime status
  FaHistory, // For Recent Activity
  FaBolt, // For Quick Actions
  FaTasks, // For Pending Items
  FaChartLine, // For Data Visualizations
} from "react-icons/fa";
import { Link } from "react-router-dom";

// NEW: Import the chart component
import DonationChart from "../../components/DonationChart"; // Adjust path as needed

const AdminHome = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFileForUpload, setSelectedFileForUpload] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [galleryRefreshToggle, setGalleryRefreshToggle] = useState(false);
  const [showGallerySection, setShowGallerySection] = useState(false);

  // States for website health and performance metrics
  const [websiteVisitorsToday, setWebsiteVisitorsToday] = useState(0);
  const [pagesViewedToday, setPagesViewedToday] = useState(0);
  const [uptimeStatus, setUptimeStatus] = useState("Checking...");
  const [lastMetricsUpdate, setLastMetricsUpdate] = useState(null);

  // States for dashboard enhancements
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingInquiriesCount, setPendingInquiriesCount] = useState(0);
  const [
    pendingVolunteerApplicationsCount,
    setPendingVolunteerApplicationsCount,
  ] = useState(0);

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

  const fetchWebsiteTraffic = async () => {
    try {
      const { data } = await axios.get("/api/metrics/website-traffic", {
        withCredentials: true,
      });
      setWebsiteVisitorsToday(data?.visitorsToday || 0);
      setPagesViewedToday(data?.pagesViewed || 0);
    } catch (err) {
      console.error("Error fetching website traffic:", err);
      toast.error("Failed to load website traffic data.");
    }
  };

  const checkUptimeStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/health", {
        timeout: 5000,
        withCredentials: true,
      });
      if (response.status === 200 && response.data.status === "operational") {
        setUptimeStatus("Operational");
      } else {
        setUptimeStatus("Degraded");
      }
    } catch (err) {
      console.error("Error checking uptime status:", err);
      setUptimeStatus("Down");
    }
  };

  const fetchRecentActivities = async () => {
    const mockActivities = [
      {
        id: 1,
        type: "Donation",
        description: "New donation received from John D.",
        time: "5 minutes ago",
      },
      {
        id: 2,
        type: "Gallery Update",
        description: "New image 'Sunset_Rescue.jpg' uploaded.",
        time: "1 hour ago",
      },
      {
        id: 3,
        type: "Inquiry",
        description: "New contact inquiry from Jane S.",
        time: "3 hours ago",
      },
      {
        id: 4,
        type: "Donation",
        description: "Donation of ₹5,000 from Anonymous.",
        time: "Yesterday",
      },
      {
        id: 5,
        type: "Volunteer",
        description: "New volunteer application received.",
        time: "2 days ago",
      },
    ];
    setRecentActivities(mockActivities);
  };

  const fetchPendingItems = async () => {
    setPendingInquiriesCount(Math.floor(Math.random() * 5));
    setPendingVolunteerApplicationsCount(Math.floor(Math.random() * 3));
  };

  const handleConfirmAction = (type, data) => {
    setActionType(type);
    if (type === "upload") {
      setSelectedFileForUpload(data);
      setSelectedDeleteId(null);
    } else if (type === "delete") {
      setSelectedDeleteId(data);
      setSelectedFileForUpload(null);
    }
    setIsModalOpen(true);
  };

  const handleUploadConfirmed = async () => {
    if (!selectedFileForUpload) {
      toast.error("No image selected for upload.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", selectedFileForUpload);

    try {
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image uploaded successfully!");
      setGalleryRefreshToggle((prev) => !prev);
      setSelectedFileForUpload(null);
      fetchRecentActivities();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.response?.data?.error || "Image upload failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedDeleteId) {
      toast.error("No image selected for deletion.");
      return;
    }
    setIsUploading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/gallery/${selectedDeleteId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Image deleted successfully!");
      setGalleryRefreshToggle((prev) => !prev);
      setSelectedDeleteId(null);
      fetchRecentActivities();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.response?.data?.error || "Image deletion failed.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchTrends(),
        fetchWebsiteTraffic(),
        checkUptimeStatus(),
        fetchRecentActivities(),
        fetchPendingItems(),
      ]);
      setLastMetricsUpdate(new Date());
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Refresh every 60 seconds

    return () => clearInterval(intervalId);
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

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-gray-100 min-h-full p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
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
          {lastMetricsUpdate && (
            <p className="text-sm text-gray-500 mt-2">
              Metrics Last Updated: {lastMetricsUpdate.toLocaleString()}
            </p>
          )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Website Visitors Today Card */}
            <motion.div
              className="bg-purple-50 rounded-lg p-5 flex items-center justify-between border border-purple-100 shadow-sm"
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Website Visitors Today
                </p>
                <h3 className="text-3xl font-extrabold text-purple-800 mt-1">
                  {websiteVisitorsToday}
                </h3>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <FaGlobe className="text-2xl text-purple-700" />
              </div>
            </motion.div>

            {/* Pages Viewed Today Card */}
            <motion.div
              className="bg-indigo-50 rounded-lg p-5 flex items-center justify-between border border-indigo-100 shadow-sm"
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Pages Viewed Today
                </p>
                <h3 className="text-3xl font-extrabold text-indigo-800 mt-1">
                  {pagesViewedToday}
                </h3>
              </div>
              <div className="bg-indigo-200 p-3 rounded-full">
                <FaChartBar className="text-2xl text-indigo-700" />
              </div>
            </motion.div>

            {/* Uptime Status Card */}
            <motion.div
              className={`rounded-lg p-5 flex items-center justify-between border shadow-sm ${
                uptimeStatus === "Operational"
                  ? "bg-green-50 border-green-100"
                  : uptimeStatus === "Degraded"
                  ? "bg-yellow-50 border-yellow-100"
                  : "bg-red-50 border-red-100"
              }`}
              variants={cardVariants}
              whileHover={{
                translateY: -5,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">
                  Uptime Status
                </p>
                <h3
                  className={`text-3xl font-extrabold mt-1 ${
                    uptimeStatus === "Operational"
                      ? "text-green-800"
                      : uptimeStatus === "Degraded"
                      ? "text-yellow-800"
                      : "text-red-800"
                  }`}
                >
                  {uptimeStatus}
                </h3>
              </div>
              <div
                className={`p-3 rounded-full ${
                  uptimeStatus === "Operational"
                    ? "bg-green-200"
                    : uptimeStatus === "Degraded"
                    ? "bg-yellow-200"
                    : "bg-red-200"
                }`}
              >
                <FaHeartbeat
                  className={`text-2xl ${
                    uptimeStatus === "Operational"
                      ? "text-green-700"
                      : uptimeStatus === "Degraded"
                      ? "text-yellow-700"
                      : "text-red-700"
                  }`}
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* <motion.section
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center mb-6 border-b pb-4 border-gray-200">
            <FaChartLine className="mr-4 text-cyan-600 text-3xl" /> Donation
            Trends
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Visualize your donation data over time to identify key trends and
            patterns.
          </p>
        </motion.section> */}

        {/* Gallery Management Section (Existing) */}
        <motion.section
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
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
