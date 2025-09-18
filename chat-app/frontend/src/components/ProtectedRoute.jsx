import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  let { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};
export default ProtectedRoute;
