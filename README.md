# Taskly To-Do

Taskly is a full-stack task manager. Users can register, sign in, and manage their own tasks through a React interface backed by a FastAPI API.

## Features

- Register and sign in with email and password.
- Create, list, edit, complete, and delete tasks.
- Set task descriptions, priorities, and due dates.
- View task counts and completion progress on the dashboard.
- Track overdue tasks, get in-app notifications, and use dark mode.
- Review progress reports, task calendars, and priority/status charts.
- Use the AI assistant to break down tasks, plan a day, or suggest tasks.
- Keep each user's tasks scoped to their account.
- Admin dashboard for workspace users, tasks, and statistics.

## Technology

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** SQLite by default for local development
- **Authentication:** JWT bearer tokens

## Project structure

```text
backend/
  app/
    main.py                 FastAPI application and routes
    database.py             SQLAlchemy and SQLite configuration
    models/                 User and task models
    schemas/                Request and response schemas
    routes/                 Authentication, task, admin, and AI endpoints
    services/               Authentication and authorization logic
  make_admin.py             Promote an existing user to admin
  requirements.txt
frontend/
  src/
    App.tsx                 Main application and page state
    pages/                  Sign-in, user/admin dashboards, reports, calendar, and AI
    components/              Sidebar and task form modal
    lib/api.ts              API client and data mapping
    styles.css              Application styles
  styles/theme.css          Shared style tokens
  package.json
database/
  schema.sql                SQLite schema reference
  seed.sql                  Optional sample users and tasks
docs/
  API_DOCUMENTATION.md
  test-cases.md
  ui-ux/                    Design specs, style guide, and wireframes
```

## Run locally on Windows

Install Python 3.10+ and Node.js. Use two terminals from the repository root.

### Backend

In PowerShell:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
$env:GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The backend creates `backend/todo.db` automatically when started from the `backend` directory. Open `http://localhost:8000/docs` for the interactive API reference.

The Gemini key is optional for the rest of the app, but required to use the AI assistant. Set it in the backend terminal before starting Uvicorn; it is never sent to the frontend. AI requests send the selected task's title/description, the current user's pending task titles/priorities/due dates, or the goal text you enter to Google's Gemini API. Do not include sensitive information in those task fields or goals.

### Frontend

Open another terminal at the repository root:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`. Create an account on the sign-in screen; the app signs you in automatically. On later visits, sign in with that account.

The frontend uses `http://localhost:8000/api` by default. To use a different backend address, set `VITE_API_URL` before starting Vite:

```powershell
$env:VITE_API_URL = "http://localhost:8000/api"
```

## Database and configuration

Local development uses SQLite and does not require manual database setup. `database/seed.sql` can add sample accounts and tasks after the database has been created; its demo password is `Password123!`.

The backend reads `DATABASE_URL`, `SECRET_KEY`, and `ACCESS_TOKEN_EXPIRE_MINUTES` from the process environment. `backend/.env.example` is a reference file; the app does not load `.env` files automatically. The built-in JWT secret is for local development only and must be replaced for deployment.

See [API documentation](docs/API_DOCUMENTATION.md) for implemented endpoints and fields.

## Build the frontend

```powershell
cd frontend
npm.cmd run build
```
