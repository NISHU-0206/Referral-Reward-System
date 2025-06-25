import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/referrals`;

export const getReferralStats = async (referralCode) => {
  try {
    const response = await axios.get(`${API_URL}/${referralCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return null;
  }
};
