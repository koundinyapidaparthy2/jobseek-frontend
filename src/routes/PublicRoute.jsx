import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const user = useSelector((state) => state.auth.user);
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
}
