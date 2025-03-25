"use client";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/actions/todos";
import { Loader } from "@/components/Loader";
import { Todo } from "@/types";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

export const TodosPage = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  // Fetch Todos
  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Mutations
  const addTodoMutation = useMutation({
    mutationFn: (title: string) => addTodo({ title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, title, status }: Todo) =>
      updateTodo({ id, title, status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Handlers
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTodo.trim()) return;
      addTodoMutation.mutate(newTodo);
      setNewTodo("");
    },
    [newTodo, addTodoMutation]
  );

  const handleToggleStatus = useCallback(
    (todo: Todo) => {
      updateTodoMutation.mutate({
        ...todo,
        status: todo.status === "COMPLETED" ? "PENDING" : "COMPLETED",
      });
    },
    [updateTodoMutation]
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteTodoMutation.mutate(id);
      setDeleteModalOpen(false);
    },
    [deleteTodoMutation]
  );

  const confirmDelete = (todo: Todo) => {
    setTodoToDelete(todo);
    setDeleteModalOpen(true);
  };

  // Memoized Todo List
  const renderedTodos = useMemo(
    () =>
      todos.map((todo) => (
        <Card
          key={todo.id}
          shadow="md"
          padding="lg"
          radius="lg"
          withBorder
          style={{
            backdropFilter: "blur(10px)",
            background:
              todo.status === "COMPLETED"
                ? "#e0ffe0"
                : "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Group justify="space-between">
            <Checkbox
              label={
                <Text
                  fw={500}
                  style={{
                    textDecoration:
                      todo.status === "COMPLETED" ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </Text>
              }
              checked={todo.status === "COMPLETED"}
              onChange={() => handleToggleStatus(todo)}
            />
            <Group>
              <Text
                size="sm"
                color={todo.status === "COMPLETED" ? "green" : "orange"}
              >
                {todo.status}
              </Text>
              <Button
                color="red"
                size="xs"
                variant="light"
                onClick={() => confirmDelete(todo)}
              >
                ❌
              </Button>
            </Group>
          </Group>
        </Card>
      )),
    [todos, handleToggleStatus]
  );

  if (isLoading) return <Loader />;

  return (
    <Container size="xs" mt={50}>
      <Paper shadow="xl" radius="lg" p="xl" withBorder>
        <Title order={2} mb="md">
          Todo List ✅
        </Title>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit}>
          <Group>
            <TextInput
              placeholder="New todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              w={250}
              size="md"
              flex={1}
            />
            <Button type="submit" size="md">
              Add
            </Button>
          </Group>
        </form>
      </Paper>

      {/* List Todos */}
      <Stack mt="lg">{renderedTodos}</Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>Are you sure you want to delete "{todoToDelete?.title}"?</Text>
        <Group mt="md" justify="flex-end">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete(todoToDelete!.id)}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};
