import { useEffect, useRef, type FC } from "react";
import { useNavigate } from "react-router";
import authgear from "@authgear/web";

const AuthRedirect: FC = () => {
  const usedToken = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateToken() {
      try {
        await authgear.finishAuthentication();
      } finally {
        navigate("/");
        usedToken.current = true;
      }
    }

    if (!usedToken.current) {
      updateToken().catch((e) => console.error(e));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthRedirect;
