import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const submitInquiry = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const inquiry = new Contact({ name, email, message });
    await inquiry.save();

    // nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Inquiry from Prani Seva Ashram",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    console.error("Error in inquiry submission:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ date: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // Your Gmail address
        pass: process.env.ADMIN_EMAIL_PASS, // Your Gmail app password
      },
    });

    const mailOptions = {
      from: `"Prani Seva Ashram Contact" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Inquiry",
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export const deleteInquiry = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
};
export const replyToInquiry = async (req, res) => {
  try {
    const { reply } = req.body;
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply, isReplied: true },
      { new: true }
    );
    res.status(200).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to reply" });
  }
};
