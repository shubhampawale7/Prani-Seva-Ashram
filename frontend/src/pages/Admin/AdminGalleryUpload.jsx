import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminGalleryUpload = ({ refreshTrigger }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // Fetch gallery images from the server
  useEffect(() => {
    fetchGalleryImages();
  }, [refreshTrigger]);

  const fetchGalleryImages = async () => {
    setLoadingImages(true);
    try {
      const res = await axios.get("/api/gallery", { withCredentials: true });
      setGalleryImages(res.data || []);
    } catch (err) {
      toast.error("Failed to load gallery.");
      console.error(err);
    } finally {
      setLoadingImages(false);
    }
  };

  // Handle file selection for upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setFile(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
  };

  // Handle file upload to the server
  const handleUpload = async () => {
    if (!file) return toast.error("Please select a photo!");

    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/gallery/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.imageUrl) {
        setFile(null); // Reset file input after successful upload
        URL.revokeObjectURL(preview); // Free up memory used by the preview
        setPreview(""); // Clear the preview
        fetchGalleryImages(); // Fetch updated gallery after upload
        toast.success("Photo uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle photo deletion from the gallery
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/${id}`, { withCredentials: true });
      fetchGalleryImages(); // Refresh gallery after deletion
      toast.success("Photo deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete photo.");
    }
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full sm:w-auto"
        />
        {preview && (
          <img
            src={preview}
            alt="Selected preview"
            className="h-24 rounded shadow border object-cover"
          />
        )}
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`${
            uploading || !file
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          } text-white px-4 py-2 rounded transition`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="mt-6">
        {loadingImages ? (
          <p className="text-center text-gray-500">Loading images...</p>
        ) : galleryImages.length === 0 ? (
          <p className="text-center text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img._id}
                className="relative group rounded overflow-hidden shadow-md"
              >
                <img
                  src={`http://localhost:5000${img.url}`}
                  alt="Gallery"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleDelete(img._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryUpload;
