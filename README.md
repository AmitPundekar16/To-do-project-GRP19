# Taskly To-Do

Taskly is a full-stack task manager. Users can register, sign in, and manage their own tasks through a React interface backed by a FastAPI API.

## Features

- Register and sign in with email and password.
- Create, list, edit, complete, and delete tasks.
- Set task descriptions, priorities, and due dates.
- View task counts and completion progress on the dashboard.
- Keep each user's tasks scoped to their account.
- Admin endpoints for user and task management.

## Technology

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** MySQL
- **Authentication:** JWT bearer tokens

## Project structure

```text
backend/
  app/
    main.py                 FastAPI application and routes
    database.py             SQLAlchemy and MySQL configuration
    models/                 User and task models
    schemas/                Request and response schemas
    routes/                 Authentication, task, and admin endpoints
    services/               Authentication and authorization logic
  make_admin.py             Promote an existing user to admin
  .env.example              Example environment configuration
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
database/
  schema.sql                MySQL schema reference
  seed.sql                  Optional sample users and tasks
  README.md                 Detailed database setup guide
docs/
  API_DOCUMENTATION.md
  test-cases.md
  ui-ux/                    Design specs, style guide, and wireframes
```

## Run locally on Windows

Install Python 3.10+, Node.js, and MySQL Server 8.0. Use two terminals from the repository root.

### Backend

In PowerShell:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The backend connects to the configured MySQL database. Ensure MySQL is running, `backend/.env` is configured, and the `tododb` database has been created before starting the backend. Open `http://localhost:8000/docs` for the interactive API reference.

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

## Database and Configuration

The application uses **MySQL** as its database. Ensure MySQL Server is installed and running before starting the backend.

### Database Setup

1. Open MySQL Workbench or the MySQL command-line client.
2. Create the database:

```sql
CREATE DATABASE IF NOT EXISTS tododb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Run the database schema file (`database/schema.sql`) to create the required tables and relationships.
4. Run `database/seed.sql` if you want to insert sample accounts and tasks (demo password: `Password123!`).

In Windows PowerShell:

```powershell
Get-Content database/schema.sql | mysql -u root -p tododb
Get-Content database/seed.sql | mysql -u root -p tododb
```

See [database/README.md](database/README.md) for detailed database setup steps.

### Backend Configuration

The backend reads `DATABASE_URL`, `SECRET_KEY`, and `ACCESS_TOKEN_EXPIRE_MINUTES` from `backend/.env` (via `python-dotenv`) or the process environment:

- `DATABASE_URL` – MySQL database connection URL
- `SECRET_KEY` – Secret key used for authentication
- `ACCESS_TOKEN_EXPIRE_MINUTES` – Token expiration time

Copy `backend/.env.example` to `backend/.env` and update your MySQL credentials, or set it in PowerShell:

```powershell
$env:DATABASE_URL = "mysql+pymysql://root:your_password@localhost:3306/tododb"
```

Replace `root` and `your_password` with your MySQL username and password. *(If your password contains `@`, encode it as `%40`.)* Never commit `backend/.env` to GitHub.

The built-in JWT secret is intended for local development only and must be replaced for deployment.

See [API documentation](docs/API_DOCUMENTATION.md) for implemented endpoints and fields.

## Build the frontend

```powershell
cd frontend
npm.cmd run build
```
