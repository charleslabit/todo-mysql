"use server";
import { Todo, TodoInput } from "@/types";
import axios from "axios";

const API_URL = "https://todo-mysql-api-production.up.railway.app/api/todos";

export async function getTodos(): Promise<Todo[]> {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function addTodo({ title }: TodoInput) {
  // Status can be set by default
  const res = await axios.post(API_URL, { title });
  return res.data;
}

export async function updateTodo({ id, status, title }: Todo) {
  await axios.put(`${API_URL}/${id}`, { title, status });
}

export async function deleteTodo(id: number) {
  await axios.delete(`${API_URL}/${id}`);
}
