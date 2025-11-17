# Express Server with Nodemon

This project is a simple Express server setup that listens on port 8001. It uses Nodemon for automatic code reloading during development.

## Project Structure

```
express-server-js
├── src
│   └── index.js        # Entry point of the application
├── package.json        # Configuration file for npm
├── nodemon.json        # Configuration for Nodemon
├── Dockerfile          # Instructions to build the Docker image
├── .dockerignore       # Files to ignore when building the Docker image
├── .gitignore          # Files to ignore by Git
├── yarn.lock           # Locks the versions of dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and Yarn should be installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd express-server-js
   ```

2. Install dependencies:
   ```
   yarn install
   ```

### Running the Server

To start the server with automatic reloading, use:

```
yarn start
```

The server will be running on [http://localhost:8001](http://localhost:8001).

### Docker

To build and run the Docker container, use the following commands:

1. Build the Docker image:
   ```
   docker build -t express-server-js .
   ```

2. Run the Docker container:
   ```
   docker run -p 8001:8001 express-server-js
   ```

### License

This project is licensed under the MIT License.