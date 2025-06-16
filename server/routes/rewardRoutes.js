import express from "express";
import { getRewardsByUserId } from "../controllers/rewardController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route
router.get("/:userId", authenticate, getRewardsByUserId);

export default router;
