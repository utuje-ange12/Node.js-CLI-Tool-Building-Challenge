import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "./storage.js";

// Add a new task
export function addTaskCommand(title) {
  const task = {
    title: title,
    completed: false,
  };

  return addTask(task);
}

// List all tasks
export function listTasksCommand() {
  return getTasks();
}

// Mark a task as completed
export function completeTaskCommand(id) {
  return completeTask(id);
}

// Delete a task
export function deleteTaskCommand(id) {
  return deleteTask(id);
}