import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create new admin (register)
export const createAdmin = async (req, res) => {
  try {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!name || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const existing = await Admin.findOne({ $or: [{ email }, { username }] });

    if (existing) {
      if (existing.email === email) {
        return res.status(400).json({ error: "Email already in use." });
      }
      if (existing.username === username) {
        return res.status(400).json({ error: "Username already taken." });
      }
      return res.status(400).json({ error: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("adminToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Check if admin is authenticated
export const checkAuth = async (req, res) => {
  res.status(200).json({ isAuthenticated: true });
};

// Logout admin
export const logoutAdmin = async (req, res) => {
  res.clearCookie("adminToken").status(200).json({ message: "Logged out." });
};
