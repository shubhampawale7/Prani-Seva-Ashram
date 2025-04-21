import express from "express";
import {
  createRescue,
  getAllRescues,
  getRescueCount, // <- Already exists
} from "../controllers/rescueController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoute, createRescue);
router.get("/", protectRoute, getAllRescues);
router.get("/count", getRescueCount);

export default router;
