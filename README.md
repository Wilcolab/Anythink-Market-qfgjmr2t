# Python Server

This project contains a FastAPI server implemented in Python. It provides two routes for managing a task list.

## Project Structure

The project has the following files and directories:

- `python-server/src/main.py`: This file contains the implementation of the FastAPI server with two routes. It handles adding a task to a list and retrieving the list.

- `python-server/src/__init__.py`: This file is an empty file that marks the `src` directory as a Python package.

- `python-server/requirements.txt`: This file lists the dependencies required for the FastAPI server and other dependencies.

- `python-server/Dockerfile`: This file is used to build a Docker image for the FastAPI server. It specifies the base image, copies the source code into the image, installs the dependencies, and sets the command to run the server.

- `docker-compose.yml`: This file is used to define and run multi-container Docker applications. It specifies the services to run, their configurations, and any dependencies between them.

## Getting Started

To run the FastAPI server using Docker, follow these steps:


  ```shell
  docker compose up
  ```

  This command will build the Docker image for the FastAPI server and start the containers defined in the `docker-compose.yml` file.



---

## Node (Express) server

A Node.js + Express implementation was added in `express-server-js/`. It provides the same simple task-list API as the FastAPI app and listens on port `8001`.

- `express-server-js/src/index.js` implements:
  - `GET /` -> `Hello World`
  - `GET /tasks` -> `{ tasks: [...] }`
  - `POST /tasks` -> accepts JSON `{ "text": "..." }` and appends to the in-memory list

- The Node `Dockerfile` was updated to copy only `package.json` and run `npm install` so the image builds even when `yarn.lock` is not present. The `start` script uses `nodemon` for local development.

### Run both services (Docker Compose)

```bash
docker compose up --build
```

### Run Node only with Compose

```bash
docker compose up --build node-server
```

### Run Node locally (dev)

```bash
cd express-server-js
yarn install
yarn start
```

If you'd like, I can finish replacing the top-level README with a consolidated document describing both services — tell me if you want the full rewrite now.
## API Routes

The FastAPI server provides the following API routes:

- `POST /tasks`: Adds a task to the task list. The request body should contain the task details.

- `GET /tasks`: Retrieves the task list.
