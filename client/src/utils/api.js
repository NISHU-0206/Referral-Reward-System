import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchReferrals = async () => {
  return axios.get(`${API_BASE}/referrals`);
};

export const fetchRewards = async () => {
  return axios.get(`${API_BASE}/rewards`);
};
