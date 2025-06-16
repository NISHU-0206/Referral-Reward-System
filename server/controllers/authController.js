import User from "../models/User.js";
import Reward from "../models/Reward.js";
import Referral from "../models/Referral.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateReferralCode } from "../utils/referralGenerator.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, referredBy } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash password and generate referral code
    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = generateReferralCode();

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode,
      referralCount: 0,
      rewards: 0,
      referredBy,
    });

    await newUser.save();

    // Also create Reward entry for new user
    await Reward.create({
      userId: newUser._id,
      name,
      email,
      rewards: 0,
    });

    let updatedReferrer = null;

    if (referredBy) {
      // Update referrer in User collection
      updatedReferrer = await User.findOneAndUpdate(
        { referralCode: referredBy },
        {
          $inc: { referralCount: 1, rewards: 10 },
          $push: { referredUsers: { name, email } },
        },
        { new: true }
      );

      // Update referrer's Reward record
      if (updatedReferrer) {
        const referrerReward = await Reward.findOne({ userId: updatedReferrer._id });

        if (referrerReward) {
          await Reward.findOneAndUpdate(
            { userId: updatedReferrer._id },
            { $inc: { rewards: 10 } }
          );
        } else {
          // Create reward record if not found
          await Reward.create({
            userId: updatedReferrer._id,
            name: updatedReferrer.name,
            email: updatedReferrer.email,
            rewards: 10,
          });
        }

        // Handle Referral collection update
        const referralExists = await Referral.findOne({ referrerCode: referredBy });

        if (!referralExists) {
          await Referral.create({
            referrerCode: referredBy,
            referrerEmail: updatedReferrer.email,
            referredUsers: [{ name, email }],
          });
        } else {
          await Referral.findOneAndUpdate(
            { referrerCode: referredBy },
            { $push: { referredUsers: { name, email } } }
          );
        }
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      referralCode,
      referrerUpdated: updatedReferrer !== null,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        rewards: user.rewards || 0,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};
