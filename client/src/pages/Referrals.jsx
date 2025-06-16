import { useEffect, useState } from "react";
import { getReferralStats } from "../services/referralService";

export default function Referrals() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    // ✅ Get from user object (recommended) or fallback to localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const code = user?.referralCode || localStorage.getItem("referralCode");
    setReferralCode(code);

    const fetchStats = async () => {
      if (!code) {
        setStats(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getReferralStats(code);
        console.log("Fetched referral stats:", data);
        setStats(data);
      } catch (error) {
        console.error("Error fetching referral stats:", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Referral Statistics</h2>

        {loading ? (
          <p>Loading referral stats...</p>
        ) : stats ? (
          <div className="mt-4">
            <p><strong>Your Referral Code:</strong> {referralCode}</p>
            <p><strong>Total Referrals:</strong> {stats.referredUsers?.length || 0}</p>

            <h3 className="text-xl font-bold mt-4">Referred Users:</h3>
            {stats.referredUsers && stats.referredUsers.length > 0 ? (
              <ul className="list-disc pl-6">
                {stats.referredUsers.map((user, i) => (
                  <li key={i} className="mt-2">{user.name} – {user.email}</li>
                ))}
              </ul>
            ) : (
              <p>No referrals yet.</p>
            )}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
