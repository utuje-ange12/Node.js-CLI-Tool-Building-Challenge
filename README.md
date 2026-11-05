# TaskMate CLI

A command-line task manager built with Node.js.

## Install

```
git clone https://github.com/utuje-ange12/Node.js-CLI-Tool-Building-Challenge.git
cd Node.js-CLI-Tool-Building-Challenge
npm install
npm link
```

After `npm link`, the `taskmate` command works from any folder.

## Usage

```
taskmate add "Revise semver"
taskmate list
taskmate complete 1
taskmate delete 1
taskmate quote
taskmate help
```

## Features

- Argument parsing with `util.parseArgs`
- Tasks saved in `data/tasks.json`
- `quote` fetches a motivational quote from a web API, with a spinner
- Coloured output (`chalk`) and a task table (`cli-table3`)
- Errors exit with code 1

## Scripts

- `npm start` runs the app
- `npm run dev` restarts on file changes
- `npm test` runs the tests
- `npm run format` formats the code with Prettier

## Authors

Collaborator 1 and Collaborator 2 (group of two).