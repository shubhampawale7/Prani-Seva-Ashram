import express from "express";
import {
  createAdmin,
  loginAdmin,
  checkAuth,
  logoutAdmin,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register", createAdmin); // POST /api/auth/register
router.post("/login", loginAdmin); // POST /api/auth/login
router.post("/logout", logoutAdmin); // POST /api/auth/logout
router.get("/check-auth", protectRoute, checkAuth); // GET /api/auth/check-auth

export default router;
