import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";
import {
  FaUserFriends,
  FaSearch,
  FaCalendarAlt,
  FaFileCsv,
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaEnvelope,
  FaPhone,
  FaCalendarCheck,
  FaExclamationCircle,
  FaInfoCircle,
  FaUsers,
  FaTimes, // For close button on modal
  FaCheckCircle, // For confirm button on modal
} from "react-icons/fa"; // Import relevant icons

// Professional Modal Component (Redesigned)
const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {title || "Confirm Action"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <p className="mb-6 text-gray-700">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          aria-label={cancelText}
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          aria-label={confirmText}
        >
          <FaCheckCircle /> {confirmText}
        </button>
      </div>
    </div>
  </div>
);

const VolunteerInquiry = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // For single delete modal
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false); // For bulk delete modal
  const itemsPerPage = 7; // Increased items per page for a slightly denser table

  const visibleColumns = [
    "name",
    "email",
    "phone",
    "age",
    "role",
    "availability",
    "message",
    "createdAt",
  ];

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("/api/volunteers");
        const data = await res.json();

        if (res.ok) {
          // Sort by createdAt descending by default
          const sortedData = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setVolunteers(sortedData);
          setFiltered(sortedData);
        } else {
          toast.error(data.message || "Failed to load volunteers");
        }
      } catch (err) {
        console.error("Error fetching volunteers:", err);
        toast.error("Something went wrong while loading volunteer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    let data = [...volunteers];

    if (search) {
      data = data.filter((v) =>
        `${v.name} ${v.email} ${v.role} ${v.message}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (startDate) {
      data = data.filter((v) => new Date(v.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      data = data.filter((v) => new Date(v.createdAt) <= new Date(endDate));
    }

    // Re-apply sorting after filtering
    const sorted = [...data].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === "createdAt") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFiltered(sorted);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [search, startDate, endDate, volunteers, sortKey, sortOrder]); // Added sortKey, sortOrder to dependencies

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/volunteers/${confirmDeleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVolunteers((prev) => prev.filter((v) => v._id !== confirmDeleteId));
        toast.success("Volunteer inquiry deleted successfully.");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete inquiry.");
      }
    } catch (err) {
      console.error("Error deleting volunteer:", err);
      toast.error("Failed to delete inquiry due to a network error.");
    } finally {
      setLoading(false);
      setConfirmDeleteId(null);
    }
  };

  const handleBulkDeleteConfirmed = async () => {
    setLoading(true);
    try {
      // Use Promise.all to send all delete requests concurrently
      await Promise.all(
        selected.map((id) =>
          fetch(`/api/volunteers/${id}`, { method: "DELETE" }).then((res) => {
            if (!res.ok) throw new Error(`Failed to delete ID: ${id}`);
            return res;
          })
        )
      );
      setVolunteers((prev) => prev.filter((v) => !selected.includes(v._id)));
      setSelected([]);
      toast.success(
        `Successfully deleted ${selected.length} selected inquiries.`
      );
    } catch (err) {
      console.error("Error during bulk delete:", err);
      toast.error("Failed to delete some or all selected inquiries.");
    } finally {
      setLoading(false);
      setConfirmBulkDelete(false);
    }
  };

  const exportToCSV = () => {
    if (filtered.length === 0) {
      toast.info("No data to export.");
      return;
    }
    const dataToExport = filtered.map((v) => ({
      Name: v.name,
      Email: v.email,
      Phone: v.phone,
      Age: v.age,
      Role: v.role,
      Availability: v.availability,
      Message: v.message,
      SubmittedAt: new Date(v.createdAt).toLocaleString(),
    }));
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `volunteer-inquiries-${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.click();
    toast.success("Volunteer inquiries exported to CSV.");
  };

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelected(paginated.map((v) => v._id));
    } else {
      setSelected([]);
    }
  };

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const totalInquiries = volunteers.length;
  const recentInquiries = volunteers.filter(
    (v) =>
      new Date(v.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length; // Inquiries in last 7 days

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
          <FaUserFriends className="text-amber-600" />
          Volunteer Inquiry Management
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage all volunteer applications and inquiries in one place.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 1: Total Inquiries */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-amber-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">
              Total Inquiries
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalInquiries}
            </h2>
          </div>
          <FaUsers className="text-amber-500 text-4xl opacity-75" />
        </div>

        {/* Card 2: Recent Inquiries (Last 7 Days) */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-indigo-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">
              Recent Inquiries (7 Days)
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {recentInquiries}
            </h2>
          </div>
          <FaCalendarCheck className="text-indigo-500 text-4xl opacity-75" />
        </div>
      </section>

      {/* Filters and Actions */}
      <section className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] max-w-xs">
          <label
            htmlFor="search-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Name, email, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 pl-10 border border-gray-300 rounded-md w-full focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              aria-label="Search volunteer inquiries"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label
            htmlFor="start-date-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            From Date
          </label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            aria-label="Filter start date"
          />
        </div>

        <div className="flex-1 min-w-[150px] max-w-[200px]">
          <label
            htmlFor="end-date-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To Date
          </label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            aria-label="Filter end date"
          />
        </div>

        <div className="flex gap-3 ml-auto">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-md"
            aria-label="Export all filtered data to CSV"
          >
            <FaFileCsv /> Export CSV
          </button>
          {selected.length > 0 && (
            <button
              onClick={() => setConfirmBulkDelete(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 shadow-md"
              aria-label={`Delete ${selected.length} selected inquiries`}
            >
              <FaTrash /> Delete Selected ({selected.length})
            </button>
          )}
        </div>
      </section>

      {/* Volunteer Inquiries Table */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaInfoCircle className="text-amber-600" />
          Inquiry Details
        </h3>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
            <p className="ml-4 text-gray-600">Loading volunteer inquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            <FaExclamationCircle className="text-amber-400 text-5xl mx-auto mb-3" />
            <p>No matching volunteer inquiries found.</p>
            <p className="mt-2 text-sm">Adjust your filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-amber-100 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllChange}
                      checked={
                        selected.length > 0 &&
                        paginated.every((v) => selected.includes(v._id))
                      }
                      className="form-checkbox h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                      aria-label="Select all visible inquiries"
                    />
                  </th>
                  {visibleColumns.map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-4 py-3 text-left cursor-pointer hover:bg-amber-200 transition-colors duration-150"
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === key
                          ? sortOrder === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSort(key);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {key.charAt(0).toUpperCase() +
                          key
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}{" "}
                        {/* Format camelCase */}
                        {sortKey === key ? (
                          sortOrder === "asc" ? (
                            <FaSortAlphaUp size={12} />
                          ) : (
                            <FaSortAlphaDown size={12} />
                          )
                        ) : null}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="px-4 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginated.map((v) => (
                  <tr
                    key={v._id}
                    className="hover:bg-amber-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(v._id)}
                        onChange={() => handleCheckboxChange(v._id)}
                        className="form-checkbox h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                        aria-label={`Select inquiry from ${v.name}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {v.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 hover:underline">
                      <a
                        href={`mailto:${v.email}`}
                        className="flex items-center gap-1"
                      >
                        <FaEnvelope size={12} /> {v.email || "N/A"}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <a
                        href={`tel:${v.phone}`}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FaPhone size={12} /> {v.phone || "N/A"}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {v.age || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {v.role || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {v.availability || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis whitespace-pre-line">
                      {v.message || "-"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(v.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setConfirmDeleteId(v._id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-150 p-1 rounded-full hover:bg-red-100"
                        title={`Delete inquiry from ${v.name}`}
                        aria-label={`Delete inquiry from ${v.name}`}
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6 py-3 px-4 bg-gray-50 rounded-lg shadow-inner">
            <span className="text-gray-600 text-sm">
              Showing{" "}
              {Math.min(filtered.length, (currentPage - 1) * itemsPerPage + 1)}{" "}
              - {Math.min(filtered.length, currentPage * itemsPerPage)} of{" "}
              {filtered.length} entries
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                aria-label="Previous page"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? "bg-amber-600 text-white shadow-md"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    } transition-colors duration-200`}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Confirm Delete Modal for single */}
      {confirmDeleteId && (
        <ConfirmModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this volunteer inquiry? This action cannot be undone."
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
          confirmText="Delete"
        />
      )}

      {/* Confirm Delete Modal for bulk */}
      {confirmBulkDelete && (
        <ConfirmModal
          title="Confirm Bulk Deletion"
          message={`Are you sure you want to delete ${selected.length} selected volunteer inquiries? This action cannot be undone.`}
          onConfirm={handleBulkDeleteConfirmed}
          onCancel={() => setConfirmBulkDelete(false)}
          confirmText="Delete All"
        />
      )}
    </div>
  );
};

export default VolunteerInquiry;
