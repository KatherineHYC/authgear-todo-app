import { useAuth } from "../../context/useAuth";

export const Navbar = () => {
  const { isLoggedIn, userInfo, login, logout, openSettings } = useAuth();

  // 處理顯示名稱
  const displayName = userInfo?.email?.split("@")[0] ?? "User";

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-indigo-600"
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
          <span className="text-xl font-semibold text-slate-800">Todo App</span>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:block">
              {displayName}
            </span>
            <button
              onClick={openSettings}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Settings
            </button>
            <button
              onClick={logout}
              className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
