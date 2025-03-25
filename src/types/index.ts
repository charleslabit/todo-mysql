export type Status = "PENDING" | "COMPLETED";

export interface Todo {
  id: number;
  title: string;
  status: Status;
}

export type TodoInput = Omit<Todo, "id" | "status">;
