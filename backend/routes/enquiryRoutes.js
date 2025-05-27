import express from "express";
import { body, validationResult } from "express-validator";
import AdoptionEnquiry from "../models/AdoptionEnquiry.js"; // Use the correct model
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // You can also use SMTP settings
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});

// POST Route with Validation
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, reason, dog } = req.body;

    try {
      const newEnquiry = new AdoptionEnquiry({
        name,
        email,
        phone,
        reason,
        dog,
      });

      await newEnquiry.save();

      // Construct email body
      const userMailOptions = {
        from: process.env.ADMIN_EMAIL, // Sender email
        to: process.env.RECEIVER_EMAIL, // Receiver email (provided by user)
        subject: "Thank you for your adoption enquiry!",
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for showing interest in adopting <strong>${dog.name}</strong>!</p>
          <p>We’ve received your enquiry and our team will get in touch with you shortly.</p>
          <p><strong>Dog:</strong> ${dog.name} (${dog.breed})</p>
          <img src="${dog.image}" alt="Dog Image" style="max-width: 100%; height: auto;" />
          <br />
          <p>Warm regards,<br />Prani Seva Ashram</p>
        `,
      };

      // Send email to user
      const emailResponse = await transporter.sendMail(userMailOptions);

      // If email is sent successfully, update email status in database
      if (emailResponse.accepted.length > 0) {
        newEnquiry.emailStatus = "sent"; // Mark email as "sent"
      } else {
        newEnquiry.emailStatus = "failed"; // Mark email as "failed"
      }

      // Save email status in the database
      await newEnquiry.save();

      // Respond with success
      res
        .status(201)
        .json({ message: "Enquiry submitted and confirmation email sent!" });
    } catch (error) {
      console.error("Error during submission or sending email:", error);
      res.status(500).json({
        error: "Something went wrong on the server. Please try again later.",
      });
    }
  }
);

// Backend Route for fetching adoption inquiries
// Backend route (Ensure this route exists and works correctly)

router.get("/adoption-inquiries", async (req, res) => {
  try {
    const inquiries = await AdoptionEnquiry.find().populate("dog"); // assuming dog is a reference
    res.status(200).json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching adoption inquiries." });
  }
});
// Update inquiry status
router.put("/adoption-inquiries/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const inquiry = await AdoptionEnquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.status(200).json({ message: "Status updated.", inquiry });
  } catch (err) {
    console.error("Error updating inquiry status:", err);
    res.status(500).json({ message: "Server error." });
  }
});
router.delete("/adoption-inquiries/:id", async (req, res) => {
  try {
    await AdoptionEnquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete inquiry." });
  }
});

export default router;
