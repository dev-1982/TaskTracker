export interface TaskItem {
  id: number;
  title: string;
  description: string | null;
  status: "new" | "inProgress" | "done";
  createdAt: string;
}
