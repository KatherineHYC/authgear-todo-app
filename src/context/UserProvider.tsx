import {
  createContext,
  useEffect,
  useState,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import authgear from "@authgear/web";

interface UserContextValue {
  isLoggedIn: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
});

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  // By default the user is not logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // When the sessionState changed, logged in state will also be changed
    authgear.delegate = {
      onSessionStateChange: (container) => {
        // sessionState is now up to date
        // Value of sessionState can be "NO_SESSION" or "AUTHENTICATED"
        const sessionState = container.sessionState;
        if (sessionState === "AUTHENTICATED") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      },
    };
  }, [setIsLoggedIn]);

  const contextValue = useMemo<UserContextValue>(() => {
    return {
      isLoggedIn,
    };
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
