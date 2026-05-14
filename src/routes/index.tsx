import { createBrowserRouter } from "react-router";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AuthRedirect from "@/pages/AuthRedirect";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth-redirect", element: <AuthRedirect /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
