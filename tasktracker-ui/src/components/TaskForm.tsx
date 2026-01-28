import React, { useState, useEffect } from "react";
import type { TaskItem } from "../types1";
import api from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskFormProps {
  editing: TaskItem | null;
  onCreated: () => void;
  onCancelEdit: () => void;
}

export default function TaskForm({ editing, onCreated, onCancelEdit }: TaskFormProps) {
  const client = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskItem["status"]>("new");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description ?? "");
      setStatus(editing.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("new");
    }
  }, [editing]);

  const createMutation = useMutation({
    mutationFn: async () => {
      await api.post("/tasks", { title, description, status });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
      onCreated();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      await api.put(`/tasks/${editing!.id}`, {
        id: editing!.id,
        title,
        description,
        status,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
      onCreated();
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    editing ? updateMutation.mutate() : createMutation.mutate();
  };

  return (
    <div className="w-full flex flex-col gap-8">

      <h1 className="text-4xl font-bold text-gray-900 text-center">
        Task Tracker
      </h1>

      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium">Название задачи</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Введите название..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Введите описание..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium">Статус</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskItem["status"])}
            className="w-full border border-gray-300 bg-white px-4 py-3 text-lg rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-xl font-semibold"
        >
          {editing ? "Обновить задачу" : "Создать задачу"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg text-lg"
          >
            Отмена
          </button>
        )}
      </div>
    </div>
  );
}
