# To-do-project-GRP19

A full-stack task management application that allows users to manage their daily tasks efficiently. Users can register, log in, create tasks, update task details, track progress, and delete tasks.

## Features

- User Registration and Login
- Add New Tasks
- View All Tasks
- View Individual Task Details
- Update Task Details
- Delete Tasks
- Update Task Status:
  - Incomplete
  - Partially Completed
  - Completed
- User-specific Task Management

## Tech Stack

- **Frontend:** React
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **Version Control:** Git and GitHub
- **API Testing:** Postman / Swagger

## Project Structure

```text
To-do-project-GRP19/
│
├── frontend/               # React frontend
│
├── backend/                # FastAPI backend
│   └── app/
│       ├── main.py         # Application entry point
│       ├── database.py     # Database connection
│       ├── models/         # Database models
│       ├── schemas/        # Request/response schemas
│       ├── routes/         # API endpoints
│       └── services/       # Business logic
│
├── docs/                   # Project documentation
│
├── .env.example            # Environment variables template
├── .gitignore              # Git ignored files
└── README.md               # Project documentation
```

## Task Status

| Status | Description |
|---|---|
| INCOMPLETE | Task is not finished |
| PARTIALLY_COMPLETED | Task is in progress |
| COMPLETED | Task is finished |

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd todo-app
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment and install dependencies:

```bash
pip install -r requirements.txt
```

Configure your database credentials in the `.env` file.

Run the backend:

```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

FastAPI provides interactive API documentation through Swagger UI:

```text
http://localhost:8000/docs
```

## Team Collaboration

- GitHub is used for version control and collaboration.
- Each member works on a separate feature branch.
- Changes are merged through Pull Requests.
- The `main` branch contains stable code.

## Project Goal

To develop a simple, reliable and user-friendly task management application while implementing full-stack development concepts, REST APIs, database management and team collaboration.
