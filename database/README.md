# Database – To-Do App (Group 19)

This folder contains the SQL documentation, seed data, and setup instructions for the To-Do App database.

> [!NOTE]
> The application uses **SQLite by default**. Tables are created automatically when FastAPI starts.  
> PostgreSQL is listed in the project README as a future target — switch it by changing `DATABASE_URL`.

---

## Contents

| File | Purpose |
|---|---|
| `schema.sql` | Full SQL definition of all tables, indexes, and constraints |
| `seed.sql` | Sample users and tasks for development and demonstration |
| `README.md` | This file – setup guide and reference |

---

## Database Overview

The app stores data in **two tables**:

```
USERS  ──(one-to-many)──  TASKS
```

One user can own many tasks. Every task must belong to exactly one user.  
Deleting a user automatically deletes all of their tasks (cascade delete).

---

## Tables

### `users`

Stores every registered account.

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | INTEGER | ✓ | auto | Primary key, auto-incremented |
| `name` | VARCHAR(100) | ✓ | — | Full display name |
| `email` | VARCHAR(255) | ✓ | — | Must be unique; used to log in |
| `password_hash` | VARCHAR(255) | ✓ | — | bcrypt hash – plaintext never stored |
| `role` | VARCHAR(20) | ✓ | `'user'` | Either `'user'` or `'admin'` |
| `created_at` | DATETIME | — | current UTC time | Set automatically on insert |

### `tasks`

Stores every to-do item.

| Column | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | INTEGER | ✓ | auto | Primary key, auto-incremented |
| `user_id` | INTEGER | ✓ | — | Foreign key → `users.id` |
| `title` | VARCHAR(200) | ✓ | — | Short task title |
| `description` | TEXT | — | NULL | Optional longer explanation |
| `status` | VARCHAR(20) | ✓ | `'pending'` | `'pending'` or `'completed'` |
| `priority` | VARCHAR(20) | ✓ | `'medium'` | `'low'`, `'medium'`, or `'high'` |
| `due_date` | DATE | — | NULL | Optional deadline (YYYY-MM-DD) |
| `created_at` | DATETIME | — | current UTC time | Set automatically on insert |

---

## Relationships

```
USERS                        TASKS
┌─────────────────┐          ┌──────────────────────┐
│ id  (PK)        │◄─────────│ user_id  (FK)        │
│ name            │  1 : N   │ id  (PK)             │
│ email  (UNIQUE) │          │ title                │
│ password_hash   │          │ description          │
│ role            │          │ status               │
│ created_at      │          │ priority             │
└─────────────────┘          │ due_date             │
                             │ created_at           │
                             └──────────────────────┘
```

**Rules enforced by the database and application:**

- A task row cannot exist without a valid `user_id`.
- Deleting a user deletes all of that user's tasks (`ON DELETE CASCADE`).
- Two users cannot share the same email address (`UNIQUE` index on `users.email`).

---

## Indexes

| Index name | Table | Column(s) | Type |
|---|---|---|---|
| `ix_users_id` | users | id | Regular |
| `ix_users_email` | users | email | **Unique** |
| `ix_tasks_id` | tasks | id | Regular |
| `ix_tasks_user_id` | tasks | user_id | Regular |

> [!TIP]
> `ix_tasks_user_id` speeds up the most common query: "get all tasks for the logged-in user."

---

## Setup Instructions

### Step 1 – Install Python dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2 – Configure the environment

Copy the example environment file:

```bash
cp .env.example .env
```

Open `.env` and check the values:

```
# SQLite (default – no extra setup needed)
DATABASE_URL=sqlite:///./todo.db

# JWT secret – change this before going live
SECRET_KEY=super-secret-todo-jwt-key-change-in-production

# Token lifetime in minutes (1440 = 24 hours)
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### Step 3 – Start the backend (creates the database automatically)

```bash
cd backend
uvicorn app.main:app --reload
```

SQLAlchemy calls `Base.metadata.create_all()` on startup.  
This creates `backend/todo.db` with both tables if they do not already exist.

### Step 4 – Verify the tables were created

```bash
python -c "
import sqlite3
conn = sqlite3.connect('backend/todo.db')
cur = conn.cursor()
cur.execute(\"SELECT name FROM sqlite_master WHERE type='table'\")
print(cur.fetchall())
conn.close()
"
```

Expected output:

```
[('users',), ('tasks',)]
```

---

## Switching to PostgreSQL

If the team decides to use PostgreSQL instead of SQLite:

1. Install the PostgreSQL driver:

   ```bash
   pip install psycopg2-binary
   ```

2. Update `DATABASE_URL` in your `.env` file:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/tododb
   ```

3. Create the database in PostgreSQL first:

   ```sql
   CREATE DATABASE tododb;
   ```

4. Restart the backend. SQLAlchemy will create the tables in PostgreSQL automatically.

> [!IMPORTANT]
> The `schema.sql` file uses SQLite syntax (e.g. `AUTOINCREMENT`, `strftime`).  
> If you switch to PostgreSQL, the SQL file will need to be adapted (use `SERIAL` or `GENERATED ALWAYS AS IDENTITY` for primary keys).

---

## Running the Schema Script Manually

> You normally do **not** need this — the app creates the tables automatically.  
> Use this only if you need to recreate the database from scratch.

```bash
# Delete existing database
del backend\todo.db

# Recreate from schema
sqlite3 backend/todo.db < database/schema.sql
```

---

## Loading Sample Data

```bash
sqlite3 backend/todo.db < database/seed.sql
```

This inserts three sample accounts and nine sample tasks.  
The script is **safe to run multiple times** (`INSERT OR IGNORE` prevents duplicates).

**Demo accounts (all share password `Password123!`):**

| Email | Role |
|---|---|
| `alice@example.com` | user |
| `bob@example.com` | user |
| `admin@example.com` | admin |

> [!CAUTION]
> These accounts are for local development only. Never load seed data into a production database.

---

## Verifying the Database Manually

Open an interactive SQLite session:

```bash
sqlite3 backend/todo.db
```

Useful commands inside `sqlite3`:

```sql
-- List all tables
.tables

-- Show column details for users
PRAGMA table_info(users);

-- Show column details for tasks
PRAGMA table_info(tasks);

-- Show all indexes
.indexes

-- Count rows
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM tasks;

-- Exit
.quit
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `todo.db` not created | Make sure you ran `uvicorn` from inside the `backend/` folder |
| `ModuleNotFoundError` on startup | Run `pip install -r requirements.txt` |
| `OperationalError: no such table` | The app did not reach `create_all` – check the startup log for earlier errors |
| `UNIQUE constraint failed: users.email` | That email is already registered – use a different one or delete the existing row |
| `FOREIGN KEY constraint failed` | A task references a `user_id` that does not exist – insert the user first |
| Tables exist but columns are wrong | Delete `todo.db` and restart the backend to recreate clean tables |

---

## Important Rules

- Never commit the actual `todo.db` file to Git (it is listed in `backend/.gitignore`).
- Never commit a `.env` file containing real passwords or secrets.
- Never store plaintext passwords – the application stores bcrypt hashes only.
- Changes to column types or constraints require deleting `todo.db` and restarting (SQLite does not support `ALTER COLUMN`).
