import Donation from "../models/Donation.js";

// POST /api/donations - Create a new donation
export const createDonation = async (req, res) => {
  try {
    const { name, email, amount, message, paymentId, paymentMethod, phone } =
      req.body; // Added paymentMethod and phone based on frontend

    // Validate the required fields
    if (!name || !email || !amount || !paymentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the donation entry
    const donation = new Donation({
      name,
      email,
      amount,
      message,
      paymentId, // Make sure to save the paymentId
      paymentMethod: paymentMethod || "Razorpay", // Default to Razorpay if not provided
      phone: phone || null, // Add phone number
    });

    // Save the donation to the database
    await donation.save();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/donations - Fetch all donations
export const getAllDonations = async (req, res) => {
  try {
    // Populate status and notes fields, and sort by createdAt descending
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/donations/trends - Get donation trends (daily aggregation)
export const getDonationTrends = async (req, res) => {
  try {
    const trends = await Donation.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedTrends = trends.map((entry) => ({
      date: entry._id,
      amount: entry.totalAmount,
      count: entry.count,
    }));

    // 🧠 Additional aggregation to get totals
    const totals = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonations: { $sum: 1 },
        },
      },
    ]);

    const totalAmount = totals[0]?.totalAmount || 0;
    const totalDonations = totals[0]?.totalDonations || 0;

    res.status(200).json({
      trends: formattedTrends,
      totalAmount,
      totalDonations,
    });
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// NEW: PUT /api/donate/:id/status - Update donation status
export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // Validate if the status is one of the allowed enums
    const allowedStatuses = ["Pending", "Processed", "Refunded", "On Hold"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    donation.status = status;
    await donation.save();

    res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// NEW: POST /api/donate/:id/notes - Add a new note to a donation
export const addDonationNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body; // Expecting { text: "..." } from frontend

    if (!note || !note.text) {
      return res.status(400).json({ error: "Note text is required" });
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // Add the new note to the notes array
    // Mongoose will automatically assign a default timestamp if not provided in `note`
    donation.notes.push({ text: note.text });

    await donation.save();

    res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error("Error adding donation note:", error);
    res.status(500).json({ error: "Server error" });
  }
};
