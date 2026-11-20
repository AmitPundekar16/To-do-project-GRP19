# Manual smoke tests

Run the backend and frontend using the root [README](../README.md). These cases cover the implemented API and UI behavior; record actual results when testing.

| Area | Steps | Expected result |
|---|---|---|
| Registration | Create an account with a name, valid email, and password of 6–72 characters | Account is created and the user is signed in |
| Duplicate registration | Register an email that already exists | Registration fails with a visible error |
| Login | Sign in with valid credentials, then try an incorrect password | Valid login opens the dashboard; invalid login shows an error |
| Session | Refresh the page while signed in; then log out and refresh | A remembered session remains signed in; a logged-out session returns to sign-in |
| Create task | Create a task with title, description, priority, and optional due date | The task appears in the list and remains after refresh |
| Validate task | Submit an empty title or invalid field | The task is not saved and a validation error is visible |
| List and filter | Search tasks, filter by priority and status | Only matching tasks are displayed |
| Update task | Edit a task's fields and save | The updated values persist after refresh |
| Complete task | Toggle a task between `pending` and `completed` | Status and dashboard counts update and persist |
| Delete task | Delete a task | It disappears from the UI and remains deleted after refresh |
| Authorization | Sign in as a second user | Each user sees only their own tasks |
| API unavailable | Stop the backend and attempt an operation | The UI displays an error instead of silently reporting success |

The backend accepts task statuses `pending` and `completed`, and priorities `low`, `medium`, and `high`.
