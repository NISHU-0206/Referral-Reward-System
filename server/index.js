import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rewardRoutes from "./routes/rewardRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/rewards", rewardRoutes); // ✅ This is essential

// Import routes
import authRoutes from "./routes/authRoutes.js";
import pkg1 from "./routes/referralRoutes.js";
// const authRoutes=pkg
const referralRoutes=pkg1

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/referrals", referralRoutes);

// Root route (for checking server status)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed!", error);
    process.exit(1);
  }
};
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
