import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import AuthRedirect from "../pages/AuthRedirect";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth-redirect",
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
