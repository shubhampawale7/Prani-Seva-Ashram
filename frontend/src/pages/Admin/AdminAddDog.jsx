import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminAddDog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    breed: "",
    gender: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return toast.error("Please select an image file");
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("age", form.age);
    data.append("breed", form.breed);
    data.append("gender", form.gender);
    data.append("description", form.description);

    // Added
    data.append("image", imageFile);

    try {
      const response = await axios.post("/api/dogs", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Dog added for adoption!");
      navigate("/admin");
    } catch (err) {
      console.error("Add Dog error:", err);
      toast.error("Failed to add dog");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Dog for Adoption</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "age", "breed", "gender"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        ))}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
          rows={4}
          required
        />

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminAddDog;
