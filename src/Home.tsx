import {
  useEffect,
  useState,
  useCallback,
  useContext,
  type FC,
  type MouseEvent,
} from "react";
import { UserContext } from "./context/UserProvider";
import authgear, { Page, PromptOption, UserInfo } from "@authgear/web";
import TodoList from "./components/TodoList";

const Home: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          const info = await authgear.fetchUserInfo();
          setUserInfo(info);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser().catch((e) => console.error(e));
  }, [isLoggedIn]);

  const startLogin = useCallback(() => {
    authgear
      .startAuthentication({
        redirectURI: import.meta.env.VITE_AUTHGEAR_REDIRECT_URL,
        prompt: PromptOption.Login,
      })
      .then(
        () => {
          // User will be redirected to Authgear
        },
        (err) => {
          console.error("Login error:", err);
        },
      );
  }, []);

  const logout = useCallback(() => {
    authgear
      .logout({
        redirectURI: window.location.origin,
      })
      .then(
        () => {
          setUserInfo(null);
        },
        (err) => {
          console.error("Logout error:", err);
        },
      );
  }, []);

  const openSettings = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authgear.open(Page.Settings);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">✓ Todo App</h1>
          {isLoggedIn && userInfo && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 hidden sm:block">
                {userInfo.email || userInfo.sub?.slice(0, 8)}
              </span>
              <button
                onClick={openSettings}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Settings
              </button>
              <button
                onClick={logout}
                className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          // Login Screen
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
              onClick={startLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Sign In with Authgear
            </button>
          </div>
        ) : (
          // Dashboard
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-slate-800">
                Hello, {userInfo?.email?.split("@")[0] || "User"}
              </h2>
              <p className="text-sm text-slate-500">
                User ID: {userInfo?.sub?.slice(0, 12)}...
              </p>
            </div>
            <TodoList />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
