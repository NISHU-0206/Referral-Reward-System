import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ReferralCards() {
  const { token } = useAuth();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReferrals(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching referrals:", err);
        setError("Failed to load referrals");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading referral stats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (referrals.length === 0) return <p>No referrals found.</p>;

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Referral Statistics</h2>
        <ul className="divide-y divide-gray-200">
          {referrals.map((ref, index) => (
            <li key={index} className="py-2">
              <strong>{ref.name}</strong> - {ref.status}
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}
