import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LandingPage() {
  const { isLoggedIn, login, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (isLoggedIn) return null;
  return (
    <div className="text-center py-20">
      <img
        src="/illustration_checklist.svg"
        alt="Todo List Logo"
        className="mx-auto mb-6 block w-64 object-contain"
      />
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Organize Your Daily Life
      </h2>
      <p className="text-slate-600 mb-8">
        The simplest way to track your tasks and goals.
      </p>
      <button
        onClick={login}
        className="relative overflow-hidden group bg-[#7D6340] hover:bg-[#644f33] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
        <span className="relative">Start Planning</span>
      </button>
    </div>
  );
}
