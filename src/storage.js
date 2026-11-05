import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DATA_FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "tasks.json"
);

export async function loadTasks() {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function saveTasks(tasks) {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2) + "\n", "utf8");
}

export async function getTasks() {
  return loadTasks();
}

export async function addTask(task) {
  const tasks = await loadTasks();
  const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask = { id: nextId, ...task };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

export async function completeTask(id) {
  const tasks = await loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.completed = true;
  await saveTasks(tasks);
  return task;
}

export async function deleteTask(id) {
  const tasks = await loadTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const [removed] = tasks.splice(index, 1);
  await saveTasks(tasks);
  return removed;
}