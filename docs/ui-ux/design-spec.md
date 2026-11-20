# Taskly UI/UX Design Specification

## Required screens
1. Login
2. Dashboard
3. Add Task
4. Task List

## Screen flow
Login → Dashboard → Add Task / Task List

## Layout
- Desktop artboards: 1440 × 900
- Sidebar: 240 px
- Responsive centered main content
- White cards with 1 px borders and rounded corners
- Mobile sidebar collapses to a menu

## Login
Taskly branding, email, password, remember me, sign in, and create account.

## Dashboard
Sidebar, greeting, Add Task CTA, task counts, recent tasks, and completion progress.

## Add Task
Task title, description, due date, priority, Cancel and Create Task.

## Task List
Search, All Tasks / Active / Completed, priority filter, task rows, due date, priority, status, edit and delete.

## Current implementation limits

- Authentication currently supports email and password; password reset, Google sign-in, and phone sign-in are not implemented.
- The backend task model supports `pending` and `completed` statuses and does not include projects.
- Dashboard task summaries use the available task data; there is no separate weekly reporting endpoint.

## Figma source
https://www.figma.com/design/XLTOX4GvZjBRrfjk2d9eY6

Frames: 01 — Login, 02 — Dashboard, 03 — Add Task, 04 — Task List.
