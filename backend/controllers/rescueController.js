import Rescue from "../models/Rescue.js";

// POST - Create a rescue entry
export const createRescue = async (req, res) => {
  try {
    const { dogName, rescuedDate, location, condition, notes } = req.body;

    if (!dogName || !location) {
      return res
        .status(400)
        .json({ error: "Dog name and location are required" });
    }

    const rescue = new Rescue({
      dogName,
      rescuedDate,
      location,
      condition,
      notes,
    });
    await rescue.save();

    res.status(201).json({ success: true, rescue });
  } catch (err) {
    console.error("Error creating rescue:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET - Fetch all rescues
export const getAllRescues = async (req, res) => {
  try {
    const rescues = await Rescue.find().sort({ rescuedDate: -1 });
    res.status(200).json(rescues);
  } catch (err) {
    console.error("Error fetching rescues:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET - Count
export const getRescueCount = async (req, res) => {
  try {
    const count = await Rescue.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error counting rescues:", err);
    res.status(500).json({ error: "Server error" });
  }
};
