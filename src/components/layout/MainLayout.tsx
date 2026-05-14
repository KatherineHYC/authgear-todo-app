import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center text-sm text-slate-200">
          <p>Copyright © 2026 Katherine Hsu</p>
        </div>
      </footer>
    </div>
  );
}
