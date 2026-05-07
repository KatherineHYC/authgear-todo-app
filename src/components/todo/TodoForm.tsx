import { useState, type FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-slate-100">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-btn-bg
            text-slate-800 placeholder-slate-400"
        />
        <button
          type="submit"
          className="bg-btn-bg hover:bg-primary text-white px-5 py-2.5
            rounded-lg font-medium transition-all duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
}
