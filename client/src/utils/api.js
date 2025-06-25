import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api";

export const fetchReferrals = async () => {
  return axios.get(`${API_BASE}/referrals`);
};

export const fetchRewards = async () => {
  return axios.get(`${API_BASE}/rewards`);
};
