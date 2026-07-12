# HealthSlot

HealthSlot is a MERN stack application with three separate apps:

- backend
- frontend
- admin

This repository now includes a root-level workspace setup so you can manage everything from the project root.

## Quick start

```bash
git clone <repository-url>
cd HealthSlot
npm run install:all
npm run dev
```

## Available root scripts

### npm run install:all
Installs dependencies for the backend, frontend, and admin apps from the repository root. It checks for existing node_modules and skips unnecessary reinstalls.

### npm run dev
Starts the backend, frontend, and admin applications in parallel with clear prefixes in the terminal.

### npm run build:all
Builds the frontend and admin apps, and runs a backend build if one is defined.

### npm run lint:all
Runs lint for every app that provides a lint script.

### npm run test:all
Runs tests for every app that provides a test script.

### npm run clean
Removes node_modules, build/dist folders, and common temporary cache directories.

### npm run reinstall
Runs clean first, then install:all.

## Notes

- Backend, frontend, and admin remain independent applications.
- The root scripts are cross-platform and work on Windows, macOS, and Linux.
- The root workspace uses concurrent process management so the apps can run together from one terminal.
