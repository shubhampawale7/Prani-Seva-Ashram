import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const AdminGalleryUpload = ({
  onConfirmUpload,
  onConfirmDelete,
  refreshTrigger,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false); // This state refers to the local upload button loading
  const [loadingImages, setLoadingImages] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // State for delete confirmation modal (local to this component)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState(null);

  // Fetch gallery images from the server
  useEffect(() => {
    fetchGalleryImages();
  }, [refreshTrigger]); // Listen to refreshTrigger from parent (AdminHome.jsx)

  // Cleanup for object URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const fetchGalleryImages = async () => {
    setLoadingImages(true);
    try {
      const res = await axios.get("http://localhost:5000/api/gallery", {
        withCredentials: true,
      }); // Ensure this URL is correct
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
      setFile(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview("");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
  };

  // This function now calls the parent's (AdminHome.jsx's) confirmation handler
  const triggerUploadConfirmation = () => {
    if (!file) {
      toast.error("Please select a photo to upload.");
      return;
    }
    // Pass the file to the parent component for confirmation
    onConfirmUpload(file);

    // --- NEW: Clear local file and preview immediately after passing to parent ---
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview); // Clean up the object URL
    }
    setPreview("");
    // --- END NEW ---
  };

  // Function to initiate the delete process, showing the confirmation modal
  const handleDeleteClick = (id) => {
    setImageIdToDelete(id);
    setShowConfirmDelete(true);
  };

  // This function calls the parent's (AdminHome.jsx's) confirmation handler for deletion
  const confirmDelete = async () => {
    if (!imageIdToDelete) return;

    // Call the parent's onConfirmDelete prop, which will handle the actual deletion and refresh
    onConfirmDelete(imageIdToDelete);

    // After triggering the parent's action, close the local modal
    setShowConfirmDelete(false);
    setImageIdToDelete(null);
  };

  // Function to cancel the deletion
  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setImageIdToDelete(null);
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 mb-4">
        <input
          type="file"
          accept="image/*"
          // Set key to force re-render and clear the input field visually
          key={file ? file.name : "no-file"}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-amber-50 file:text-amber-700
            hover:file:bg-amber-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Selected preview"
            className="h-24 w-24 rounded-lg shadow-md border object-cover flex-shrink-0"
          />
        )}
        <button
          onClick={triggerUploadConfirmation}
          disabled={uploading || !file} // 'uploading' refers to local state if you want a separate indicator
          className={`${
            uploading || !file
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          } text-white px-6 py-2.5 rounded-lg transition duration-200 ease-in-out font-semibold shadow-md flex-shrink-0`}
        >
          {uploading ? "Preparing..." : "Upload Photo"}
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="mt-6">
        {loadingImages ? (
          <p className="text-center text-gray-500 py-8">Loading images...</p>
        ) : galleryImages.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No images uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((img) => (
              <div
                key={img._id}
                className="relative group rounded-lg overflow-hidden shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-200 ease-in-out"
              >
                <img
                  src={`http://localhost:5000${img.url}`}
                  alt="Gallery"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleDeleteClick(img._id)}
                  className="absolute top-3 right-3 bg-red-600 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out font-medium hover:bg-red-700 shadow-md"
                  title="Delete Image"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Delete Confirmation Modal (LOCAL to AdminGalleryUpload) --- */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center border-t-4 border-red-500"
            >
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                Are you absolutely sure you want to delete this image?
                <br />
                <span className="font-semibold text-red-600">
                  This action cannot be undone.
                </span>
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-2.5 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 font-semibold shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-semibold shadow-md"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGalleryUpload;
