import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  referralCode: { type: String, unique: true },
  referredBy: String, // Stores the referral code used
  referralCount: { type: Number, default: 0 },
  referredUsers: [{ name: String, email: String }],
  rewards: { type: Number, default: 0 }
});

// ✅ Use `export default` instead of `module.exports`
const User = mongoose.model("User", UserSchema);
export default User;
