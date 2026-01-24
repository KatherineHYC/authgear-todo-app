import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import authgear from "@authgear/web";
import "./index.css";

async function init() {
  try {
    await authgear.configure({
      endpoint: import.meta.env.VITE_AUTHGEAR_ENDPOINT,
      clientID: import.meta.env.VITE_AUTHGEAR_CLIENT_ID,
      sessionType: "refresh_token",
    });
  } finally {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

init().catch((e) => {
  console.error("Authgear init error:", e);
});
