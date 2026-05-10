import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-800 focus:shadow"
      >
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
