import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";

const AdminManageAdoption = () => {
  const [dogs, setDogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDogs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/dogs?page=${page}&limit=10`);
      const data = Array.isArray(res.data) ? res.data : res.data.dogs;
      setDogs(data);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to fetch dogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs(currentPage);
  }, [currentPage]);

  const handleEdit = (dog) => {
    setEditId(dog._id);
    setForm(dog);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("breed", form.breed);
      formData.append("description", form.description || "");
      formData.append("adopted", form.adopted ? "true" : "false");

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      await axios.put(`/api/dogs/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Dog updated!");
      setEditId(null);
      fetchDogs(currentPage);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/dogs/${id}`);
      toast.success("Dog deleted");
      fetchDogs(currentPage);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🐶 Manage Dog Adoptions
      </h2>

      {loading && (
        <div className="flex justify-center mb-8">
          <FaSpinner className="animate-spin text-3xl text-blue-500" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {dogs.map((dog) => (
          <div
            key={dog._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={`http://localhost:5000/uploads/${dog.image}`}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                alt={dog.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-2 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {dog.name}
              </h3>
              <p className="text-sm text-gray-500">{dog.breed}</p>
              <p
                className={`text-xs font-medium ${
                  dog.adopted ? "text-red-500" : "text-green-600"
                }`}
              >
                {dog.adopted ? "Adopted" : "Available"}
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleEdit(dog)}
                  className="text-blue-500 hover:text-blue-700 transition text-xl"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(dog._id)}
                  className="text-red-500 hover:text-red-700 transition text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50`}
        >
          Prev
        </button>
        <span className="text-lg text-gray-800 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50`}
        >
          Next
        </button>
      </div>

      {/* Edit Form (Inline Modal Style) */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-8 relative border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-center text-neutral-800">
              ✏️ Edit Dog Details
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                placeholder="Dog's Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="age"
                value={form.age || ""}
                onChange={handleChange}
                placeholder="Age (in years)"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="breed"
                value={form.breed || ""}
                onChange={handleChange}
                placeholder="Breed"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Gender Selector */}
              <select
                name="gender"
                value={form.gender || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setForm({ ...form, imageFile: e.target.files[0] })
                }
                className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="adopted"
                  checked={form.adopted || false}
                  onChange={handleChange}
                  className="accent-blue-600 w-5 h-5"
                />
                Adopted
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setEditId(null)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageAdoption;

