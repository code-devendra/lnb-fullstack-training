# TODO List Backend API

This project is a backend API for a TODO list application. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on TODO items.

## Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites

- Node.js (version >= 10)
- MongoDB (version >= 5)
- npm (Node Package Manager)

### Installation

1. Clone the complete directory:

2. Install the dependencies:

```bash
  cd todo-list-backend
  npm install
```

### Usage

1. Start the server: `npm start`

The server will start running on the specified port (default is `8040`).

2. Access the API endpoints: `http://localhost:8040/api/n1/tasks`

You can use tools like Postman or cURL to test the API endpoints.

## API Endpoints

### Get all tasks

- Method: GET
- URL: `/tasks`
- Description: Retrieves all tasks.

### Get a single task by ID

- Method: GET
- URL: `/tasks/:id`
- Description: Retrieves a specific task by its ID.

### Create a new task

- Method: POST
- URL: `/tasks`
- Description: Creates a new task.

### Update a task by ID

- Method: PATCH
- URL: `/tasks/:id`
- Description: Updates a specific task by its ID.

### Delete a task by ID

- Method: DELETE
- URL: `/tasks/:id`
- Description: Deletes a specific task by its ID.

### Search a task by query

- Method: GET
- URL: `/tasks/search`
- Description: Search all tasks that match user query. You need to specify query in a way that key as name key and value as your search query.

## Data Structure

A task item has the following properties:

- `id`: The unique identifier of the task.
- `title`: The title or name of the task.
- `description`: The description or details of the task.
- `completed`: A boolean indicating whether the task is completed or not.

## Error Handling

The API provides appropriate error responses in the following scenarios:

- `Invalid routes`: Returns a 404 Not Found error response for invalid routes.
- `Non-existing todo IDs`: Returns a 404 Not Found error response for task IDs that do not exist.
- `Invalid request payloads`: Validates the request payloads for creating/updating tasks and returns meaningful error messages if the data is invalid.

## Testing

You can test the API endpoints using a tool like Postman or cURL to ensure they work correctly.

## Built With

- Express.js - Web framework for Node.js
- Mongoose - Node.js ODM
- npm - Dependency management

## Authors

- [Devendra Khinchi]
