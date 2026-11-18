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

**Important:** Every member will create their own branch. You do not need to create everyone's feature branches beforehand.

We will follow this workflow:

```text
                 main
                   |
              integration
                   |
       ┌───────────┼────────────┐
       |           |            |
   frontend    task-backend   auth-database
       |           |            |
       └───────────┴────────────┘
                   |
              Pull Requests
                   |
              integration
                   |
                  main
```

## Step 1 – Install Git

Download Git:

https://git-scm.com/downloads

Check installation:

```bash
git --version
```

## Step 2 – Clone the Repository

Every member must clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/To-do-project-GRP19.git
```

Enter the project folder:

```bash
cd To-do-project-GRP19
```

Replace `YOUR_GITHUB_USERNAME` with the repository owner's GitHub username.

## Step 3 – Create Your Own Branch

First, everyone must get the latest branches:

```bash
git fetch origin
```

**Important:** The team leader must create and push the `integration` branch before other members start this step.

### Member 1 – Frontend Developer

```bash
git switch -c feature/frontend origin/integration
```

### Member 2 – Team Leader

Create the integration branch from main:

```bash
git switch main
git pull origin main
git switch -c integration
git push -u origin integration
```

### Member 3 – Task Management Backend

```bash
git switch -c feature/task-management origin/integration
```

### Member 4 – Authentication and Database

```bash
git switch -c feature/auth-database origin/integration
```

### Member 5 – Testing and Documentation

```bash
git switch -c feature/testing-docs origin/integration
```

**What does this command do?**

- `git switch -c` creates a new branch and switches to it.
- `origin/integration` uses the latest remote integration branch as the starting point.
- Every member now has their own independent working branch.

## Step 4 – Before Starting Work

Always get the latest changes from your branch:

```bash
git pull
```

If you need the latest changes from the integration branch, first coordinate with the team leader and then run:

```bash
git fetch origin
git merge origin/integration
```

Resolve any conflicts before continuing.

## Step 5 – Save and Push Your Work

After making changes, check your files:

```bash
git status
```

Add your changes:

```bash
git add .
```

Commit your changes:

```bash
git commit -m "Add login page"
```

Push your branch to GitHub for the first time:

```bash
git push -u origin YOUR_BRANCH_NAME
```

For example:

```bash
git push -u origin feature/frontend
```

After the first push, you can simply use:

```bash
git push
```

## Step 6 – Create a Pull Request

After pushing your branch:

1. Open the GitHub repository.
2. Go to **Pull Requests**.
3. Click **New Pull Request**.
4. Select your feature branch as the source.
5. Select `integration` as the target.
6. Add a short description of your changes.
7. Create the Pull Request.
8. Inform the team leader.

The team leader will review and merge the changes into `integration`.

After testing the complete application, the team leader will merge `integration` into `main`.

---

# Important Rules for Everyone

1. Work only on your assigned branch.
2. Never push directly to `main` or `integration`.
3. Pull the latest changes before starting work.
4. Commit your code regularly.
5. Do not modify another member's files without discussing it.
6. Inform the team before changing shared files such as `main.py` or `database.py`.
7. Never upload passwords, database credentials or `.env` files to GitHub.
8. If you face an error, share the error message with the team.
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

Swagger API documentation:

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
