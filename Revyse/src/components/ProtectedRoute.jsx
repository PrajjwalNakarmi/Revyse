import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // HARD GUARANTEE: allow if token exists
  if (token && token !== "undefined") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
