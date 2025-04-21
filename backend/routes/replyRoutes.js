import express from "express";
import { sendReplyEmail } from "../controllers/emailController.js";

const router = express.Router();

// ✅ Send a reply email (no DB update here)
router.post("/send", sendReplyEmail);

export default router;
