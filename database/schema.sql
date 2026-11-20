-- =============================================================================
-- To-Do App – Database Schema (SQLite)
-- Group 19
--
-- This file documents the database structure used by the FastAPI backend.
-- The actual tables are created automatically by SQLAlchemy (via
-- Base.metadata.create_all) when the application starts.
--
-- Use this file to:
--   * Understand the table structure at a glance
--   * Recreate the database manually if needed (e.g. for testing or deployment)
--   * Verify that the SQLAlchemy models and the real tables agree
--
-- SQLite compatibility notes:
--   * SQLite stores INTEGER PRIMARY KEY as an auto-incrementing rowid alias.
--   * DEFAULT (strftime(...)) mimics SQLAlchemy's Python-side datetime default.
--   * FOREIGN KEY enforcement must be enabled per-connection with
--     PRAGMA foreign_keys = ON;
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Enable foreign-key enforcement (SQLite only)
-- ---------------------------------------------------------------------------
PRAGMA foreign_keys = ON;


-- ---------------------------------------------------------------------------
-- Table: users
--
-- Stores every registered account.
-- One user can own many tasks (one-to-many relationship with tasks).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    -- Unique numeric ID, assigned automatically by the database
    id            INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,

    -- Full display name supplied at registration (1-100 characters)
    name          VARCHAR(100) NOT NULL,

    -- Email address used to log in - must be unique across all accounts
    email         VARCHAR(255) NOT NULL UNIQUE,

    -- bcrypt hash of the user's password - the plaintext is never stored
    password_hash VARCHAR(255) NOT NULL,

    -- Access level: 'user' (default) or 'admin'
    role          VARCHAR(20)  NOT NULL DEFAULT 'user',

    -- UTC timestamp set when the row is inserted
    created_at    DATETIME     DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
);

-- Index on the primary key (created automatically, listed for clarity)
CREATE INDEX IF NOT EXISTS ix_users_id ON users (id);

-- Unique index on email (enforces the UNIQUE constraint and speeds up login lookup)
CREATE UNIQUE INDEX IF NOT EXISTS ix_users_email ON users (email);


-- ---------------------------------------------------------------------------
-- Table: tasks
--
-- Stores every to-do item. Each row belongs to exactly one user.
-- Deleting a user cascades and removes all of that user's tasks.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    -- Unique numeric ID, assigned automatically by the database
    id          INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,

    -- Owner of this task - references users.id
    user_id     INTEGER      NOT NULL REFERENCES users (id) ON DELETE CASCADE,

    -- Short title summarising the task (1-200 characters, required)
    title       VARCHAR(200) NOT NULL,

    -- Longer optional description; may be NULL
    description TEXT,

    -- Current state of the task
    --   Allowed values: 'pending', 'completed'
    status      VARCHAR(20)  NOT NULL DEFAULT 'pending',

    -- Importance level
    --   Allowed values: 'low', 'medium', 'high'
    priority    VARCHAR(20)  NOT NULL DEFAULT 'medium',

    -- Optional deadline for the task (stored as a date string: YYYY-MM-DD)
    due_date    DATE,

    -- UTC timestamp set when the row is inserted
    created_at  DATETIME     DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
);

-- Index on the primary key
CREATE INDEX IF NOT EXISTS ix_tasks_id ON tasks (id);

-- Index to speed up "fetch all tasks for user X" queries (most common query)
CREATE INDEX IF NOT EXISTS ix_tasks_user_id ON tasks (user_id);
