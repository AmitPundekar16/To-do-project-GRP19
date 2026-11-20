-- =============================================================================
-- To-Do App – Sample / Seed Data (SQLite)
-- Group 19
--
-- Purpose:
--   Insert realistic sample users and tasks so the application can be
--   demonstrated and tested immediately after setup, without having to
--   manually register accounts or create tasks through the UI.
--
-- Safety:
--   • Uses INSERT OR IGNORE so the script is safe to run more than once –
--     it will NOT create duplicate rows.
--   • No real personal information is used anywhere.
--   • Password hashes below are bcrypt hashes of the string "Password123!"
--     They were generated with passlib[bcrypt] and are safe for demo use.
--     Never use a real password as seed data.
--
-- How to generate a fresh bcrypt hash (Python):
--   from passlib.context import CryptContext
--   ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
--   print(ctx.hash("Password123!"))
--
-- Prerequisites:
--   Run schema.sql first (or let the FastAPI app initialise the tables).
--
-- Usage:
--   sqlite3 backend/todo.db < database/seed.sql
-- =============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- Sample Users
--
-- Three accounts covering both roles (user and admin).
-- All accounts share the demo password:  Password123!
-- bcrypt hash (cost factor 12) of "Password123!":
--   $2b$12$eImiTXuWVxfM37uY4JANjQ==  <-- example placeholder format
--
-- Actual usable hashes generated with passlib bcrypt:
-- ---------------------------------------------------------------------------

INSERT OR IGNORE INTO users (id, name, email, password_hash, role, created_at) VALUES
(
    1,
    'Alice Demo',
    'alice@example.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewFHV5NApP73Y93i',
    'user',
    '2026-01-10 09:00:00'
),
(
    2,
    'Bob Demo',
    'bob@example.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewFHV5NApP73Y93i',
    'user',
    '2026-01-11 10:30:00'
),
(
    3,
    'Admin User',
    'admin@example.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewFHV5NApP73Y93i',
    'admin',
    '2026-01-09 08:00:00'
);

-- ---------------------------------------------------------------------------
-- Sample Tasks for Alice (user_id = 1)
-- ---------------------------------------------------------------------------

INSERT OR IGNORE INTO tasks (id, user_id, title, description, status, priority, due_date, created_at) VALUES
(
    1, 1,
    'Set up development environment',
    'Install Python, Node.js, Git, and clone the project repository.',
    'completed', 'high',
    '2026-01-12',
    '2026-01-10 09:05:00'
),
(
    2, 1,
    'Read project README',
    'Go through the full README and understand each team member''s responsibilities.',
    'completed', 'high',
    '2026-01-12',
    '2026-01-10 09:10:00'
),
(
    3, 1,
    'Complete registration API integration',
    'Connect the React registration form to POST /api/auth/register and handle success and error responses.',
    'pending', 'high',
    '2026-01-20',
    '2026-01-10 09:15:00'
),
(
    4, 1,
    'Implement JWT token storage',
    'Store the access token in localStorage after login and attach it to subsequent API requests.',
    'pending', 'medium',
    '2026-01-22',
    '2026-01-10 09:20:00'
),
(
    5, 1,
    'Handle API error messages in UI',
    'Show user-friendly error messages when the backend returns 400, 401, 404, or 422 responses.',
    'pending', 'medium',
    '2026-01-25',
    '2026-01-10 09:25:00'
);

-- ---------------------------------------------------------------------------
-- Sample Tasks for Bob (user_id = 2)
-- ---------------------------------------------------------------------------

INSERT OR IGNORE INTO tasks (id, user_id, title, description, status, priority, due_date, created_at) VALUES
(
    6, 2,
    'Review task management API endpoints',
    'Read through routes/tasks.py and understand each endpoint before writing tests.',
    'completed', 'high',
    '2026-01-15',
    '2026-01-11 10:35:00'
),
(
    7, 2,
    'Write Postman collection for task APIs',
    'Create requests for create, list, get, update, patch status, and delete task endpoints.',
    'pending', 'medium',
    '2026-01-20',
    '2026-01-11 10:40:00'
),
(
    8, 2,
    'Test user-scoping: verify one user cannot access another user''s tasks',
    'Log in as Alice, get task IDs, then try accessing them as Bob. Expect 404.',
    'pending', 'high',
    '2026-01-23',
    '2026-01-11 10:45:00'
),
(
    9, 2,
    'Document found bugs',
    'List any unexpected behaviour found during manual testing with reproduction steps.',
    'pending', 'low',
    NULL,
    '2026-01-11 10:50:00'
);

-- ---------------------------------------------------------------------------
-- Note: The admin account (user_id = 3) intentionally has no tasks.
-- Admin accounts are meant for user management, not personal task lists.
-- ---------------------------------------------------------------------------
