import { Navigate } from "react-router-dom";
import { isAdmin } from "../services/authService";

export default function AdminRoute({ children }) {
  return isAdmin() ? children : <Navigate to="/" />;
}