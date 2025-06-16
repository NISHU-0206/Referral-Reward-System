import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ context logout clears all
    navigate("/login");
  };

  return (
    <nav className="navbar flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-300 transition">Referral System</Link>
      </h1>

      <div className="flex space-x-4 text-sm md:text-base">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/referrals" className="hover:text-gray-300">Referrals</Link>
            <Link to="/rewards" className="hover:text-gray-300">Rewards</Link>
            <button onClick={handleLogout} className="text-red-300 hover:text-white transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
