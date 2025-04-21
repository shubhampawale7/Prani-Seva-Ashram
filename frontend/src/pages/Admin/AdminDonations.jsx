/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("/api/donate", { withCredentials: true });
      setDonations(res.data);
    } catch (err) {
      toast.error("Failed to fetch donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Donations Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
            <thead className="bg-green-100 text-green-800 font-semibold">
              <tr>
                <th className="px-4 py-2 border">Donor Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Payment ID</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{donation.name}</td>
                  <td className="px-4 py-2 border">{donation.email}</td>
                  <td className="px-4 py-2 border">₹{donation.amount}</td>
                  <td className="px-4 py-2 border">
                    {donation.message || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {donation.paymentId || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(donation.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminDonations;
