import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  referrerCode: { type: String, required: true },  // The code used for referral
  referrerEmail: { type: String, required: true }, // Email of the referrer
  referredUsers: [
    {
      name: String,
      email: String,
      signupDate: { type: Date, default: Date.now }
    }
  ]
});

const Referral = mongoose.model("Referral", ReferralSchema, "referraldb");

export default Referral;
