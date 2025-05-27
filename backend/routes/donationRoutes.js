import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationTrends,
  updateDonationStatus, // NEW: Import the new controller function
  addDonationNote, // NEW: Import the new controller function
} from "../controllers/donationController.js";
import { protectRoute } from "../middlewares/authMiddleware.js"; // Assuming protectRoute protects admin routes
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Razorpay order creation route (Public)
router.post("/razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const payment_capture = 1;
    const currency = "INR";

    const options = {
      amount: amount * 100, // convert to paise
      currency,
      payment_capture,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// Public route to make a donation
router.post("/", createDonation);

// Admin routes (protected)
// All these routes should ideally be protected by an authentication middleware
// to ensure only authorized administrators can access them.
// Your `protectRoute` middleware should handle this.
router.get("/", protectRoute, getAllDonations); // Fetch all donations
router.get("/trends", protectRoute, getDonationTrends); // Get donation trends

// NEW: Route to update donation status (protected by protectRoute)
router.put("/:id/status", protectRoute, updateDonationStatus);

// NEW: Route to add a note to a donation (protected by protectRoute)
router.post("/:id/notes", protectRoute, addDonationNote);

export default router;
