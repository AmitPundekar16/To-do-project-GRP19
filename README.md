# To-Do Project – GRP19

A simple To-Do application that allows users to manage their daily tasks.

## Features

- User registration and login
- Add new tasks
- View individual tasks
- View all tasks
- Update task details
- Delete tasks
- Update task status
- Each user can access only their own tasks

## Technology Stack

| Part | Technology |
|---|---|
| Frontend | React |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| API Testing | Postman / Swagger |
| Version Control | Git and GitHub |

## Project Structure

```text
To-do-project-GRP19/
│
├── frontend/
│
├── backend/
│   └── app/
│       ├── main.py
│       ├── database.py
│       ├── models/
│       │   ├── user.py
│       │   └── task.py
│       ├── schemas/
│       │   ├── user.py
│       │   └── task.py
│       ├── routes/
│       │   ├── auth.py
│       │   └── tasks.py
│       └── services/
│
├── docs/
│   └── API_DOCUMENTATION.md
│
├── .env.example
├── .gitignore
└── README.md
```

*Note: This is the planned structure. Update it if the actual implementation changes.*

## Task Status

| Status | Meaning |
|---|---|
| INCOMPLETE | Task is not completed |
| PARTIALLY_COMPLETED | Task is in progress |
| COMPLETED | Task is finished |

---

# Team Members and Responsibilities

### Member 1 – Frontend Developer

**Branch:** `feature/frontend`

Responsibilities:
- Create registration and login pages.
- Create the main dashboard.
- Display all tasks.
- Create add and edit task forms.
- Add buttons for delete and status updates.
- Connect frontend with backend APIs.

### Member 2 – Backend Coordinator / Team Leader

**Branch:** `integration`

Responsibilities:
- Set up the FastAPI project.
- Maintain the project structure.
- Coordinate backend development.
- Define API endpoints and request/response formats.
- Review and merge pull requests.
- Integrate frontend and backend.
- Test the complete application.

### Member 3 – Task Management Backend

**Branch:** `feature/task-management`

Responsibilities:
- Create the task model and schema.
- Implement add task API.
- Implement view task API.
- Implement view all tasks API.
- Implement update task API.
- Implement delete task API.
- Implement task status update API.

### Member 4 – Authentication and Database

**Branch:** `feature/auth-database`

Responsibilities:
- Configure PostgreSQL connection.
- Create the user model.
- Implement user registration.
- Implement user login.
- Hash user passwords.
- Generate and verify JWT tokens.
- Protect APIs so users can access only their own tasks.

### Member 5 – Testing and Documentation

**Branch:** `feature/testing-docs`

Responsibilities:
- Test registration and login.
- Test all task APIs using Postman.
- Check add, view, update and delete operations.
- Test all three task statuses.
- Check that one user cannot access another user's tasks.
- Report bugs to the team.
- Prepare project documentation and README.

---

# GitHub Collaboration Guide

**Important:** Every member must work on their assigned branch. Do not directly modify the `main` branch.

## Step 1 – Install Git

Download Git from:

https://git-scm.com/downloads

After installation, open the terminal and check:

```bash
git --version
```

## Step 2 – Clone the Repository

Every member must run:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/To-do-project-GRP19.git
```

Move into the project folder:

```bash
cd To-do-project-GRP19
```

Replace `YOUR_GITHUB_USERNAME` with the repository owner's GitHub username.

## Step 3 – Switch to Your Assigned Branch

Each member must use their own branch.

**Frontend Developer:**

```bash
git checkout feature/frontend
```

**Team Leader:**

```bash
git checkout integration
```

**Task Backend Developer:**

```bash
git checkout feature/task-management
```

**Authentication and Database Developer:**

```bash
git checkout feature/auth-database
```

**Testing and Documentation Member:**

```bash
git checkout feature/testing-docs
```

If the branch is not available locally, run:

```bash
git fetch origin
git checkout -b YOUR_BRANCH_NAME origin/YOUR_BRANCH_NAME
```

Replace `YOUR_BRANCH_NAME` with your assigned branch.

## Step 4 – Before Starting Work

Always get the latest changes from your assigned branch:

```bash
git pull origin YOUR_BRANCH_NAME
```

For example:

```bash
git pull origin feature/frontend
```

## Step 5 – After Completing Your Work

Check which files you modified:

```bash
git status
```

Add your changes:

```bash
git add .
```

Commit your changes with a meaningful message:

```bash
git commit -m "Add login page"
```

Push your changes:

```bash
git push origin YOUR_BRANCH_NAME
```

For example:

```bash
git push origin feature/frontend
```

## Step 6 – Create a Pull Request

After pushing your code:

1. Open the GitHub repository.
2. Go to the **Pull Requests** section.
3. Click **New Pull Request**.
4. Select your branch as the source branch.
5. Select `integration` as the target branch.
6. Add a short description of your work.
7. Create the Pull Request.
8. Inform the team leader.

The team leader will review and merge the code into `integration`.

After testing the complete application, the team leader will merge `integration` into `main`.

---

# Important Rules for Everyone

1. Work only on your assigned branch.
2. Never push directly to `main`.
3. Pull the latest changes before starting work.
4. Commit your code regularly.
5. Do not modify another member's files without discussing it.
6. Inform the team before changing shared files such as `main.py` or `database.py`.
7. Never upload passwords, database credentials or `.env` files to GitHub.
8. If you face an error, share the error message with the team instead of making random changes.
9. Test your work before creating a Pull Request.
10. Communicate with the team regularly.

---

# Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your `.env` file with the required database and authentication settings.

Start the backend:

```bash
uvicorn app.main:app --reload
```

Open Swagger API documentation:

http://localhost:8000/docs

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

# Project Goal

To develop a simple, functional and user-friendly To-Do application where users can securely manage their daily tasks.
