import type { Todo } from "@/types/todo";

interface Props {
  todos: Todo[];
}

export function TodoStats({ todos }: Props) {
  if (todos.length === 0) return null;

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between text-sm">
      <span className="text-slate-600">
        {todos.length} task{todos.length !== 1 ? "s" : ""}
      </span>
      <span className="text-slate-500">{completedCount} completed</span>
    </div>
  );
}
