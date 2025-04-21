import Gallery from "../models/galleryModel.js";
import fs from "fs";
import path from "path";

// GET all images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Failed to load gallery" });
  }
};

// POST upload a new image
export const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const image = new Gallery({ url: `/gallery/${req.file.filename}` });
    await image.save();
    res.status(201).json({ message: "Photo uploaded", image });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// DELETE image by ID
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join("public", photo.url);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Failed to delete file from disk:", err);
    });

    await photo.deleteOne();
    res.json({ message: "Photo deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
