import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import UserContextProvider from "./context/UserProvider";

export const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
