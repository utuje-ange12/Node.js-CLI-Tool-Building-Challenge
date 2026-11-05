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