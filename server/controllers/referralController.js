const User = require("../models/User");

exports.getReferralStats = async (req, res) => {
  try {
    const { referralCode } = req.params;

    // 🔍 Find the user with the given referral code
    const user = await User.findOne({ referralCode }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 👥 Find users who were referred by this code
    const referredUsers = await User.find({ referredBy: referralCode })
      .select("name email")  // ✅ only send necessary fields
      .lean();

    // 📦 Return referral stats
    res.status(200).json({
      referralCount: referredUsers.length,
      referredUsers,
    });

  } catch (error) {
    console.error("Referral stats error:", error);
    res.status(500).json({ message: "Failed to get referral stats", error });
  }
};
