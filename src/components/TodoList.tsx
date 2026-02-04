// src/components/TodoList.tsx
import React, { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "authgear-todos";

const TodoList: React.FC = () => {
  const [input, setInput] = useState("");

  // Load todos from localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="p-4 border-b border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between text-sm">
          <span className="text-slate-600">
            {todos.length} task{todos.length !== 1 ? "s" : ""}
          </span>
          <span className="text-slate-500">{completedCount} completed</span>
        </div>
      )}

      {/* Todo List */}
      <div className="divide-y divide-slate-100">
        {todos.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-slate-300 hover:border-indigo-400"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
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
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
