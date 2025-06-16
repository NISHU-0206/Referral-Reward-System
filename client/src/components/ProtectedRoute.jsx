import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null; // Or return a loader component
  return token ? children : <Navigate to="/login" replace />;
}
