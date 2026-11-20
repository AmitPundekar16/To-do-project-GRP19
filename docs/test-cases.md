# To-Do App — QA Test Cases

- **Branch:** `feature/testing-docs`
- **Target Folder:** `docs/`
- **Proposed Stack in API Doc:** FastAPI (`http://localhost:8000`, Swagger UI at `/docs`) and PostgreSQL
- **Proposed Task Statuses:** `INCOMPLETE`, `PARTIALLY_COMPLETED`, `COMPLETED`

---

## 1. User Login & Authentication

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-01 | Register a new account (if registration is available) and log in with valid credentials. | Login succeeds and returns an access token (if implemented per API doc); user accesses the app.[cite: 1] | | Pending |
| TC-02 | Leave login/registration fields empty or enter invalid input and submit. | Input is rejected or validation error is shown without crashing the app.[cite: 1] | | Pending |
| TC-03 | Enter incorrect login credentials and submit. | Login fails without revealing whether email or password was incorrect (if implemented per API doc).[cite: 1] | | Pending |
| TC-04 | Access protected task endpoints/screens without authentication. | Unauthenticated access is blocked (such as `401 Unauthorized` on protected task endpoints per API doc).[cite: 1] | | Pending |

---

## 2. Add Task

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-05 | Fill in valid task fields (such as `title` and `description`) and submit Add Task. | Task is created and appears in the Task List (defaulting to `INCOMPLETE` if status is omitted per API doc).[cite: 1] | | Pending |
| TC-06 | Leave required task title empty (or submit invalid input) and submit Add Task. | Submission is blocked or rejected with validation error; no valid task is created.[cite: 1] | | Pending |
| TC-07 | Enter long text in task fields and submit Add Task. | Long text is handled without breaking the UI or crashing the app.[cite: 1] | | Pending |

---

## 3. View & Filter Tasks

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-08 | Open Dashboard and Task List after adding tasks. | Dashboard counts and Task List show the user's tasks accurately.| | Pending |
| TC-09 | Use filters on the Task List (such as status filters). | Task List updates to match the selected filter.[cite: 1] | | Pending |
| TC-10 | Check task access across different user accounts (if multi-user auth is implemented). | A user only sees and accesses their own tasks (returning `404 Not Found` for another user's task or nonexistent task ID per API doc). | Pending |

---

## 4. Edit Task

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-11 | Edit an existing task's details or status (`INCOMPLETE`, `PARTIALLY_COMPLETED`, `COMPLETED`) and save. | Updated task details or status are saved and reflected in the app. | Pending |
| TC-12 | Clear required task title or enter an invalid status value while editing and save. | Invalid update is rejected and previous valid task data is preserved. | Pending |

---

## 5. Delete Task

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-13 | Delete an existing task. | Task is removed from the Task List and backend/database. | Pending |

---

## 6. Page Refresh & Edge Cases

| Test ID | Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC-14 | Refresh the browser page after logging in or adding, editing, filtering, or deleting tasks. | App reloads cleanly and data/state behaves consistently without errors. | Pending |
| TC-15 | Check browser and terminal logs during testing on `localhost`. | No unhandled errors or broken behavior occur during normal usage; any issues found are logged in `docs/bug-report.md`. | Pending |