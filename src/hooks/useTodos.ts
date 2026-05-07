import { useState, useEffect, useRef } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Todo } from "@/types/todo";
import type { DragEndEvent } from "@dnd-kit/core";

const STORAGE_KEY = "authgear-todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [newId, setNewId] = useState<string | null>(null);
  const [deletedTodo, setDeletedTodo] = useState<{
    todo: Todo;
    index: number;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (newId) {
      const t = setTimeout(() => setNewId(null), 400);
      return () => clearTimeout(t);
    }
  }, [newId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
    setNewId(newTodo.id);
  }

  function toggleTodo(id: string) {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTodos([
      ...updated.filter((t) => !t.completed),
      ...updated.filter((t) => t.completed),
    ]);
  }

  function editTodo(id: string, newText: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function deleteTodo(id: string) {
    const index = todos.findIndex((t) => t.id === id);
    const todo = todos[index];
    setTodos(todos.filter((t) => t.id !== id));
    setDeletedTodo({ todo, index });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setDeletedTodo(null), 5000);
  }

  function undoDelete() {
    if (!deletedTodo) return;
    const restored = [...todos];
    restored.splice(deletedTodo.index, 0, deletedTodo.todo);
    setTodos(restored);
    setDeletedTodo(null);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }

  function dismissToast() {
    setDeletedTodo(null);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return {
    todos,
    newId,
    deletedTodo,
    sensors,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    undoDelete,
    dismissToast,
    handleDragEnd,
  };
}
