#!/usr/bin/env node

import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import ora from "ora";

import {
  addTaskCommand,
  listTasksCommand,
  completeTaskCommand,
  deleteTaskCommand,
} from "./src/commands.js";
import { getMotivationalQuote } from "./src/quote.js";
import { showSuccess, showError, showInfo, displayTasks } from "./src/display.js";

function fail(message) {
  showError(message);
  process.exit(1);
}

function showHelp() {
  showInfo("TaskMate CLI - Available Commands:");
  console.log('  add <title>      Add a new task');
  console.log("  list             List all tasks");
  console.log("  complete <id>    Mark a task as completed");
  console.log("  delete <id>      Delete a task");
  console.log("  quote            Get a motivational quote");
  console.log("  help             Show this help");
  console.log("");
  console.log("Options: -h, --help   -v, --version");
  console.log('Example: taskmate add "Revise semver"');
}

let parsed;
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" },
    },
  });
} catch (err) {
  fail(`${err.message}. Run: taskmate --help`);
}

const { values, positionals } = parsed;
const [command, ...args] = positionals;

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

try {
  if (values.version) {
    const pkg = JSON.parse(
      await readFile(new URL("./package.json", import.meta.url), "utf8")
    );
    console.log(pkg.version);
  } else if (values.help || !command || command === "help") {
    showHelp();
  } else if (command === "add") {
    const title = args.join(" ").trim();
    if (!title) fail("Please provide a task title.");
    await addTaskCommand(title);
    showSuccess("Task added successfully!");
  } else if (command === "list") {
    displayTasks(await listTasksCommand());
  } else if (command === "complete") {
    const id = parseId(args[0]);
    if (!id) fail("Please provide a valid task ID.");
    const task = await completeTaskCommand(id);
    if (!task) fail(`No task with ID ${id}.`);
    showSuccess("Task completed successfully!");
  } else if (command === "delete") {
    const id = parseId(args[0]);
    if (!id) fail("Please provide a valid task ID.");
    const task = await deleteTaskCommand(id);
    if (!task) fail(`No task with ID ${id}.`);
    showSuccess("Task deleted successfully!");
  } else if (command === "quote") {
    const spinner = ora("Fetching a motivational quote...").start();
    const result = await getMotivationalQuote();
    if (result) {
      spinner.succeed("Your motivational quote is ready!");
      console.log(`"${result.quote}"`);
      console.log(`- ${result.author}`);
    } else {
      spinner.fail("Could not fetch a motivational quote.");
      process.exit(1);
    }
  } else {
    fail(`Unknown command: ${command}. Run: taskmate --help`);
  }
} catch (error) {
  fail(`An error occurred: ${error.message}`);
}