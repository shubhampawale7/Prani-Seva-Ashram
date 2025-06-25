import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DonationChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        setLoading(true);
        // Replace with your actual backend endpoint for historical donation data
        // Example response: { data: [{ date: '2025-01', total: 15000 }, { date: '2025-02', total: 20000 }] }
        // Or if you want daily, provide data for last 30 days.
        const { data } = await axios.get("/api/metrics/donations-monthly", {
          withCredentials: true,
        });

        // Mock data for demonstration if backend not ready
        const mockData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          donations: [50000, 75000, 60000, 90000, 110000],
          // Or if you want donation counts:
          // counts: [100, 150, 120, 180, 220]
        };

        setChartData({
          labels: mockData.labels,
          datasets: [
            {
              label: "Total Funds Raised (₹)",
              data: mockData.donations,
              borderColor: "rgb(255, 159, 64)",
              backgroundColor: "rgba(255, 159, 64, 0.5)",
              tension: 0.3, // Makes the line curved
              fill: false, // Don't fill area below the line
            },
            // You could add another dataset for 'Total Donations' if needed
            // {
            //   label: 'Total Donations',
            //   data: mockData.counts,
            //   borderColor: 'rgb(75, 192, 192)',
            //   backgroundColor: 'rgba(75, 192, 192, 0.5)',
            //   tension: 0.3,
            //   fill: false,
            // }
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        toast.error("Failed to load chart data.");
        setLoading(false);
      }
    };

    fetchDonationData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows you to control height with CSS
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Donation Trends",
        font: {
          size: 18,
        },
        color: "#333",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            // Format Y-axis labels for Indian Rupee
            return "₹" + value.toLocaleString("en-IN");
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <BeatLoader size={10} color="#36D7B7" />
        <p className="ml-3 text-gray-600">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full">
      {" "}
      {/* Set a height for the chart container */}
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          No chart data available.
        </div>
      )}
    </div>
  );
};

export default DonationChart;
