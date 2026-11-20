# To-Do API Documentation

## Overview

- Backend: FastAPI
- Local base URL: `http://localhost:8000/api`
- Interactive API reference: `http://localhost:8000/docs`
- Authentication: JWT bearer token for task and admin endpoints
- Local database: SQLite (`backend/todo.db` by default)
- Request content type: `application/json`

The backend also exposes the same routes without the `/api` prefix for Swagger OAuth2 compatibility. The frontend uses the `/api` prefix.

## Authentication

### Register

`POST /auth/register`

```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

Password length must be between 6 and 72 characters. On success, the API returns `201 Created` with the new user (`id`, `name`, `email`, `role`, and `created_at`). Passwords and password hashes are never returned.

### Log in

`POST /auth/login`

```json
{
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

On success, the API returns an access token and role:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "role": "user"
}
```

Send the token on protected requests:

```http
Authorization: Bearer <access_token>
```

`GET /auth/me` returns the authenticated user. `POST /auth/token` is a form-encoded endpoint used by Swagger's OAuth2 authorization dialog.

## Tasks

All task endpoints require a bearer token. A task is always associated with the authenticated user; the client cannot set its owner.

Task fields:

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Assigned by the server |
| `title` | string | Required, 1–200 characters |
| `description` | string or `null` | Optional |
| `status` | `pending` or `completed` | Defaults to `pending` |
| `priority` | `low`, `medium`, or `high` | Defaults to `medium` |
| `due_date` | `YYYY-MM-DD` string or `null` | Optional |
| `user_id` | integer | Set by the server |
| `created_at` | date-time | Assigned by the server |

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/tasks` | List the current user's tasks |
| `GET` | `/tasks?status=pending` | List tasks filtered by status |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks/{task_id}` | Get one of the current user's tasks |
| `PUT` | `/tasks/{task_id}` | Update editable task fields |
| `PATCH` | `/tasks/{task_id}/status` | Change status |
| `PATCH` | `/tasks/{task_id}/complete` | Mark a task completed |
| `DELETE` | `/tasks/{task_id}` | Delete a task; returns `204 No Content` |

Example create request:

```json
{
  "title": "Prepare project update",
  "description": "Summarize this week's progress",
  "priority": "high",
  "due_date": "2026-12-01"
}
```

Example status request:

```json
{
  "status": "completed"
}
```

The status filter accepts `pending` or `completed`. Requests for a task that does not exist or belongs to another user return `404 Not Found`.

## Admin endpoints

Admin requests require a bearer token for a user with the `admin` role.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/admin/users` | List users |
| `GET` | `/admin/tasks` | List all tasks; optional `user_id` filter |
| `GET` | `/admin/stats` | Get user and task counts |
| `PUT` | `/admin/users/{user_id}/role` | Set a user's role to `user` or `admin` |
| `DELETE` | `/admin/users/{user_id}` | Delete a user and their tasks |

To promote an existing user locally, run `python make_admin.py <email>` from the `backend` directory.

## Common errors

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing/invalid token or invalid credentials |
| `403 Forbidden` | Authenticated user lacks admin access |
| `404 Not Found` | Resource is missing or not accessible to the current user |
| `422 Unprocessable Entity` | Request validation failed |

See the root [README](../README.md) for local setup and run instructions. Use the live Swagger page at `/docs` as the definitive schema reference.
