# Database Setup - Group 19

This folder has the database files for our To-Do application.

The backend is built with FastAPI and SQLAlchemy. It connects to a **MySQL** database. The database connection URL is configured via the `.env` file in the `backend/` folder.

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

## Prerequisites

- **MySQL Server 8.0** installed and running on port `3306`
- **Python packages:** `pymysql`, `cryptography`, `python-dotenv` (listed in `backend/requirements.txt`)

Install them with:
```bash
pip install -r backend/requirements.txt
```

---

## How to Set Up

### 1. Create the MySQL database
```powershell
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS tododb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. Create the `.env` file
Create a file called `.env` inside the `backend/` folder with:
```env
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/tododb
```
> ⚠️ Replace `YOUR_PASSWORD` with your actual MySQL root password. Never commit this file to GitHub.

### 3. Create the tables (run schema.sql)
```powershell
Get-Content database/schema.sql | mysql -u root -p tododb
```

### 4. Load sample data (run seed.sql)
```powershell
Get-Content database/seed.sql | mysql -u root -p tododb
```

### 5. Start the backend
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```
SQLAlchemy will connect to MySQL and the app will be ready.

---

## Test Accounts

All 3 demo accounts use the password: `Password123!`

| Email | Role |
|---|---|
| alice@example.com | user |
| bob@example.com | user |
| admin@example.com | admin |

---

## Notes
- Do **not** commit `.env` to GitHub (it contains your MySQL password).
- Do **not** commit `backend/todo.db` if it still exists locally (old SQLite file, no longer used).
- If you need to reset the database, run `schema.sql` again after dropping the tables.
