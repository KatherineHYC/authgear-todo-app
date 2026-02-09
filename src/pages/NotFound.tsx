import { Link } from "react-router";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="text-slate-600 mb-4">Page not found</p>
      <Link to="/" className="text-indigo-600 hover:underline">
        返回首頁
      </Link>
    </div>
  </div>
);

export default NotFound;
