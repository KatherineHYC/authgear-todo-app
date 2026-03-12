import { useAuth } from "../context/useAuth";
import TodoList from "../components/TodoList";
import Navbar from "../components/layout/Navbar";

export const Dashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-slate-800">
            Hello ! {userInfo?.email?.split("@")[0] || "User"}
          </h2>
        </div>
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;
