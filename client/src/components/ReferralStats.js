export default function ReferralStats({ totalReferrals }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-center">
      <h2 className="text-lg font-semibold mb-2">Your Referral Stats</h2>
      <p className="text-3xl font-bold text-blue-600">{totalReferrals} Referrals</p>
    </div>

  );
}
