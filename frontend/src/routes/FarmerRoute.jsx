import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function FarmerRoute({ children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "farmer") {
    return <Navigate to="/" />;
  }

  return children;
}

export default FarmerRoute;