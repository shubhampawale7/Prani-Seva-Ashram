import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for exit animations
import confetti from "canvas-confetti";

import {
  FaDownload,
  FaReply,
  FaTrash,
  FaList,
  FaTh,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // Added more icons for sorting and pagination

import ReplyModal from "../../components/ReplyModal"; // Assuming this path is correct

const AdminInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Renamed for clarity
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyEmail, setReplyEmail] = useState("");
  const [toDeleteId, setToDeleteId] = useState(null);
  const [expandedInquiries, setExpandedInquiries] = useState({}); // To manage expanded message states
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 6;

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data } = await axios.get("/api/contact", {
        withCredentials: true,
      });
      setInquiries(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to fetch inquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = inquiries.filter((inq) =>
      [inq.name, inq.email, inq.message].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );

    data.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    setFiltered(data);
    setCurrentPage(1); // Reset to first page on search or sort change
  }, [search, inquiries, sortOrder]);

  // Pagination Logic
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filtered.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );
  const totalPages = Math.ceil(filtered.length / inquiriesPerPage);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Date", "Message", "Status"];
    const rows = inquiries.map((inq) => [
      inq.name,
      inq.email,
      new Date(inq.date).toLocaleString(),
      // Escape double quotes within the message for CSV
      `"${inq.message.replace(/"/g, '""')}"`,
      inq.isReplied ? "Replied" : "Pending",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inquiries.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
    toast.info("Inquiries exported to CSV!");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`, { withCredentials: true });
      toast.success("Inquiry deleted successfully!");
      fetchInquiries(); // Re-fetch inquiries to update the list
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Failed to delete inquiry. Please try again.");
    }
  };

  const handleReply = async (email, message) => {
    try {
      const res = await axios.post(
        "/api/contact/send-reply",
        { email, message },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Reply sent successfully!");
        setShowReplyModal(false);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        }); // Fun confetti effect
        // Update the inquiry status to replied
        setInquiries((prev) =>
          prev.map((inq) =>
            inq.email === email ? { ...inq, isReplied: true } : inq
          )
        );
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply. Please try again.");
    }
  };

  const toggleExpandMessage = (id) => {
    setExpandedInquiries((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the expanded state for the specific inquiry
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header and Controls */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">
          Inquiry Management Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-full md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          />

          {/* Sort Order */}
          <div className="flex items-center space-x-2">
            <label htmlFor="sortOrder" className="sr-only">
              Sort by
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="p-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition duration-200"
              aria-label={`Sort ${
                sortOrder === "newest" ? "Oldest First" : "Newest First"
              }`}
            >
              {sortOrder === "newest" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            </button>
          </div>

          {/* View Type Toggle */}
          <div className="flex gap-2 justify-end md:justify-start">
            <button
              onClick={() => setViewType("card")}
              className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                viewType === "card"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="Switch to Card View"
            >
              <FaTh className="mr-2" /> Card View
            </button>
            <button
              onClick={() => setViewType("table")}
              className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                viewType === "table"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="Switch to Table View"
            >
              <FaList className="mr-2" /> Table View
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:ring-green-500 focus:ring-offset-2 focus:ring-2 transition duration-200 ease-in-out"
          >
            <FaDownload className="mr-2" /> Export to CSV
          </button>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-center text-gray-500 text-lg">
            Loading inquiries...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500 text-xl">
          <p>No inquiries found matching your criteria.</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewType === "table" ? (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto bg-white rounded-xl shadow-md p-4"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentInquiries.map((inq) => (
                    <motion.tr
                      key={inq._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inq.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inq.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inq.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-sm overflow-hidden truncate">
                        {/* Always show "View More" in table if message is long */}
                        <p
                          className={`${
                            expandedInquiries[inq._id] ? "" : "line-clamp-2"
                          }`}
                        >
                          {inq.message}
                        </p>
                        {inq.message.length > 100 && ( // Adjust threshold as needed
                          <button
                            onClick={() => toggleExpandMessage(inq._id)}
                            className="text-blue-600 hover:text-blue-800 text-xs mt-1"
                          >
                            {expandedInquiries[inq._id]
                              ? "View Less"
                              : "View More"}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inq.isReplied
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {inq.isReplied ? "Replied" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => {
                              setReplyEmail(inq.email);
                              setShowReplyModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition"
                            aria-label="Reply to inquiry"
                          >
                            <FaReply size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setToDeleteId(inq._id);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                            aria-label="Delete inquiry"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              key="card-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
              {currentInquiries.map((inq) => (
                <motion.div
                  key={inq._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {inq.name}
                    </h3>
                    <p className="text-md text-blue-600 font-medium mb-2">
                      {inq.email}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(inq.date).toLocaleString()}
                    </p>
                    <p
                      className={`text-gray-700 mb-4 ${
                        expandedInquiries[inq._id] ? "" : "line-clamp-3"
                      }`}
                    >
                      {inq.message}
                    </p>
                    {inq.message.length > 150 && ( // Adjust threshold for card view
                      <button
                        onClick={() => toggleExpandMessage(inq._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-semibold mt-2"
                      >
                        {expandedInquiries[inq._id] ? "View Less" : "View More"}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        inq.isReplied
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {inq.isReplied ? "Replied" : "Pending"}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setReplyEmail(inq.email);
                          setShowReplyModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow"
                        aria-label="Reply to inquiry"
                      >
                        <FaReply size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setToDeleteId(inq._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-50 hover:bg-red-100 transition shadow"
                        aria-label="Delete inquiry"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none transition duration-200"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="mr-2" /> Previous
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none transition duration-200"
            aria-label="Next Page"
          >
            Next <FaChevronRight className="ml-2" />
          </button>
        </div>
      )}

      {/* Reply Modal */}
      <ReplyModal
        isOpen={showReplyModal}
        onSendReply={handleReply}
        onCancel={() => setShowReplyModal(false)}
        email={replyEmail}
      />

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl transform scale-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Are you sure you want to delete this inquiry? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setShowDeleteModal(false);
                    await handleDelete(toDeleteId);
                  }}
                  className="flex-1 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AdminInquiry;
