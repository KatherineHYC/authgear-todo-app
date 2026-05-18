import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import authgear from "@authgear/web";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AuthRedirect() {
  const usedToken = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateToken() {
      try {
        await authgear.finishAuthentication();
      } catch (e) {
        console.error("Auth failed:", e);
      } finally {
        navigate("/", { replace: true });
      }
    }

    if (!usedToken.current) {
      usedToken.current = true;
      updateToken();
    }
  }, [navigate]);

  return <LoadingSpinner message="Completing authentication..." />;
}
