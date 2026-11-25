-- =============================================================================
-- To-Do App – Database Schema (MySQL)
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
-- MySQL compatibility notes:
--   * AUTO_INCREMENT replaces SQLite's AUTOINCREMENT keyword.
--   * DEFAULT CURRENT_TIMESTAMP replaces SQLite's strftime(...) default.
--   * Foreign key enforcement is built-in with InnoDB engine (no PRAGMA needed).
--   * ENGINE=InnoDB ensures full foreign key and transaction support.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Create database (run once if not already created)
-- ---------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS tododb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tododb;


-- ---------------------------------------------------------------------------
-- Table: users
--
-- Stores every registered account.
-- One user can own many tasks (one-to-many relationship with tasks).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    -- Unique numeric ID, assigned automatically by the database
    id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,

    -- Full display name supplied at registration (1-100 characters)
    name          VARCHAR(100) NOT NULL,

    -- Email address used to log in - must be unique across all accounts
    email         VARCHAR(255) NOT NULL UNIQUE,

    -- bcrypt hash of the user's password - the plaintext is never stored
    password_hash VARCHAR(255) NOT NULL,

    -- Access level: 'user' (default) or 'admin'
    role          VARCHAR(20)  NOT NULL DEFAULT 'user',

    -- UTC timestamp set when the row is inserted
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index on the primary key (created automatically, listed for clarity)
CREATE INDEX ix_users_id ON users (id);

-- Unique index on email (enforces the UNIQUE constraint and speeds up login lookup)
CREATE UNIQUE INDEX ix_users_email ON users (email);


-- ---------------------------------------------------------------------------
-- Table: tasks
--
-- Stores every to-do item. Each row belongs to exactly one user.
-- Deleting a user cascades and removes all of that user's tasks.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    -- Unique numeric ID, assigned automatically by the database
    id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,

    -- Owner of this task - references users.id
    user_id     INT          NOT NULL,

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
    created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index on the primary key
CREATE INDEX ix_tasks_id ON tasks (id);

-- Index to speed up "fetch all tasks for user X" queries (most common query)
CREATE INDEX ix_tasks_user_id ON tasks (user_id);
