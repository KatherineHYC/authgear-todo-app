import { useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import type { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isNew: boolean;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, isNew }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditing ? {} : listeners)}
      className={`outline-none flex items-center gap-3 p-4 hover:bg-slate-50
        transition-colors group
        ${isDragging ? "opacity-50 shadow-md z-10 relative cursor-grabbing" : "cursor-grab"}
        ${isNew ? "animate-slide-in" : ""}`}
    >
      {/* 勾選按鈕 */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center
          justify-center transition-colors ${
            todo.completed
              ? "bg-btn-bg border-btn-bg"
              : "border-slate-300 hover:border-btn-bg"
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

      {/* 文字 or 編輯框 */}
      {isEditing ? (
        <textarea
          autoFocus
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          onBlur={handleSave}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              setEditText(todo.text);
              setIsEditing(false);
            }
          }}
          rows={1}
          ref={(el) => {
            textareaRef.current = el;
            if (el) {
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }
          }}
          className="flex-1 min-w-0 bg-transparent border-b border-btn-bg
            focus:outline-none text-slate-700 py-0.5 resize-none overflow-hidden leading-normal"
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? "text-slate-400 line-through" : "text-slate-700"}`}
        >
          {todo.text}
        </span>
      )}

      {/* 編輯 + 刪除按鈕 */}
      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 transition-opacity duration-150">
          <button
            onClick={() => !todo.completed && setIsEditing(true)}
            className="flex items-center justify-center w-6 h-6 rounded-md
              text-slate-400 hover:text-btn-bg hover:bg-slate-200 transition-all duration-150"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="flex items-center justify-center w-6 h-6 rounded-md
              text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
          >
            <svg
              className="w-3.5 h-3.5"
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
      )}
    </div>
  );
}
