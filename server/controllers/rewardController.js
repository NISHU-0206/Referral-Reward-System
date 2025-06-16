import Reward from "../models/Reward.js";
import User from "../models/User.js";

export const getRewardsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Try to find reward by userId
    const reward = await Reward.findOne({ userId });

    if (reward) {
      return res.status(200).json(reward);
    }

    // Fallback: Try getting reward info from User model
    const user = await User.findById(userId).select("name email rewards");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      rewards: user.rewards || 0,
    });

  } catch (error) {
    console.error("Error fetching rewards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
