import express from "express";
import multer from "multer";
import path from "path";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  getGallery,
  uploadPhoto,
  deletePhoto,
} from "../controllers/galleryController.js";

const router = express.Router();

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/gallery/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const fileFilter = (req, file, cb) => {
  const isValid =
    /jpeg|jpg|png|gif/.test(path.extname(file.originalname).toLowerCase()) &&
    /image/.test(file.mimetype);
  cb(isValid ? null : new Error("Only image files allowed"), isValid);
};

const upload = multer({ storage, fileFilter }).single("photo");

// Routes
router.get("/", getGallery);
router.post(
  "/upload",
  protectRoute,
  (req, res, next) =>
    upload(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    }),
  uploadPhoto
);
router.delete("/:id", protectRoute, deletePhoto);

export default router;
