import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SellerRoute({ children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "seller") {
    return <Navigate to="/" />;
  }

  return children;
}

export default SellerRoute;