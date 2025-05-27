import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return toast.error("Please upload an image.");
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("image", imageFile);

    try {
      await axios.post("/api/dogs", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      toast.success("Dog added for adoption!");
      navigate("/admin");
    } catch (err) {
      console.error("Add Dog error:", err);
      toast.error("Failed to add dog.");
    } finally {
      setProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <Link
        to="/admin/manage-adoptions"
        className="text-amber-600 hover:underline block mt-4 mb-5"
      >
        Go to Manage Adoptions →
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <FaDog className="text-3xl text-amber-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Add Dog for Adoption
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field"
            required
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="input-field"
            required
          />
          <input
            name="breed"
            value={form.breed}
            onChange={handleChange}
            placeholder="Breed"
            className="input-field"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="input-field"
          rows={4}
          required
        />

        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`flex items-center justify-center p-6 border-2 border-dashed rounded-lg transition relative ${
              isDragOver
                ? "border-amber-600 bg-amber-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <p className="text-gray-600 text-sm text-center z-10">
              Drag & drop an image here or click to select
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded-lg shadow w-48 h-48 object-cover border"
            />
          )}
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-amber-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          className="bg-amber-600 text-white font-semibold py-2 px-6 rounded hover:bg-amber-700 transition"
        >
          {progress > 0 ? `Uploading... ${progress}%` : "Save Dog"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddDog;
