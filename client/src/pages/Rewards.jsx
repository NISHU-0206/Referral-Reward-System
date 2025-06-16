import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Rewards() {
  const { user, token } = useAuth(); // ✅ Access user and token from context
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        if (!user?._id) {
          setError("User not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/rewards/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // optional if required
            },
          }
        );

        setRewards(response.data);
      } catch (err) {
        console.error("Error fetching rewards:", err);
        setError("Failed to fetch rewards.");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [user, token]);

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>

        {loading ? (
          <p>Loading rewards...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : rewards ? (
          <div className="mt-4">
            <p><strong>Name:</strong> {rewards.name}</p>
            <p><strong>Email:</strong> {rewards.email}</p>
            <p><strong>Total Rewards:</strong> {rewards.rewards} Points</p>
          </div>
        ) : (
          <p>No rewards available.</p>
        )}
      </div>
    </div>
  );
}
