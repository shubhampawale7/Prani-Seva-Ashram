import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminAdoptionEnquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(
          "/api/admin/adoption-inquiries", // Ensure correct backend API URL
          {
            withCredentials: true, // Optional if you need cookies/session handling
          }
        );

        setInquiries(response.data); // Set the response data (inquiries)
      } catch (error) {
        toast.error("Error fetching adoption inquiries.");
        console.error("Error fetching inquiries:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-amber-700 mb-6">
        Adoption Inquiries
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">Reason</th>
              <th className="border p-2 text-left">Dog Name</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td className="border p-2">{inquiry.name}</td>
                  <td className="border p-2">{inquiry.email}</td>
                  <td className="border p-2">{inquiry.phone}</td>
                  <td className="border p-2">{inquiry.reason}</td>
                  <td className="border p-2">{inquiry.dog?.name}</td>{" "}
                  {/* Ensure dog.name is available */}
                  <td className="border p-2">{inquiry.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-2 text-center">
                  No adoption inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAdoptionEnquiries;
