import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch(() => logout()); // Logout if token is invalid
    }
  }, [token, navigate, logout]);

  return (
    <div className="container mx-auto mt-10 px-4">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
    {userData ? <p>Hello, <strong>{userData.name}</strong>!</p> : <p>Loading...</p>}
    <button
      onClick={logout}
      className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  </div>
</div>

  );
}
