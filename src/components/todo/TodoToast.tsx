import type { Todo } from "@/types/todo";

interface Props {
  deletedTodo: { todo: Todo; index: number } | null;
  onUndo: () => void;
  onDismiss: () => void;
}

export default function TodoToast({ deletedTodo, onUndo, onDismiss }: Props) {
  if (!deletedTodo) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3
      bg-btn-bg text-white text-sm px-4 py-3 rounded-lg shadow-lg animate-toast-in"
    >
      <span>Task deleted</span>
      <button
        onClick={onUndo}
        className="font-semibold underline hover:opacity-80 cursor-pointer transition-opacity"
      >
        Undo
      </button>
      <button
        onClick={onDismiss}
        className="ml-1 hover:opacity-80 cursor-pointer transition-opacity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
