# To-Do Project – GRP19

A simple To-Do application that allows users to register, log in, and manage their daily tasks.

The main goal is to build a full-stack application using React, FastAPI, and PostgreSQL while learning how frontend and backend development work together.

---

## 1. Project Features

- User registration and login.
- Secure password storage using hashing.
- JWT-based authentication.
- Add new tasks.
- View all tasks.
- View individual tasks.
- Update task details.
- Delete tasks.
- Change task status.
- Each user can access only their own tasks.

### Task Status

| Status | Meaning |
|---|---|
| `INCOMPLETE` | Task has not been completed. |
| `PARTIALLY_COMPLETED` | Task is currently in progress. |
| `COMPLETED` | Task has been completed. |

---

## 2. Technology Stack

| Part | Technology |
|---|---|
| Frontend | React, JavaScript, CSS |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT |
| API Testing | Postman / Swagger |
| Version Control | Git and GitHub |

---

## 3. Project Structure

The following is our planned project structure. Every member should understand the purpose of their assigned files before making changes.

```text
To-do-project-GRP19/
│
├── frontend/                       # React application (Vikas)
│   │
│   ├── public/                     # Static files such as icons and images
│   │
│   ├── src/                        # Main frontend source code
│   │   │
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── TaskCard.jsx        # Displays a single task
│   │   │   └── TaskForm.jsx        # Add/Edit task form
│   │   │
│   │   ├── pages/                  # Different application pages
│   │   │   ├── Login.jsx           # User login page
│   │   │   ├── Register.jsx        # User registration page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── AddTask.jsx         # Add a new task
│   │   │   ├── EditTask.jsx        # Edit an existing task
│   │   │   └── TaskList.jsx        # Displays all tasks
│   │   │
│   │   ├── services/               # Functions for communicating with APIs
│   │   │   └── api.js              # API requests to the backend
│   │   │
│   │   ├── App.jsx                 # Main React component and routing
│   │   ├── main.jsx                # Frontend entry point
│   │   └── index.css               # Global CSS styles
│   │
│   ├── package.json                # Frontend dependencies and scripts
│   └── .env.example                # Example frontend environment variables
│
├── backend/                        # FastAPI application
│   │
│   ├── app/                        # Main backend application package
│   │   │
│   │   ├── main.py                 # Starts FastAPI and registers routers
│   │   │
│   │   ├── database.py             # Database connection and session setup
│   │   │
│   │   ├── models/                 # SQLAlchemy database models
│   │   │   ├── user.py              # Users table structure
│   │   │   └── task.py              # Tasks table structure
│   │   │
│   │   ├── schemas/                # Pydantic request/response validation
│   │   │   ├── user.py              # User input and output formats
│   │   │   └── task.py              # Task input and output formats
│   │   │
│   │   ├── routes/                 # API endpoint implementations
│   │   │   ├── auth.py              # Registration and login APIs
│   │   │   └── tasks.py             # Task management APIs
│   │   │
│   │   ├── services/               # Business logic and helper functions
│   │   │   ├── auth_service.py      # Password hashing and token logic
│   │   │   └── task_service.py      # Task-related operations (if needed)
│   │   │
│   │   └── dependencies.py         # Shared dependencies such as current user
│   │
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Example backend configuration
│
├── docs/                           # Project documentation
│   └── API_DOCUMENTATION.md        # API endpoints and usage instructions
│
├── .gitignore                      # Files Git should not upload
└── README.md                       # Project overview and instructions
```

**Important:** This is the planned structure. Some files may be created later when required. Do not create unnecessary files just because they appear here.

### Which member works in which files?

| File / Folder | Assigned To | Work |
|---|---|---|
| `backend/app/models/` | Amit | Design Users and Tasks database structure |
| `backend/app/main.py` | Amit | Configure FastAPI and register routers |
| `backend/app/schemas/` | Coordinate with Amit | Define API request and response formats |
| `backend/app/routes/tasks.py` | Amit, Arathi | Implement task management APIs |
| `backend/app/routes/auth.py` | Member 5 | Implement registration and login |
| `backend/app/database.py` | Member 5 | Configure PostgreSQL connection |
| `backend/app/services/auth_service.py` | Member 5 | Password hashing and JWT-related logic |
| `backend/app/dependencies.py` | Member 5 | Authentication dependency for protected APIs |
| `frontend/src/pages/` | Vikas | Develop React application pages |
| `frontend/src/components/` | Vikas | Create reusable frontend components |
| `frontend/src/services/api.js` | Arathi | Connect frontend with backend APIs |
| `docs/` | Srysha | Testing notes and API documentation |

**Note:** Amit will define the database structure first. Other backend members should follow the agreed structure instead of independently creating different database designs.

---

## 4. Team Members and Responsibilities

### Amit – Database Design and Backend Setup

**Responsibilities:**

- Design the Users and Tasks database schema.
- Define primary keys and foreign keys.
- Define relationships between Users and Tasks.
- Decide data types, constraints, and default values.
- Set up the FastAPI project structure.
- Configure `main.py`.
- Register API routers.
- Define API endpoints and request/response formats.
- Coordinate backend development.

### Amit and Arathi – Task Management APIs

**Responsibilities:**

- Implement the Add Task API.
- Implement the View All Tasks API.
- Implement the View Individual Task API.
- Implement the Update Task API.
- Implement the Delete Task API.
- Implement the Update Task Status API.
- Validate task information.
- Ensure users can access only their own tasks.

### Member 5 – Authentication and Database

**Responsibilities:**

- Configure PostgreSQL connection.
- Configure SQLAlchemy database sessions.
- Implement user registration.
- Implement user login.
- Store passwords in a securely hashed format.
- Generate and verify JWT tokens.
- Create authentication dependencies.
- Protect APIs from unauthenticated access.

### Vikas – Frontend Development

**Responsibilities:**

- Develop the React application.
- Create Login and Registration pages.
- Create the Dashboard.
- Create the Add Task page/form.
- Create the Edit Task page/form.
- Create the Task List.
- Create reusable frontend components.
- Design a simple and user-friendly interface.

### Arathi – Frontend and Backend Integration

**Responsibilities:**

- Connect React frontend with FastAPI backend.
- Send API requests from the frontend.
- Handle API responses.
- Handle authentication tokens.
- Display backend errors properly.
- Ensure frontend data is correctly exchanged with the backend.

### Srysha – Testing and Documentation

**Responsibilities:**

- Test user registration and login.
- Test task creation.
- Test viewing individual and all tasks.
- Test task updating and deletion.
- Test all three task statuses.
- Verify user-specific access.
- Identify and report bugs.
- Prepare testing documentation.

---

## 5. Database Overview

We will initially use two main tables.

### Users Table

Stores information about registered users.

| Column | Purpose |
|---|---|
| `id` | Unique user ID and primary key |
| `name` | User's name |
| `email` | User's email (unique) |
| `password` | Hashed password |
| `created_at` | Account creation date and time |

### Tasks Table

Stores tasks created by users.

| Column | Purpose |
|---|---|
| `id` | Unique task ID and primary key |
| `title` | Task title |
| `description` | Task details |
| `status` | Task completion status |
| `priority` | Task priority, if included |
| `due_date` | Task deadline, if included |
| `user_id` | Foreign key referencing Users |
| `created_at` | Task creation date and time |
| `updated_at` | Last update date and time |

### Relationship

One user can create multiple tasks.

```text
          USERS
     ┌──────────────┐
     │ id (PK)      │
     │ name         │
     │ email        │
     │ password     │
     └──────┬───────┘
            │
            │ One-to-Many
            │
     ┌──────▼───────┐
     │ TASKS        │
     │ id (PK)      │
     │ title        │
     │ description  │
     │ status       │
     │ user_id (FK) │
     └──────────────┘
```

**Important:** Every task must belong to a user. A user must never be able to view, update, or delete another user's tasks.

---

## 6. API Endpoints

These are the planned API endpoints. Backend developers should follow this contract while implementing their APIs.

### Authentication APIs – Member 5

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Task APIs – Amit and Arathi

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | View all logged-in user's tasks |
| GET | `/api/tasks/{id}` | View a particular task |
| PUT | `/api/tasks/{id}` | Update task details |
| PATCH | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}` | Delete a task |

**Important rules:**

- Task APIs require JWT authentication.
- The logged-in user's ID must be used to identify task ownership.
- Never trust a user ID sent by the frontend to decide task ownership.
- Return appropriate HTTP status codes and error messages.

---

## 7. GitHub Collaboration Guide

We will use Git and GitHub so everyone can work on their assigned tasks without directly changing the main project.

### Branch Structure

| Branch | Assigned Work |
|---|---|
| `main` | Final stable application |
| `integration` | Combined team development |
| `feature/database-api-setup` | Amit – Database design and FastAPI setup |
| `feature/task-management` | Amit and Arathi – Task APIs |
| `feature/auth-database` | Member 5 – Authentication and database |
| `feature/frontend` | Vikas – React frontend |
| `feature/frontend-integration` | Arathi – Frontend/backend integration |
| `feature/testing-docs` | Srysha – Testing and documentation |

Amit will coordinate the integration branch. Since some members have more than one responsibility, coordinate before creating additional branches or changing shared files.

### Step 1 – Install Git

Download Git:

https://git-scm.com/downloads

Check installation:

```bash
git --version
```

### Step 2 – Clone the Repository

Every member should clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/To-do-project-GRP19.git
```

Enter the project folder:

```bash
cd To-do-project-GRP19
```

Replace `YOUR_GITHUB_USERNAME` with the repository owner's GitHub username.

### Step 3 – Create the Integration Branch

Amit should create the integration branch first:

```bash
git switch main
git pull origin main
git switch -c integration
git push -u origin integration
```

### Step 4 – Create Your Feature Branch

First, get the latest remote branches:

```bash
git fetch origin
```

Create your assigned branch from `integration`.

Example for Vikas:

```bash
git switch -c feature/frontend origin/integration
```

Example for Member 5:

```bash
git switch -c feature/auth-database origin/integration
```

Use the branch assigned to your work.

**What does this command do?**

- `git switch -c` creates a new branch and switches to it.
- `origin/integration` uses the remote integration branch as the starting point.
- Your work stays separate from other members' work.

### Step 5 – Save and Push Your Work

Check modified files:

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

Push your branch for the first time:

```bash
git push -u origin YOUR_BRANCH_NAME
```

For example:

```bash
git push -u origin feature/frontend
```

After the first push:

```bash
git push
```

### Step 6 – Create a Pull Request

After pushing your branch:

1. Open the GitHub repository.
2. Go to Pull Requests.
3. Click New Pull Request.
4. Select your feature branch as the source.
5. Select `integration` as the target.
6. Write a short description of your changes.
7. Create the Pull Request.
8. Inform Amit.

Amit will review and merge the changes into `integration`.

After the complete application is tested, the stable code will be merged into `main`.

---

## 7. GitHub Collaboration Guide

We will use Git and GitHub so everyone can work on their assigned tasks independently.

### Branch Structure

We will maintain three types of branches:

| Branch | Purpose |
|---|---|
| `main` | Final stable application |
| `integration` | Combines everyone's work |
| Personal branch | Each member's individual work |

### Branch Naming Convention

Every member must create a branch using their own name.

| Team Member | Branch Name |
|---|---|
| Amit | `amit` |
| Arathi | `arathi` |
| Vikas | `vikas` |
| Member 5 | `member5` |
| Srysha | `srysha` |

**Important:** Use lowercase names without spaces.

If a member has multiple responsibilities, they should complete all their assigned work in the same personal branch.

### Step 1 – Install Git

Download Git:

https://git-scm.com/downloads

Check installation:

```bash
git --version
```

### Step 2 – Clone the Repository

Every member must clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/To-do-project-GRP19.git
```

Enter the project folder:

```bash
cd To-do-project-GRP19
```

Replace `YOUR_GITHUB_USERNAME` with the repository owner's GitHub username.

### Step 3 – Create the Integration Branch

Amit must create and push the integration branch first.

```bash
git switch main
git pull origin main
git switch -c integration
git push -u origin integration
```

Other members should wait until the `integration` branch is available on GitHub.

### Step 4 – Create Your Own Branch

First, get the latest remote branches:

```bash
git fetch origin
```

Now create your personal branch from `origin/integration`.

**Amit:**

```bash
git switch -c amit origin/integration
```

**Arathi:**

```bash
git switch -c arathi origin/integration
```

**Vikas:**

```bash
git switch -c vikas origin/integration
```

**Member 5:**

```bash
git switch -c member5 origin/integration
```

**Srysha:**

```bash
git switch -c srysha origin/integration
```

**What does this command do?**

- `git switch -c` creates a new branch and switches to it.
- The first name is your new personal branch.
- `origin/integration` means your branch starts from the latest remote integration branch.
- Everyone can now work independently.

### Step 5 – Save and Push Your Work

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
git commit -m "Add login functionality"
```

Push your personal branch to GitHub for the first time.

Example for Vikas:

```bash
git push -u origin vikas
```

Example for Arathi:

```bash
git push -u origin arathi
```

For future updates, simply use:

```bash
git add .
git commit -m "Update task functionality"
git push
```

### Step 6 – Create a Pull Request

After pushing your branch:

1. Open the GitHub repository.
2. Go to **Pull Requests**.
3. Click **New Pull Request**.
4. Select your personal branch as the source.
5. Select `integration` as the target.
6. Write a short description of your changes.
7. Create the Pull Request.
8. Inform Amit.

Amit will review the code and merge the Pull Request into `integration`.

After testing the complete application, the stable code will be merged into `main`.

### Branch Workflow

```text
                    main
                      |
                 integration
                      |
          ┌───────────┼───────────┐
          |           |           |
         amit       arathi       vikas
          |           |           |
        member5      srysha       |
          |           |           |
          └───────────┴───────────┘
                      |
                Pull Requests
                      |
                 integration
                      |
                     main
```

---

## 8. Important Rules for Everyone

1. Work only on your personal branch.
2. Never push directly to `main`.
3. Do not push directly to `integration`.
4. Pull the latest changes before starting work.
5. Commit your code regularly.
6. Do not modify another member's assigned files without discussion.
7. Coordinate before modifying shared files such as `main.py` and `database.py`.
8. Never upload passwords, database credentials, or `.env` files to GitHub.
9. Test your code before creating a Pull Request.
10. If you face an error, share the complete error message with the team.
11. Do not change API endpoints or request/response formats without informing the team.
12. Ask questions whenever you are stuck. Everyone is learning.
