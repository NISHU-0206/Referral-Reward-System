import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);

// ✅ GET /api/auth/user — return user info from token
router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email referralCode referralCount rewards");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

export default router;
