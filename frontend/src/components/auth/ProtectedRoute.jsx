import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(AuthContext);

  // 🔥 WAIT until auth finishes
  if (authLoading) {
    return <p>Checking authentication...</p>;
  }

  // ❌ No token after auth check
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated
  return children;
};

export default ProtectedRoute;
