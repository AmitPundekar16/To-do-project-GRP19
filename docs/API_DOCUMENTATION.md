# To-Do API Documentation

## Status

This document defines a proposed API contract from the requirements in the project README. The backend routes and data models may not exist yet. Confirm field names, identifier types, validation limits, and response formats with the backend implementation before treating this contract as final.

## Overview

- Backend: FastAPI
- Local base URL: `http://localhost:8000`
- Interactive API reference: `http://localhost:8000/docs`
- Authentication: JWT bearer token for protected task endpoints
- Data store: PostgreSQL
- Content type: `application/json`, except empty responses

The endpoint paths below assume there is no global `/api` prefix. If the application adds a prefix or version, apply it consistently to all paths and update this document.

## Authentication

Register and log in using the authentication endpoints. A successful login returns an access token. Send it on every task request using this header:

```http
Authorization: Bearer <access_token>
```

The backend must hash passwords before storing them. It must derive the current user from the verified token rather than accepting a user ID from a task request. Users may only list, view, update, or delete their own tasks.

## Endpoints

| Method | Path | Authentication | Purpose |
|---|---|---|---|
| `POST` | `/auth/register` | No | Create a user account |
| `POST` | `/auth/login` | No | Authenticate and receive a JWT |
| `GET` | `/tasks` | Bearer token | List the current user's tasks |
| `POST` | `/tasks` | Bearer token | Create a task for the current user |
| `GET` | `/tasks/{task_id}` | Bearer token | Get one of the current user's tasks |
| `PUT` | `/tasks/{task_id}` | Bearer token | Replace editable task details |
| `PATCH` | `/tasks/{task_id}/status` | Bearer token | Change a task's status |
| `DELETE` | `/tasks/{task_id}` | Bearer token | Delete one of the current user's tasks |

### Register

`POST /auth/register`

Request:

```json
{
  "email": "alex@example.com",
  "password": "choose-a-strong-password"
}
```

Proposed success response, `201 Created`:

```json
{
  "id": 1,
  "email": "alex@example.com"
}
```

Do not include the password or its hash in a response. Return `409 Conflict` if the email is already registered, or `422 Unprocessable Entity` for invalid input.

### Log in

`POST /auth/login`

Request:

```json
{
  "email": "alex@example.com",
  "password": "choose-a-strong-password"
}
```

Proposed success response, `200 OK`:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

Return `401 Unauthorized` when the credentials are invalid. Do not reveal whether the email or password was the incorrect value.

### Task data

The proposed task representation is:

```json
{
  "id": 42,
  "title": "Prepare project update",
  "description": "Summarize this week's progress",
  "status": "INCOMPLETE"
}
```

`id` is assigned by the server. `title` is required. `description` is optional and may be `null`. The status must be one of:

| Value | Meaning |
|---|---|
| `INCOMPLETE` | Task is not completed |
| `PARTIALLY_COMPLETED` | Task is in progress |
| `COMPLETED` | Task is finished |

New tasks should default to `INCOMPLETE` when status is omitted. The task owner is set from the authenticated user and must not be writable through the task request body.

### List tasks

`GET /tasks`

Returns only tasks owned by the authenticated user. Proposed success response, `200 OK`:

```json
[
  {
    "id": 42,
    "title": "Prepare project update",
    "description": "Summarize this week's progress",
    "status": "INCOMPLETE"
  }
]
```

An account with no tasks receives an empty array.

### Create a task

`POST /tasks`

Request:

```json
{
  "title": "Prepare project update",
  "description": "Summarize this week's progress"
}
```

Proposed success response, `201 Created`: the created task object, including its assigned `id` and `status`.

### Get one task

`GET /tasks/{task_id}`

Proposed success response, `200 OK`: the task object. Return `404 Not Found` if the task does not exist or belongs to another user.

### Update task details

`PUT /tasks/{task_id}`

Request:

```json
{
  "title": "Prepare final project update",
  "description": "Include the test results"
}
```

`PUT` replaces the editable task details. The owner and task ID are not changed. Proposed success response, `200 OK`: the updated task object. Return `404 Not Found` for a missing task or one owned by another user, and `422 Unprocessable Entity` for invalid input.

### Update task status

`PATCH /tasks/{task_id}/status`

Request:

```json
{
  "status": "PARTIALLY_COMPLETED"
}
```

Proposed success response, `200 OK`: the updated task object. Reject values outside the three statuses above with `422 Unprocessable Entity`. Return `404 Not Found` for a missing task or one owned by another user.

### Delete a task

`DELETE /tasks/{task_id}`

Proposed success response: `204 No Content` with an empty body. Return `404 Not Found` if the task does not exist or belongs to another user.

## Error responses

Use FastAPI's validation response format for invalid request bodies unless the project adopts a documented custom error format. The main status codes are:

| Status | Meaning |
|---|---|
| `201 Created` | A user or task was created |
| `200 OK` | A request succeeded and returned data |
| `204 No Content` | A task was deleted successfully |
| `401 Unauthorized` | Authentication is missing, invalid, expired, or credentials are incorrect |
| `404 Not Found` | The resource does not exist or is not accessible to the current user |
| `409 Conflict` | Registration conflicts with an existing account |
| `422 Unprocessable Entity` | Request fields or values failed validation |

## Authorization and security requirements

- Require a valid bearer token on every task endpoint.
- Scope every task query and mutation to the authenticated user's ID.
- Do not trust an owner/user ID supplied by the client.
- Return the same `404` result for a nonexistent task and another user's task to avoid disclosing resource ownership.
- Store only password hashes, never plaintext passwords.
- Keep JWT secrets and database credentials in environment variables; never commit real secrets.

## Trying the API

Start the backend using the command in the root README, then open `http://localhost:8000/docs`. Use the Swagger UI to inspect the implemented schemas and endpoints. Once authentication is implemented, authorize with a token before trying task endpoints.

## Implementation checklist

- Confirm whether the API uses a global prefix or version.
- Agree on user and task field names, ID types, and validation rules.
- Confirm whether login accepts JSON or form-encoded credentials.
- Implement the routes and schemas, then update this document to match the actual OpenAPI schema at `/openapi.json`.
- Test that one user's token cannot read or modify another user's tasks.