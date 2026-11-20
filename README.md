# Taskly To-Do

Taskly is a full-stack task management app. Users can create an account, sign in, and manage their own tasks from a React interface backed by a FastAPI API.

## Features

- Register and sign in with email and password.
- Create, view, edit, complete, and delete tasks.
- Add task descriptions, priorities, and due dates.
- View task summaries on a dashboard.
- Keep each user's tasks private to their account.

## Technology

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** SQLite by default for local development
- **Authentication:** JWT bearer tokens

## Project layout

```text
backend/
  app/
    main.py                 FastAPI application and routes
    database.py             SQLAlchemy and SQLite configuration
    models/                 User and task models
    schemas/                API request and response schemas
    routes/                 Authentication, task, and admin endpoints
    services/               Authentication and authorization logic
  make_admin.py             Promote an existing user to admin
  requirements.txt
frontend/
  src/
    App.tsx                 Main application and page state
    pages/                  Sign-in, dashboard, and task list
    components/              Sidebar and task form modal
    lib/api.ts              API client and data mapping
    styles.css              Application styles
  styles/theme.css          Shared style tokens
  package.json
docs/
  API_DOCUMENTATION.md
  ui-ux/                    Design specs, style guide, and wireframes
```

## Run locally on Windows

Install Python 3.10+ and Node.js first. Run the backend and frontend in separate terminals from the repository root.

### Backend

In PowerShell:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The backend creates the SQLite database automatically. The local API is at `http://localhost:8000`; interactive API documentation is at `http://localhost:8000/docs`.

### Frontend

Open another terminal at the repository root:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Open the local Vite URL printed in the terminal, usually `http://localhost:5173`. Create an account on the sign-in screen; the app signs you in automatically. On later visits, sign in with that account.

The frontend uses `http://localhost:8000/api` by default. To use a different backend URL, set `VITE_API_URL` before starting Vite, for example:

```powershell
$env:VITE_API_URL = "http://localhost:8000/api"
```

## API and configuration

See [API documentation](docs/API_DOCUMENTATION.md) for implemented endpoints and request fields. The backend defaults to SQLite and does not require database setup for local development. `backend/.env.example` documents available environment variables. The built-in JWT secret is for local development only; configure a private secret before deployment.

Build the frontend with:

```powershell
cd frontend
npm.cmd run build
```
