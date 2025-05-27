import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const AdminAdoptionEnquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          "/api/admin-inquiries/adoption-inquiries",
          { withCredentials: true }
        );
        setInquiries(response.data);
      } catch (error) {
        toast.error("Error fetching adoption inquiries.");
        console.error("Error fetching inquiries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `/api/admin-inquiries/adoption-inquiries/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Marked as ${newStatus}`);
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (error) {
      toast.error("Failed to update status.");
      console.error("Status update error:", error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `/api/admin-inquiries/adoption-inquiries/${deleteId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Inquiry deleted successfully.");
      setInquiries((prev) => prev.filter((inq) => inq._id !== deleteId));
    } catch (error) {
      toast.error("Failed to delete inquiry.");
      console.error("Delete error:", error);
    }
  };

  const filteredInquiries =
    filterStatus === "all"
      ? inquiries
      : inquiries.filter((inq) => inq.status === filterStatus);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-semibold text-amber-800 mb-4">
        Adoption Inquiries
      </h2>

      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <label className="text-sm text-gray-600">Filter by status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-amber-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-6 w-6 text-amber-600" />
          <span className="ml-2 text-amber-700">Loading...</span>
        </div>
      ) : filteredInquiries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-amber-700 mb-1">
                {inquiry.name}
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Email:</strong> {inquiry.email}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Phone:</strong> {inquiry.phone}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Reason:</strong> {inquiry.reason}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Dog:</strong> {inquiry.dog?.name || "N/A"}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    inquiry.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : inquiry.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {inquiry.status || "pending"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(inquiry._id, "approved")}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(inquiry._id, "rejected")}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                  <Dialog.Root>
                    <Dialog.Trigger
                      onClick={() => confirmDelete(inquiry._id)}
                      className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0  bg-opacity-30" />
                      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-50 p-4 rounded-lg shadow-lg max-w-xs w-full border">
                        <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800">
                          Confirm Deletion
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-600 mb-4">
                          Are you sure you want to delete this inquiry? This
                          action cannot be undone.
                        </Dialog.Description>
                        <div className="flex justify-end gap-3">
                          <Dialog.Close
                            as="button"
                            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            Cancel
                          </Dialog.Close>
                          <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No matching inquiries found.
        </div>
      )}
    </div>
  );
};

export default AdminAdoptionEnquiries;
