# To-Do API

## Overview

- Backend: FastAPI
- Local base URL: `http://localhost:8000`
- Interactive API documentation: `http://localhost:8000/docs`
- Local database: SQLite by default
- Content type: `application/json`, except form-encoded Swagger token requests and empty responses

Each route is registered both with and without the `/api` prefix. The frontend uses `/api`; for example, it calls `POST /api/auth/login`.

## Authentication

### Register

`POST /api/auth/register`

```json
{
  "name": "Alex Example",
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

The name must contain 1–100 characters. Passwords must contain 6–72 characters. On success, the API returns `201 Created` with the user's `id`, `name`, `email`, `role`, and `created_at`. Duplicate emails return `400 Bad Request`.

### Log in

`POST /api/auth/login`

```json
{
  "email": "alex@example.com",
  "password": "choose-a-password"
}
```

On success, the response includes a JWT and the user's role:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "role": "user"
}
```

Send the token with protected requests:

```http
Authorization: Bearer <access_token>
```

`GET /api/auth/me` returns the authenticated user. `POST /auth/token` is a form-encoded endpoint used by Swagger's OAuth2 authorization dialog.

## Tasks

All task endpoints require a bearer token. A task's owner is always derived from the token; the client cannot set `user_id`.

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Assigned by the server |
| `user_id` | integer | Assigned from the authenticated user |
| `title` | string | Required, 1–200 characters |
| `description` | string or `null` | Optional |
| `status` | `pending` or `completed` | Defaults to `pending` |
| `priority` | `low`, `medium`, or `high` | Defaults to `medium` |
| `due_date` | `YYYY-MM-DD` string or `null` | Optional |
| `created_at` | date-time | Assigned by the server |

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/tasks` | List the current user's tasks |
| `GET` | `/api/tasks?status=pending` | Filter the current user's tasks by status |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/{task_id}` | Get one of the current user's tasks |
| `PUT` | `/api/tasks/{task_id}` | Update editable task fields |
| `PATCH` | `/api/tasks/{task_id}/status` | Change status |
| `PATCH` | `/api/tasks/{task_id}/complete` | Mark a task completed |
| `DELETE` | `/api/tasks/{task_id}` | Delete a task; returns `204 No Content` |

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

The status filter accepts `pending` or `completed`. A missing task or one owned by another user returns `404 Not Found`.

## Admin endpoints

Admin endpoints require a bearer token for a user with the `admin` role.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/admin/users` | List users |
| `GET` | `/api/admin/tasks` | List all tasks; optional `user_id` filter |
| `GET` | `/api/admin/stats` | Get user and task counts |
| `PUT` | `/api/admin/users/{user_id}/role` | Set a user's role to `user` or `admin` |
| `DELETE` | `/api/admin/users/{user_id}` | Delete a user and their tasks |

Promote an existing user locally by running `python make_admin.py <email>` from the `backend` directory.

## Common errors

| Status | Meaning |
|---|---|
| `400 Bad Request` | Email is already registered or an invalid role operation was requested |
| `401 Unauthorized` | Missing/invalid token or invalid credentials |
| `403 Forbidden` | Authenticated user lacks admin access |
| `404 Not Found` | Resource is missing or not accessible to the current user |
| `422 Unprocessable Entity` | Request validation failed |

See the root [README](../README.md) for local setup instructions. The live Swagger page at `/docs` is the authoritative OpenAPI reference.
