import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationTrends,
} from "../controllers/donationController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Razorpay order creation route
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

// Admin routes
router.get("/", protectRoute, getAllDonations);
router.get("/trends", protectRoute, getDonationTrends);

export default router;
