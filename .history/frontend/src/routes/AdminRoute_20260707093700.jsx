import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;