import { type FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Home";
import AuthRedirect from "./AuthRedirect";
import UserContextProvider from "./context/UserProvider";

const App: FC = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/auth-redirect" element={<AuthRedirect />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
