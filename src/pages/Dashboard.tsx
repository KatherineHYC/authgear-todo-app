import { useAuth } from "@/context/useAuth";
import { TodoList } from "@/components/todo/TodoList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const Dashboard = () => {
  const { userInfo } = useAuth();

  if (!userInfo) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-slate-800">
          Hello ! {userInfo?.email?.split("@")[0] || "User"}
        </h2>
      </div>
      <TodoList userId={userInfo.sub} />
    </div>
  );
};

export default Dashboard;
