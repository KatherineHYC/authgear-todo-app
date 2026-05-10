import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Completing authentication..." />;
  }

  // 若未登入，導向首頁 (Landing Page)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
