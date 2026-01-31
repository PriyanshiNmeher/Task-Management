# Task Management Application

A full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Register and Login securely.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Filtering**: Filter tasks by status (Pending, In Progress, Completed).
- **Responsive Design**: Mobile-friendly UI.

## Tech Stack

- **Frontend**: React, Vite, CSS Modules (or inline styles), Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Setup & Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

### Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add your variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Tasks

- `GET /api/tasks` - Get all tasks (supports `?status=pending|in-progress|completed`)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## License

ISC
