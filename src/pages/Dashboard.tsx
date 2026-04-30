import { useAuth } from "../context/useAuth";
import TodoList from "../components/TodoList";

export const Dashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-slate-800">
          Hello ! {userInfo?.email?.split("@")[0] || "User"}
        </h2>
      </div>
      <TodoList />
    </div>
  );
};

export default Dashboard;
