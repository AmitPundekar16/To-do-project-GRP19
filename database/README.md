# Database Setup - Group 19

This folder has the database files for our To-Do application. 

The backend is built with FastAPI and SQLAlchemy. By default, it connects to a local SQLite database (`todo.db`), which is created automatically when the backend starts.

---

## Files in this folder

- `schema.sql` : The SQL structure for creating our tables (`users` and `tasks`) manually.
- `seed.sql` : Sample dummy data to test the app without creating users manually every time.
- `README.md` : Basic setup and database explanation.

---

## Database Tables

We have 2 main tables:

### 1. `users` Table
Stores registered user accounts.
- `id` : Integer, Primary Key (auto increments)
- `name` : User's full name
- `email` : User's email (unique, used for login)
- `password_hash` : Hashed password (never plain text)
- `role` : 'user' or 'admin' (default is 'user')
- `created_at` : Account creation time

### 2. `tasks` Table
Stores tasks created by users.
- `id` : Integer, Primary Key (auto increments)
- `user_id` : Foreign Key pointing to `users.id`
- `title` : Task title
- `description` : Details about the task (optional)
- `status` : 'pending' or 'completed' (default: 'pending')
- `priority` : 'low', 'medium', or 'high' (default: 'medium')
- `due_date` : Deadline date (optional)
- `created_at` : When task was added

**Relationship:** One user can have multiple tasks. If a user is deleted, all their tasks get deleted automatically (`CASCADE`).

---

## How to Set Up

### 1. Automatic Setup (Default)
When you start the FastAPI backend:
```bash
cd backend
uvicorn app.main:app --reload
```
SQLAlchemy will automatically create `todo.db` with both tables.

### 2. Adding Sample Data
To load some test users and tasks, run:
```bash
sqlite3 backend/todo.db < database/seed.sql
```

**Test accounts created:**
- `alice@example.com` (user)
- `bob@example.com` (user)
- `admin@example.com` (admin)
- Password for all 3: `Password123!`

---

## Notes
- Do not commit `.env` or `todo.db` to GitHub.
- If you need to reset the database, just delete `todo.db` and start the backend again.
