import { Link } from "react-router-dom"; // ✅ Add this line

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Referral System</h1>
<p className="text-lg text-gray-600 mb-6">Earn points by inviting friends!</p>
<Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md">
  Go to Dashboard
</Link>

    </div>
  );
}
