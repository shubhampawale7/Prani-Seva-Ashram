/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Styles for date picker
import Papa from "papaparse";
import _ from "lodash"; // Import lodash for utility functions

import {
  FaHandHoldingHeart,
  FaChartLine,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaFileCsv,
  FaChartBar,
  FaFilter,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaEdit,
  FaDownload,
  FaPrint,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSearch,
  FaChartPie, // New icon for Pie chart
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart, // For cumulative chart
  Line,
  PieChart, // For pie chart
  Pie,
  Cell, // For pie chart colors
} from "recharts";

// --- Sub-component: DonationDetailModal ---
const DonationDetailModal = ({
  donation,
  onClose,
  onUpdateStatus,
  onAddNote,
}) => {
  const [newNote, setNewNote] = useState("");
  const [editingStatus, setEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    donation.status || "Pending"
  ); // Default status

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processed: "bg-green-100 text-green-800",
    Refunded: "bg-red-100 text-red-800",
    "On Hold": "bg-blue-100 text-blue-800",
  };

  const handleSaveStatus = () => {
    onUpdateStatus(donation._id, selectedStatus);
    setEditingStatus(false);
  };

  const handleAddNoteClick = () => {
    if (newNote.trim()) {
      onAddNote(donation._id, newNote.trim());
      setNewNote("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaInfoCircle className="text-blue-600" /> Donation Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
            aria-label="Close modal"
          >
            <FaTimesCircle size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-500">Donor Name</p>
            <p className="text-lg text-gray-900">
              {donation.name || "Anonymous"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Email</p>
            <p className="text-lg text-blue-600 hover:underline flex items-center gap-2">
              <FaEnvelope size={16} />
              <a href={`mailto:${donation.email}`}>{donation.email || "N/A"}</a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Phone</p>
            <p className="text-lg text-gray-900 flex items-center gap-2">
              <FaPhone size={16} />
              <a href={`tel:${donation.phone}`}>{donation.phone || "N/A"}</a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Amount</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{donation.amount.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Payment ID</p>
            <p className="text-lg text-gray-700 break-all">
              {donation.paymentId || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Donation Date</p>
            <p className="text-lg text-gray-700">
              {new Date(donation.date).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-gray-500">Message</p>
            <p className="text-lg text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-md border border-gray-200">
              {donation.message || "No message provided."}
            </p>
          </div>
        </div>

        {/* Status Management */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Donation Status
            </h3>
            {!editingStatus && (
              <button
                onClick={() => setEditingStatus(true)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors duration-200"
              >
                <FaEdit size={14} /> Edit Status
              </button>
            )}
          </div>
          {editingStatus ? (
            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow"
              >
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
                <option value="Refunded">Refunded</option>
                <option value="On Hold">On Hold</option>
              </select>
              <button
                onClick={handleSaveStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditingStatus(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                statusColors[donation.status || "Pending"]
              }`}
            >
              <FaClock className="mr-2" /> {donation.status || "Pending"}
            </span>
          )}
        </div>

        {/* Internal Notes */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
            <FaCommentDots className="text-purple-500" /> Internal Notes
          </h3>
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-2">
            {donation.notes && donation.notes.length > 0 ? (
              donation.notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-3 rounded-md border border-gray-200 text-sm"
                >
                  <p className="text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Added by Admin on{" "}
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No notes for this donation yet.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new internal note..."
              rows="2"
              className="flex-grow px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 resize-y"
            ></textarea>
            <button
              onClick={handleAddNoteClick}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 self-start"
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
// --- End Sub-component: DonationDetailModal ---

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Increased items per page for more data view

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all"); // 'all', 'name', 'email', 'paymentId'
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 'All', 'Pending', 'Processed', 'Refunded', 'On Hold'
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("All"); // 'All', 'Razorpay', 'Stripe', 'Bank Transfer', etc.
  const [dateRangePreset, setDateRangePreset] = useState("All Time");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  // Modal States
  const [selectedDonation, setSelectedDonation] = useState(null); // For viewing details
  const [showPrintView, setShowPrintView] = useState(false); // For print functionality

  // Chart States
  const [chartType, setChartType] = useState("dailyBar"); // 'dailyBar', 'cumulativeLine', 'topDonorsPie'

  // Ref for table header for sticky effect
  const tableHeaderRef = useRef(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Initial fetch of donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("/api/donate", { withCredentials: true });
        // Assuming backend returns a 'status' and 'notes' field for each donation
        // If not, you might need to add dummy data or update your backend.
        const dataWithDefaults = res.data
          .map((d) => ({
            ...d,
            status: d.status || "Pending", // Ensure status exists
            notes: d.notes || [], // Ensure notes array exists
            paymentMethod: d.paymentMethod || "Unknown", // Assuming paymentMethod exists
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending by default

        setDonations(dataWithDefaults);
        setFilteredDonations(dataWithDefaults); // Initialize filtered with all donations
      } catch (err) {
        toast.error("Failed to fetch donations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // --- Filtering and Sorting Logic ---
  useEffect(() => {
    let data = [...donations];

    // Search Filtering
    if (searchTerm) {
      data = data.filter((d) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if (searchField === "all") {
          return (
            (d.name && d.name.toLowerCase().includes(lowerSearchTerm)) ||
            (d.email && d.email.toLowerCase().includes(lowerSearchTerm)) ||
            (d.paymentId &&
              d.paymentId.toLowerCase().includes(lowerSearchTerm)) ||
            (d.message && d.message.toLowerCase().includes(lowerSearchTerm))
          );
        } else if (d[searchField]) {
          return String(d[searchField]).toLowerCase().includes(lowerSearchTerm);
        }
        return false;
      });
    }

    // Amount Range Filtering
    if (amountMin !== "" && !isNaN(parseFloat(amountMin))) {
      data = data.filter((d) => d.amount >= parseFloat(amountMin));
    }
    if (amountMax !== "" && !isNaN(parseFloat(amountMax))) {
      data = data.filter((d) => d.amount <= parseFloat(amountMax));
    }

    // Status Filtering
    if (statusFilter !== "All") {
      data = data.filter((d) => d.status === statusFilter);
    }

    // Payment Type Filtering
    if (paymentTypeFilter !== "All") {
      data = data.filter((d) => d.paymentMethod === paymentTypeFilter);
    }

    // Date Range Filtering
    let filterStartDate = customStartDate;
    let filterEndDate = customEndDate;

    if (dateRangePreset !== "All Time") {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      switch (dateRangePreset) {
        case "Last 7 Days":
          filterStartDate = new Date(startOfToday);
          filterStartDate.setDate(startOfToday.getDate() - 6);
          break;
        case "Last 30 Days":
          filterStartDate = new Date(startOfToday);
          filterStartDate.setDate(startOfToday.getDate() - 29);
          break;
        case "This Month":
          filterStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
          filterEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of month
          break;
        case "Last Quarter":
          const currentMonth = now.getMonth();
          const quarterStartMonth = currentMonth - (currentMonth % 3) - 3;
          filterStartDate = new Date(now.getFullYear(), quarterStartMonth, 1);
          filterEndDate = new Date(now.getFullYear(), quarterStartMonth + 3, 0);
          break;
        case "This Year":
          filterStartDate = new Date(now.getFullYear(), 0, 1);
          filterEndDate = new Date(now.getFullYear(), 11, 31);
          break;
        default:
          break;
      }
    }

    if (filterStartDate) {
      data = data.filter((d) => new Date(d.date) >= filterStartDate);
    }
    if (filterEndDate) {
      // Set end date to end of day
      const endOfDay = new Date(filterEndDate);
      endOfDay.setHours(23, 59, 59, 999);
      data = data.filter((d) => new Date(d.date) <= endOfDay);
    }

    // Sorting
    const sortedData = _.orderBy(data, [sortKey], [sortOrder]);
    setFilteredDonations(sortedData);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [
    donations,
    searchTerm,
    searchField,
    amountMin,
    amountMax,
    statusFilter,
    paymentTypeFilter,
    dateRangePreset,
    customStartDate,
    customEndDate,
    sortKey,
    sortOrder,
  ]);

  // --- Computed Values ---
  const totalAmount = _.sumBy(filteredDonations, "amount");
  const totalDonors = _.uniqBy(filteredDonations, "email").length;
  const averageDonation =
    filteredDonations.length > 0 ? totalAmount / filteredDonations.length : 0;
  const latestDonationDate = filteredDonations[0]
    ? new Date(filteredDonations[0].date).toLocaleDateString("en-IN")
    : "N/A";

  // --- CSV Export Function ---
  const exportToCSV = () => {
    if (filteredDonations.length === 0) {
      toast.info("No donation data to export based on current filters.");
      return;
    }

    const dataToExport = filteredDonations.map((d) => ({
      "Donor Name": d.name || "Anonymous",
      Email: d.email || "N/A",
      "Amount (INR)": d.amount,
      Message: d.message || "-",
      "Payment ID": d.paymentId || "-",
      Status: d.status || "N/A",
      "Payment Method": d.paymentMethod || "N/A",
      Date: new Date(d.date).toLocaleString("en-IN"),
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `donations-report-${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.click();
    toast.success("Donations data exported to CSV successfully!");
  };

  // --- Print Functionality ---
  const handlePrint = () => {
    setShowPrintView(true);
    // Use a timeout to ensure state update and render before printing
    setTimeout(() => {
      window.print();
      setShowPrintView(false); // Hide print view after printing
    }, 500);
  };

  // --- Table Specifics ---
  const visibleColumns = [
    { key: "name", label: "Donor Name" },
    { key: "email", label: "Email" },
    // { key: "phone", label: "Phone" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" }, // New column
    // { key: "paymentMethod", label: "P. Method" }, // New column
    { key: "paymentId", label: "Payment ID" },
    { key: "message", label: "Message" },
    { key: "date", label: "Date" }, // Using 'date' as the key directly for sorting
  ];

  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  // --- Modal / Details Logic ---
  const handleRowClick = (donation) => {
    setSelectedDonation(donation);
  };

  const handleUpdateDonationStatus = async (donationId, newStatus) => {
    // This part requires a backend API to update the status
    toast.info(`Updating status for ${donationId} to ${newStatus}...`);
    try {
      const res = await axios.put(
        `/api/donate/${donationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setDonations((prev) =>
          prev.map((d) =>
            d._id === donationId ? { ...d, status: newStatus } : d
          )
        );
        toast.success("Donation status updated!");
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status. Check console.");
    }
  };

  const handleAddDonationNote = async (donationId, noteText) => {
    // This part requires a backend API to add a note
    toast.info(`Adding note to ${donationId}...`);
    try {
      const newNote = { text: noteText, timestamp: new Date().toISOString() }; // Admin ID would come from auth context
      const res = await axios.post(
        `/api/donate/${donationId}/notes`,
        { note: newNote },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setDonations((prev) =>
          prev.map((d) =>
            d._id === donationId ? { ...d, notes: [...d.notes, newNote] } : d
          )
        );
        setSelectedDonation((prev) => ({
          ...prev,
          notes: [...prev.notes, newNote],
        })); // Update modal state directly
        toast.success("Note added successfully!");
      } else {
        toast.error("Failed to add note.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Error adding note. Check console.");
    }
  };

  // --- Chart Data Processing ---
  // Memoize chart data to avoid re-calculating on every render if dependencies don't change
  const processedChartData = useMemo(() => {
    if (filteredDonations.length === 0)
      return { dailyBar: [], cumulativeLine: [], topDonorsPie: [] };

    // Daily Bar Chart Data
    const dailyData = _.chain(filteredDonations)
      .groupBy((d) =>
        new Date(d.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      )
      .map((donationsInDay, date) => ({
        date: date,
        "Amount Donated": _.sumBy(donationsInDay, "amount"),
      }))
      .sortBy((d) => new Date(d.date))
      .value();

    // Cumulative Line Chart Data
    let cumulativeSum = 0;
    const cumulativeData = dailyData.map((d) => {
      cumulativeSum += d["Amount Donated"];
      return { ...d, "Cumulative Amount": cumulativeSum };
    });

    // Top Donors Pie Chart Data
    const topDonorsData = _.chain(filteredDonations)
      .groupBy("email")
      .map((donationsByDonor, email) => ({
        donor: donationsByDonor[0].name || email, // Use name if available, else email
        amount: _.sumBy(donationsByDonor, "amount"),
      }))
      .sortBy("amount") // Sort to easily get top
      .reverse() // Descending order
      .slice(0, 10) // Top 10 donors
      .value();

    return {
      dailyBar: dailyData,
      cumulativeLine: cumulativeData,
      topDonorsPie: topDonorsData,
    };
  }, [filteredDonations]);

  // --- Sticky Header Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSticky(!entry.isIntersecting);
      },
      { threshold: [0] } // Trigger when 0% of the target is visible
    );

    const currentHeader = tableHeaderRef.current;
    if (currentHeader) {
      observer.observe(currentHeader);
    }

    return () => {
      if (currentHeader) {
        observer.unobserve(currentHeader);
      }
    };
  }, [loading]); // Re-observe when loading state changes (table re-renders)

  const PIE_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF00FF",
    "#00FFFF",
    "#FF0000",
    "#00FF00",
    "#FFFF00",
  ];

  return (
    <div
      className={`min-h-screen bg-gray-100 p-6 sm:p-10 font-sans ${
        showPrintView ? "print-layout" : ""
      }`}
    >
      {/* Print View Specific Header (hidden normally) */}
      {showPrintView && (
        <div className="hidden print:block text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Donation Report</h1>
          <p className="text-gray-600">
            Generated on {new Date().toLocaleDateString("en-IN")} at{" "}
            {new Date().toLocaleTimeString("en-IN")}
          </p>
          <p className="text-gray-600">
            Filters:{" "}
            {searchTerm ? `Search: ${searchTerm} in ${searchField}` : "None"} |
            Amount: {amountMin}-${amountMax} | Status: {statusFilter} | Date:{" "}
            {dateRangePreset}
          </p>
        </div>
      )}

      <header className="mb-8 text-center no-print">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
          <FaHandHoldingHeart className="text-green-600" />
          Donation Management Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Overview of all received donations and key metrics.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 no-print">
        {/* Total Donations */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-green-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl group"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">Total Donors</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {donations.length}
            </h2>
          </div>
          <FaChartLine className="text-green-500 text-4xl opacity-75 group-hover:text-green-600 transition-colors duration-300" />
        </div>

        {/* Total Donors */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-indigo-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl group"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">Unique Donors</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalDonors}
            </h2>
          </div>
          <FaUser className="text-indigo-500 text-4xl opacity-75 group-hover:text-indigo-600 transition-colors duration-300" />
        </div>

        {/* Total Amount Donated */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-yellow-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl group"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">Total Amount</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              ₹{totalAmount.toLocaleString("en-IN")}
            </h2>
          </div>
          <FaMoneyBillWave className="text-yellow-500 text-4xl opacity-75 group-hover:text-yellow-600 transition-colors duration-300" />
        </div>

        {/* Average Donation Amount */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-b-4 border-blue-500
                    transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl group"
        >
          <div>
            <p className="text-gray-600 text-sm font-semibold">Avg. Donation</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              ₹
              {averageDonation.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
          <FaDollarSign className="text-blue-500 text-4xl opacity-75 group-hover:text-blue-600 transition-colors duration-300" />
        </div>
      </section>

      {/* Advanced Filters and Actions */}
      <section className="bg-white rounded-xl shadow-lg p-6 mb-8 no-print">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaFilter className="text-gray-600" /> Advanced Filters & Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div>
            <label
              htmlFor="search-field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search By
            </label>
            <select
              id="search-field"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            >
              <option value="all">All Fields</option>
              <option value="name">Donor Name</option>
              <option value="email">Email</option>
              <option value="paymentId">Payment ID</option>
            </select>
          </div>
          <div className="md:col-span-1 lg:col-span-3">
            {" "}
            {/* Span remaining columns for actual search input */}
            <label
              htmlFor="search-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Term
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 pl-10 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                aria-label="Search donations"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label
              htmlFor="amount-min"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Amount
            </label>
            <input
              id="amount-min"
              type="number"
              placeholder="Min"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
              aria-label="Minimum amount"
            />
          </div>
          <div>
            <label
              htmlFor="amount-max"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Amount
            </label>
            <input
              id="amount-max"
              type="number"
              placeholder="Max"
              value={amountMax}
              onChange={(e) => setAmountMax(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
              aria-label="Maximum amount"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processed">Processed</option>
              <option value="Refunded">Refunded</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Payment Type Filter */}
          {/* <div>
            <label
              htmlFor="payment-type-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Type
            </label>
            <select
              id="payment-type-filter"
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
            >
              <option value="All">All Types</option>
              <option value="Razorpay">Razorpay</option>
              <option value="Stripe">Stripe</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div> */}

          {/* Date Range Presets */}
          <div>
            <label
              htmlFor="date-range-preset"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Range
            </label>
            <select
              id="date-range-preset"
              value={dateRangePreset}
              onChange={(e) => {
                setDateRangePreset(e.target.value);
                setCustomStartDate(null);
                setCustomEndDate(null);
              }}
              className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
            >
              <option value="All Time">All Time</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Month">This Month</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>

          {/* Custom Date Pickers (conditionally rendered) */}
          {dateRangePreset === "Custom" && (
            <>
              <div>
                <label
                  htmlFor="custom-start-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Custom Start
                </label>
                <DatePicker
                  id="custom-start-date"
                  selected={customStartDate}
                  onChange={(date) => setCustomStartDate(date)}
                  selectsStart
                  startDate={customStartDate}
                  endDate={customEndDate}
                  placeholderText="Select start date"
                  className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="custom-end-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Custom End
                </label>
                <DatePicker
                  id="custom-end-date"
                  selected={customEndDate}
                  onChange={(date) => setCustomEndDate(date)}
                  selectsEnd
                  startDate={customStartDate}
                  endDate={customEndDate}
                  minDate={customStartDate}
                  placeholderText="Select end date"
                  className="p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 col-span-full justify-end pt-4 border-t border-gray-200">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-md"
              aria-label="Export filtered data to CSV"
            >
              <FaFileCsv /> Export CSV
            </button>
            {/* <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
              aria-label="Print current view"
            >
              <FaPrint /> Print Report
            </button> */}
          </div>
        </div>
      </section>

      {/* Donations Table */}
      <section className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaHandHoldingHeart className="text-green-600" />
            Filtered Donations ({filteredDonations.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            <p className="ml-4 text-gray-600">Loading donations data...</p>
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            <p>No donations found matching your criteria.</p>
            <p className="mt-2">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto relative rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead
                ref={tableHeaderRef}
                className={`bg-gray-50 ${
                  isHeaderSticky ? "sticky top-0 z-10 shadow-md" : ""
                } transition-shadow duration-200`}
              >
                <tr>
                  {visibleColumns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => setSortKey(col.key)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortKey === col.key
                          ? sortOrder === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortKey === col.key &&
                          (sortOrder === "asc" ? (
                            <FaSortAlphaUp size={12} />
                          ) : (
                            <FaSortAlphaDown size={12} />
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedDonations.map((donation) => (
                  <tr
                    key={donation._id}
                    className="hover:bg-green-50 hover:bg-opacity-20 transition-colors duration-150 ease-in-out cursor-pointer"
                    onClick={() => handleRowClick(donation)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {donation.name || "Anonymous"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                      <a
                        href={`mailto:${donation.email}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {donation.email}
                      </a>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <a
                        href={`tel:${donation.phone}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {donation.phone || "N/A"}
                      </a>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                      ₹{donation.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donation.status === "Processed"
                            ? "bg-green-100 text-green-800"
                            : donation.status === "Refunded"
                            ? "bg-red-100 text-red-800"
                            : donation.status === "On Hold"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {donation.status || "Pending"}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                      {donation.paymentMethod || "Unknown"}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {donation.paymentId || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis">
                      {donation.message || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(donation.date).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredDonations.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6 py-3 px-4 bg-gray-50 rounded-lg shadow-inner no-print">
            <span className="text-gray-600 text-sm">
              Showing{" "}
              {Math.min(
                filteredDonations.length,
                (currentPage - 1) * itemsPerPage + 1
              )}{" "}
              - {Math.min(filteredDonations.length, currentPage * itemsPerPage)}{" "}
              of {filteredDonations.length} entries
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
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
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
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
                className="px-4 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Donation Trends Charts */}
      <section className="bg-white rounded-xl shadow-lg p-6 no-print">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaChartBar className="text-green-600" /> Donation Trends & Analytics
        </h3>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setChartType("dailyBar")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              chartType === "dailyBar"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            Daily Amount
          </button>
          <button
            onClick={() => setChartType("cumulativeLine")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              chartType === "cumulativeLine"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            Cumulative Amount
          </button>
          <button
            onClick={() => setChartType("topDonorsPie")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              chartType === "topDonorsPie"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            Top Donors
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse flex items-center justify-center w-full h-full">
              <div className="w-16 h-16 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
              <p className="ml-4 text-gray-500">Generating chart...</p>
            </div>
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg h-96 flex flex-col justify-center items-center">
            <FaChartBar className="text-gray-400 text-5xl mb-3" />
            <p>No data to display for charts based on current filters.</p>
            <p className="mt-2 text-sm">Adjust your filters to see trends.</p>
          </div>
        ) : (
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "dailyBar" && (
                <BarChart
                  data={processedChartData.dailyBar}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) =>
                      `₹${value.toLocaleString("en-IN")}`
                    }
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Amount Donated"
                    fill="#10B981"
                    barSize={30}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}

              {chartType === "cumulativeLine" && (
                <LineChart
                  data={processedChartData.cumulativeLine}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(value) =>
                      `₹${value.toLocaleString("en-IN")}`
                    }
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Cumulative Amount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              )}

              {chartType === "topDonorsPie" && (
                <PieChart>
                  <Pie
                    data={processedChartData.topDonorsPie}
                    dataKey="amount"
                    nameKey="donor"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {processedChartData.topDonorsPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `₹${value.toLocaleString("en-IN")}`,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onUpdateStatus={handleUpdateDonationStatus}
          onAddNote={handleAddDonationNote}
        />
      )}
    </div>
  );
};

export default AdminDonations;
