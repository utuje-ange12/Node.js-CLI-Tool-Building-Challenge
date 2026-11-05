import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import {
  addTaskCommand,
  listTasksCommand,
  completeTaskCommand,
  deleteTaskCommand,
} from "../src/commands.js";

const DATA = new URL("../data/tasks.json", import.meta.url);
let backup;

before(async () => {
  backup = await readFile(DATA, "utf8");
  await writeFile(DATA, "[]\n");
});

after(async () => {
  await writeFile(DATA, backup);
});

test("adds a task", async () => {
  const task = await addTaskCommand("Revise semver");
  assert.equal(task.title, "Revise semver");
  assert.equal(task.completed, false);
  assert.equal((await listTasksCommand()).length, 1);
});

test("completes a task", async () => {
  const [task] = await listTasksCommand();
  const done = await completeTaskCommand(task.id);
  assert.equal(done.completed, true);
});

test("deletes a task and returns null for an unknown id", async () => {
  const [task] = await listTasksCommand();
  await deleteTaskCommand(task.id);
  assert.equal((await listTasksCommand()).length, 0);
  assert.equal(await deleteTaskCommand(999), null);
});