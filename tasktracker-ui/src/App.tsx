import { useState } from "react";
import TaskForm from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import type { TaskItem } from "./types1";

export default function App() {
  const [editing, setEditing] = useState<TaskItem | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-10">
        <TaskForm
          editing={editing}
          onCreated={() => setEditing(null)}
          onCancelEdit={() => setEditing(null)}
        />

        <TaskList onEdit={(task) => setEditing(task)} />
      </div>
    </div>
  );
}
