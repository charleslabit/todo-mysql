"use client";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
