import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authgear from "@authgear/web";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const AuthRedirect = () => {
  const usedToken = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateToken() {
      try {
        await authgear.finishAuthentication();
      } finally {
        navigate("/", { replace: true });
      }
    }

    if (!usedToken.current) {
      usedToken.current = true;
      updateToken().catch((e) => console.error(e));
    }
  }, [navigate]);

  return <LoadingSpinner message="Completing authentication..." />;
};

export default AuthRedirect;
