import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import {
  FaEnvelope,
  FaUser,
  FaRegClock,
  FaCommentDots,
  FaDownload,
  FaTrash,
  FaList,
  FaTh,
  FaReply,
} from "react-icons/fa";
import ReplyModal from "../../components/ReplyModal";
import AdminLayout from "../../components/AdminLayout";

const AdminInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewType, setViewType] = useState("card");
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyEmail, setReplyEmail] = useState("");
  const [toDeleteId, setToDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 6;

  const fetchInquiries = async () => {
    try {
      const { data } = await axios.get("/api/contact", {
        withCredentials: true,
      });
      setInquiries(data);
      setFiltered(data);
    } catch (error) {
      toast.error("Failed to fetch inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let data = inquiries.filter(
      (inq) =>
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.message.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    setFiltered(data);
    setCurrentPage(1);
  }, [search, inquiries, sortOrder]);

  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / inquiriesPerPage);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Date", "Message"];
    const rows = inquiries.map((inq) => [
      inq.name,
      inq.email,
      new Date(inq.date).toLocaleString(),
      `"${inq.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "inquiries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`, { withCredentials: true });
      toast.success("Inquiry deleted");
      fetchInquiries();
    } catch (error) {
      toast.error("Failed to delete inquiry");
    }
  };

  const openModal = (id) => {
    setToDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    await handleDelete(toDeleteId);
  };

  const openReplyModal = (email) => {
    setReplyEmail(email);
    setShowReplyModal(true);
  };

  const handleReply = async (email, message) => {
    try {
      const response = await axios.post(
        "/api/contact/send-reply",
        { email, message },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Reply sent successfully!");
        setShowReplyModal(false);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setInquiries((prev) =>
          prev.map((inq) =>
            inq._id === inquiries._id ? { ...inq, isReplied: true } : inq
          )
        );
      }
    } catch (error) {
      console.error("Error sending reply: ", error);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-amber-600">
            Admin Dashboard - Inquiries
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-500"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              onClick={() =>
                setViewType((prev) => (prev === "card" ? "table" : "card"))
              }
              className="px-3 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 flex items-center gap-2"
            >
              {viewType === "card" ? (
                <>
                  <FaList /> Table View
                </>
              ) : (
                <>
                  <FaTh /> Card View
                </>
              )}
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center gap-2"
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No inquiries found.
          </div>
        ) : viewType === "table" ? (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-amber-100 text-amber-700">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((inq) => (
                  <tr key={inq._id} className="border-t">
                    <td className="px-4 py-3">{inq.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(inq.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <details className="group cursor-pointer">
                        <summary className="outline-none text-blue-700 hover:underline">
                          {inq.message.length > 30
                            ? inq.message.slice(0, 30) + "..."
                            : inq.message}
                        </summary>
                        <p className="mt-2 text-gray-600">{inq.message}</p>
                      </details>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => openModal(inq._id)}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => openReplyModal(inq.email)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaReply /> Reply
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {inq.isReplied ? (
                        <span className="text-green-600">Replied ✅</span>
                      ) : (
                        <span className="text-yellow-600">Pending ⏳</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentInquiries.map((inq) => (
              <motion.div
                key={inq._id}
                className="bg-white border rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">{inq.name}</h3>
                <p className="text-gray-500">{inq.email}</p>
                <p className="text-sm text-gray-600 mt-2">{inq.message}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => openModal(inq._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => openReplyModal(inq.email)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaReply /> Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={showReplyModal}
        onSendReply={handleReply}
        onCancel={() => setShowReplyModal(false)}
        email={replyEmail}
      />

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this inquiry?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiry;
