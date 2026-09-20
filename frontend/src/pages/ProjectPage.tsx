import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  createTask,
  getTasks,
  updateTask,
  type CreateTaskInput,
} from "../services/task.service";

import type { Task } from "../types/task";

export default function ProjectPage() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      if (!projectId) return;

      try {
        setError("");

        const data = await getTasks(projectId);

        setTasks(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to fetch tasks";

          setError(message);
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [projectId]);

  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!projectId || !taskName.trim()) {
      return;
    }

    try {
      setError("");
      setIsCreating(true);

      const data: CreateTaskInput = {
        name: taskName.trim(),
      };

      if (dueDate) {
        data.dueDate = new Date(dueDate).toISOString();
      }

      const newTask = await createTask(projectId, data);

      setTasks((prev) => [newTask, ...prev]);

      setTaskName("");
      setDueDate("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create task";

        setError(message);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsCreating(false);
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      setError("");

      const updatedTask = await updateTask(task.id, {
        isCompleted: !task.isCompleted,
      });

      setTasks((prev) =>
        prev.map((item) => (item.id === updatedTask.id ? updatedTask : item)),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update task";

        setError(message);
      } else {
        setError("Something went wrong!");
      }
    }
  }

  const sortedTask = [...tasks].sort(
    (a, b) => Number(a.isCompleted) - Number(b.isCompleted),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">Tasks</h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
        )}

        <form
          onSubmit={handleCreateTask}
          className="mb-6 flex flex-col gap-3 rounded-lg bg-white p-4 shadow sm:flex-row"
        >
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className="flex-1 rounded border px-3 py-2"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded border px-3 py-2"
          />

          <button
            type="submit"
            disabled={isCreating || !taskName.trim()}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Add Task"}
          </button>
        </form>

        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Create your first task.</p>
        ) : (
          <div className="space-y-3">
            {sortedTask.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg p-4 shadow ${
                  task.isCompleted ? "bg-green-100" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleTask(task)}
                    className="mt-1 h-4 w-4"
                  />

                  <div>
                    <h2
                      className={`font-semibold ${
                        task.isCompleted ? "text-green-700 line-through" : ""
                      }`}
                    >
                      {task.name}
                    </h2>

                    {task.dueDate && (
                      <p className="text-sm text-gray-600">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
