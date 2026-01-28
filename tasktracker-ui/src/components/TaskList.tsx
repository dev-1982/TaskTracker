import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import type { TaskItem } from "../types1";

export function TaskList({ onEdit }: { onEdit: (task: TaskItem) => void }) {
  const client = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await api.get<TaskItem[]>("/tasks");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["tasks"] }),
  });

  if (isLoading) return <p>Загрузка…</p>;

  return (
    <div className="w-full flex flex-col gap-4">
      {tasks?.map((t) => (
        <div
          key={t.id}
          className="w-full bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
        >
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{t.title}</h3>
            <p className="text-gray-600">{t.description}</p>
            <p className="text-gray-400 text-sm">{t.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => onEdit(t)}
            >
              Редактировать
            </button>

            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => deleteMutation.mutate(t.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
