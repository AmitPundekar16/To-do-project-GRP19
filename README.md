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
