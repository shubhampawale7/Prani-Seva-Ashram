import Volunteer from "../models/Volunteer.js";

// POST /api/volunteers
export const handleVolunteerForm = async (req, res) => {
  const { name, email, phone, age, role, availability, message } = req.body;

  try {
    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      age,
      role,
      availability,
      message,
    });

    await newVolunteer.save();

    res
      .status(200)
      .json({ success: true, message: "Volunteer submitted successfully" });
  } catch (error) {
    console.error("Error saving volunteer:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/volunteers - Admin view
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
};

export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Volunteer.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
