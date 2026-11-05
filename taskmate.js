#!/usr/bin/env node

import { parseArgs } from "node:util";
import ora from "ora";

import {
  addTaskCommand,
  listTasksCommand,
  completeTaskCommand,
  deleteTaskCommand,
} from "./src/commands.js";

import { getMotivationalQuote } from "./src/quote.js";

import {
  showSuccess,
  showError,
  showInfo,
  displayTasks,
} from "./src/display.js";

// Read terminal arguments
const { positionals } = parseArgs({
  allowPositionals: true,
});

const command = positionals[0];

// Handle CLI commands
try {
  // ADD TASK
  if (command === "add") {
    const title = positionals[1];

    if (!title) {
      showError("Please provide a task title.");
    } else {
      addTaskCommand(title);
      showSuccess("Task added successfully!");
    }

  // LIST TASKS
  } else if (command === "list") {
    const tasks = listTasksCommand();
    displayTasks(tasks);

  // COMPLETE TASK
  } else if (command === "complete") {
    const id = Number(positionals[1]);

    if (!Number.isInteger(id) || id <= 0) {
      showError("Please provide a valid task ID.");
    } else {
      completeTaskCommand(id);
      showSuccess("Task completed successfully!");
    }

  // DELETE TASK
  } else if (command === "delete") {
    const id = Number(positionals[1]);

    if (!Number.isInteger(id) || id <= 0) {
      showError("Please provide a valid task ID.");
    } else {
      deleteTaskCommand(id);
      showSuccess("Task deleted successfully!");
    }

  // MOTIVATIONAL QUOTE
  } else if (command === "quote") {
    const spinner = ora("Fetching a motivational quote...").start();

    const result = await getMotivationalQuote();

    if (result) {
      spinner.succeed("Your motivational quote is ready!");
      console.log(`"${result.quote}"`);
      console.log(`- ${result.author}`);
    } else {
      spinner.fail("Could not fetch a motivational quote.");
    }

  // HELP
  } else if (command === "help") {
    showInfo("TaskMate CLI - Available Commands:");

    console.log("  add <title>  - Add a new task");
    console.log("  list         - List all tasks");
    console.log("  complete <id> - Complete a task");
    console.log("  delete <id>  - Delete a task");
    console.log("  quote        - Get a motivational quote");
    console.log("  help         - Show available commands");

  } else {
    showError("Unknown command. Type 'node taskmate.js help' for help.");
  }

} catch (error) {
  showError(`An error occurred: ${error.message}`);
  process.exitCode = 1;
}