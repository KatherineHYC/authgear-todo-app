import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "./TodoForm";
import { TodoStats } from "./TodoStats";
import { TodoItem } from "./TodoItem";
import { TodoToast } from "./TodoToast";

export function TodoList() {
  const {
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
  } = useTodos();

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <TodoForm onAdd={addTodo} />
        <TodoStats todos={todos} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-slate-100">
              {todos.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <p>No tasks yet. Add one above!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    isNew={todo.id === newId}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <TodoToast
        deletedTodo={deletedTodo}
        onUndo={undoDelete}
        onDismiss={dismissToast}
      />
    </>
  );
}
