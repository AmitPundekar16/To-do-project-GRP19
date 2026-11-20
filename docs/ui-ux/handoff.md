# UI/UX Handoff

Use the Figma file as the visual source of truth.

Figma: https://www.figma.com/design/XLTOX4GvZjBRrfjk2d9eY6

## Flow
Login → Dashboard → Add Task / Task List

## Frontend handoff
Colors, typography, spacing and semantic states are documented in `style-guide.md`. Shared CSS variables are in `frontend/styles/theme.css`. The React implementation is in `frontend/src/`, and its FastAPI client is in `frontend/src/lib/api.ts`.

The Figma file is the visual reference. Some prototype-only elements (such as social sign-in) are not connected to backend features.
