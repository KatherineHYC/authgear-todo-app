import { useAuth } from "../context/useAuth";
import Navbar from "../components/layout/Navbar";
import { Navigate } from "react-router-dom";

export const LandingPage = () => {
  const { isLoggedIn, login, isLoading } = useAuth();

  if (!isLoading && isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Welcome to Todo App
          </h2>
          <p className="text-slate-600 mb-8">Sign in to manage your tasks</p>
          <button
            onClick={login}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
