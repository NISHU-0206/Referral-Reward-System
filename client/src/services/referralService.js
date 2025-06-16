import axios from "axios";

const API_URL = "http://localhost:5000/api/referrals";

export const getReferralStats = async (referralCode) => {
  try {
    const response = await axios.get(`${API_URL}/${referralCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return null;
  }
};
