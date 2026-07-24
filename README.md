# DevFlow — Developer Productivity Hub

A full-stack workspace for developers to manage projects, tasks, bugs,
notes, and code snippets in one place — replacing the need for
separate tools like Trello, Notion, and Postman.

🔗 **Live Demo:** [Coming soon](#)

## Status

🚧 Frontend complete — Backend (Node.js + Express + MongoDB) in progress.

---

## Screenshots

| Dashboard | Notes |
|---|---|
| ![Dashboard](![alt text](image.png)) | ![Notes](![alt text](image-1.png)) |

| Analytics | Dark Mode |
|---|---|
| ![Analytics](![alt text](image-2.png)) | ![Dark Mode](![alt text](image-3.png)) |

> Screenshots are stored in the `/screenshots` folder — replace them with your own as the UI evolves.

---

## Features

- **Authentication** — Login, Register, Reset Password (UI complete, mock auth — real JWT auth coming with backend)
- **Dashboard** — Overview of active projects, pending/completed tasks, open bugs, and weekly productivity chart
- **Project Management** — Track name, tech stack, GitHub repo, live demo link, status, deadline, and team members
- **Task Manager** — Kanban board (Todo / In Progress / Review / Completed) with drag-and-drop
- **Bug Tracker** — Severity levels, steps to reproduce, screenshot upload, assigned developer
- **Notes System** — Markdown-supported notes with categories and search
- **Code Snippet Manager** — Syntax-highlighted snippets with copy-to-clipboard and favorites
- **API Collection** — Store endpoints, headers, request/response examples, and auth details
- **GitHub Integration** — Repository, branch, last commit, pull requests, and issues overview
- **Time Tracker** — Start/stop timer with daily logs
- **Calendar** — Month view with deadlines, meetings, releases, and sprint planning events
- **Analytics** — Charts for tasks completed, bugs fixed, coding hours, and activity heatmap
- **Global Search** — Search across all modules with a `Ctrl+K` shortcut
- **Notifications** — Unread badge, mark-as-read, notification panel
- **Settings** — Profile editing, dark/light mode toggle, password change, notification preferences, logout

---

## Tech Stack

**Frontend**
- React + Vite
- React Router
- Framer Motion (animations)
- Recharts (charts)
- react-markdown (notes)
- react-syntax-highlighter (snippets)
- Plain CSS (custom design system with CSS variables for theming)

**Backend** *(in progress)*
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt (authentication)
- Cloudinary (file uploads)

**Deployment**
- Vercel (frontend)
- Render (backend, planned)
- MongoDB Atlas (database, planned)

---

## Getting Started

```bash
git clone https://github.com/Fariss2507/DevFlow.git
cd DevFlow
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
src/
  components/     # Reusable UI components (Navbar, Sidebar, StatCard, GlobalSearch...)
  pages/          # One folder per module (Dashboard, Projects, Tasks, Bugs, Notes...)
  data/           # Dummy/mock data used before backend integration
  context/        # React Context (Auth, Theme)
  routes/         # App routing configuration
  styles/         # Global CSS and theme variables
  App.jsx
  main.jsx
```

---

## Roadmap

- [x] Frontend UI for all 15 modules
- [x] Dark / light theme system
- [x] Responsive design
- [ ] Backend API (Express + MongoDB)
- [ ] Real authentication (JWT)
- [ ] GitHub API integration (live repo/PR/issue data)
- [ ] Cloudinary integration for bug screenshots
- [ ] Deployment (Vercel + Render)

---

## Why DevFlow?

DevFlow is more than a simple To-Do app. It combines project
management, task tracking, bug reporting, documentation, code
snippets, API management, and analytics into a single scalable
platform — built as a practical full-stack portfolio project.

---

## Author

**Fariss** — [GitHub](https://github.com/Fariss2507)
