import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import donationRoutes from "./routes/donationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import rescueRoutes from "./routes/rescueRoutes.js"; // ✅ Imported rescue routes
import galleryRoutes from "./routes/galleryRoutes.js";
import inquiryRoutes from "./routes/inquiry.js";
import replyRoutes from "./routes/replyRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";

dotenv.config();
connectDB(); // connect to DB

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/gallery", express.static("public/gallery"));
// Serve the 'uploads' folder as static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/donate", donationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/rescues", rescueRoutes);
app.use("/api/gallery", galleryRoutes); // ✅ Mounted rescue route
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/enquiries", enquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
