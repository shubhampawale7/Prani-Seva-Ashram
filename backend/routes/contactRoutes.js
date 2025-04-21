import express from "express";
import {
  submitInquiry,
  getAllInquiries,
  createContact,
  deleteInquiry,
  replyToInquiry,
} from "../controllers/contactController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { sendReplyEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", submitInquiry); // Public
router.get("/", protectRoute, getAllInquiries);
router.delete("/:id", protectRoute, deleteInquiry);
router.post("/send-reply", sendReplyEmail);
router.put("/reply/:id", replyToInquiry);
export default router;
