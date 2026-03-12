import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import authgear, { Page, PromptOption, UserInfo } from "@authgear/web";

interface UserContextValue {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  openSettings: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextValue | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const info = await authgear.fetchUserInfo();
      setUserInfo(info);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 監聽 Session 狀態
    authgear.delegate = {
      onSessionStateChange: (container) => {
        const authenticated = container.sessionState === "AUTHENTICATED";
        setIsLoggedIn(authenticated);

        if (authenticated) {
          fetchUser();
        } else {
          setUserInfo(null);
        }
      },
    };

    // 處理頁面重新整理後的狀態恢復
    const currentSessionState = authgear.sessionState;
    const authenticated = currentSessionState === "AUTHENTICATED";

    setIsLoggedIn(authenticated);

    // 如果已登入但尚未獲取資訊，則發起請求
    if (authenticated && !userInfo) {
      fetchUser();
    }
  }, [fetchUser, userInfo]);

  const login = useCallback(() => {
    authgear.startAuthentication({
      redirectURI: import.meta.env.VITE_AUTHGEAR_REDIRECT_URL,
      prompt: PromptOption.Login,
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await authgear.logout({ redirectURI: window.location.origin });
      setUserInfo(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  const openSettings = useCallback(() => {
    authgear.open(Page.Settings);
  }, []);

  const contextValue = useMemo(() => {
    return {
      isLoggedIn,
      userInfo,
      isLoading,
      login,
      logout,
      openSettings,
    };
  }, [isLoggedIn, userInfo, isLoading, login, logout, openSettings]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
