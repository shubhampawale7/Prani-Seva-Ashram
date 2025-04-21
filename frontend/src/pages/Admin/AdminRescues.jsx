/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AdminRescues = () => {
  const [rescues, setRescues] = useState([]);

  // Placeholder fetch simulation
  useEffect(() => {
    // Simulate API call
    const dummyRescues = [
      {
        id: 1,
        name: "Brownie",
        location: "Kothrud, Pune",
        date: "2025-04-09",
        status: "Recovered",
      },
      {
        id: 2,
        name: "Lucky",
        location: "Baner, Pune",
        date: "2025-04-08",
        status: "Under Treatment",
      },
      {
        id: 3,
        name: "Shadow",
        location: "Hinjewadi, Pune",
        date: "2025-04-07",
        status: "In Recovery",
      },
    ];
    setRescues(dummyRescues);
  }, []);

  return (
    <div className="p-6">
      <motion.h2
        className="text-2xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Rescue Records
      </motion.h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-rose-600 text-white">
              <th className="p-3 text-left">Dog Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Rescue Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            {rescues.map((rescue) => (
              <tr key={rescue.id} className="border-b dark:border-gray-700">
                <td className="p-3">{rescue.name}</td>
                <td className="p-3">{rescue.location}</td>
                <td className="p-3">{rescue.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      rescue.status === "Recovered"
                        ? "bg-green-100 text-green-700"
                        : rescue.status === "Under Treatment"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {rescue.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRescues;
