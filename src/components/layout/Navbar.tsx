import { useState } from "react";
import { useAuth } from "../../context/useAuth";

export const Navbar = () => {
  const { isLoggedIn, logout, openSettings } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-taupe-300 border-b border-slate-200 overflow-visible">
      <div className="max-w-3xl mx-auto px-4 py-4 relative flex items-center justify-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span className="text-xl font-semibold text-primary">Todo List</span>
        </div>

        {/* 漢堡選單 */}
        {isLoggedIn && (
          <div className="absolute right-4">
            {menuOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 cursor-pointer gap-1.5 rounded-md bg-[#EEE9CC] hover:bg-[#E4DDB8] transition-colors duration-150 relative z-50"
            >
              <span
                className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-primary rounded transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>

            <div
              className={`absolute right-0 mt-6 w-44 rounded-md shadow-lg border-slate-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                menuOpen
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={() => {
                  openSettings();
                  setMenuOpen(false);
                }}
                className="w-full text-left font-semibold px-4 py-2 text-sm text-primary hover:bg-slate-50 cursor-pointer"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left font-semibold px-4 py-2 text-sm text-gray-500 hover:bg-slate-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
