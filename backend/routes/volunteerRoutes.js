import express from "express";
import {
  handleVolunteerForm,
  getAllVolunteers,
  deleteVolunteer,
} from "../controllers/volunteerController.js";

const router = express.Router();

// POST /api/volunteers - Submit volunteer form
router.post("/", handleVolunteerForm);
router.get("/", getAllVolunteers); // 🆕 For admin dashboard
router.delete("/:id", deleteVolunteer); // ✅ DELETE route

export default router;
