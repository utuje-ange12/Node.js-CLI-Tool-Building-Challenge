import chalk from "chalk";
import Table from "cli-table3";

// Display a success message
export function showSuccess(message) {
  console.log(chalk.green(message));
}

// Display an error message
export function showError(message) {
  console.log(chalk.red(message));
}

// Display an information message
export function showInfo(message) {
  console.log(chalk.blue(message));
}

// Display all tasks in a table
export function displayTasks(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    showInfo("No tasks found.");
    return;
  }

  const table = new Table({
    head: ["ID", "Task", "Status"],
    colWidths: [10, 30, 15],
  });

  tasks.forEach((task) => {
    table.push([
      task.id,
      task.title,
      task.completed ? "Completed" : "Pending",
    ]);
  });

  console.log(table.toString());
}