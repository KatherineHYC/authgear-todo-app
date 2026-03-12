import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Completing authentication..." />;
  }

  // 若未登入，導向首頁 (Landing Page)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
