// models/Reward.js
import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  rewards: { type: Number, default: 0 }
});

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
