import express from "express";
import Referral from "../models/Referral.js"; // ✅ Use ES module import
import User from "../models/User.js"; // ✅ Ensure correct path

const router = express.Router();

// Get referrals by referral code
router.get("/:referralCode", async (req, res) => {
  const { referralCode } = req.params;

  try {
    // Find user by referral code
    const user = await User.findOne({ referralCode });

    if (!user) {
      return res.status(404).json({ msg: "Referral code not found" });
    }

    // Find users referred by this referral code
    const referredUsers = await User.find({ referredBy: referralCode });

    res.json({
      referralCode,
      referralCount: referredUsers.length,
      referredUsers,
    });
  } catch (error) {
    console.error("Error fetching referral details:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Use `export default` instead of `module.exports`
export default router;
