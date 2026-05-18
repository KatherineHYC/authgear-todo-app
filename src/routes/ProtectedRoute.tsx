import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Checking session..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
