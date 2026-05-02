# 🗂️ Team Task Manager

A production-ready full-stack web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Role-based access control, project & task management, and a beautiful modern UI.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth & RBAC** | JWT-based login with Admin / Member roles |
| 📁 **Projects** | Admins create projects and assign team members |
| ✅ **Tasks** | Kanban-style board; members update status |
| ⏰ **Overdue Detection** | Tasks auto-flagged past their deadline |
| 📊 **Dashboard** | Visual analytics powered by Recharts |
| 🔎 **Search & Filter** | Filter tasks by project, search by title |
| 🌙 **Theme Toggle** | Light / dark mode with persistent preference |
| 🎨 **Premium UI** | Glassmorphism, micro-animations, responsive design |

---

## 🧱 Tech Stack

**Frontend:** React 19 (Vite), Tailwind CSS v4, React Router v7, Recharts, Axios, React Hot Toast, Lucide Icons

**Backend:** Node.js, Express v5, Mongoose, JWT, bcrypt, express-validator

**Database:** MongoDB

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Clone the repo
```bash
git clone https://github.com/Sweta170/task-manager.git
cd task-manager
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env   # then fill in your values
npm run dev            # starts on http://localhost:5000
```

**`server/.env` variables:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/teamtask
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev            # starts on http://localhost:5173
```

> The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically — no CORS configuration needed.

### 4. Seed the admin user
```bash
cd server
node seed_admin.js
```
Default admin credentials: `admin@teamtask.com` / `admin123`

---

## 📜 API Reference

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login & receive JWT |
| GET | `/profile` | Auth | Get own profile |
| GET | `/users` | Admin | List all users |

### Projects — `/api/projects`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Auth | Get projects (filtered by role) |
| POST | `/` | Admin | Create project |
| GET | `/:id` | Auth | Get single project |
| PUT | `/:id` | Admin | Update project |
| DELETE | `/:id` | Admin | Delete project |

### Tasks — `/api/tasks`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Auth | Get all tasks |
| GET | `/stats/dashboard` | Auth | Dashboard statistics |
| POST | `/` | Admin | Create task |
| PUT | `/:id` | Auth | Update task |
| DELETE | `/:id` | Admin | Delete task |

---

## 🌐 Deployment (Railway)

### Backend
1. Create a new Railway project → connect your GitHub repo
2. Set **Root Directory** to `/server`
3. Add environment variables: `PORT`, `MONGODB_URI`, `JWT_SECRET`
4. Railway auto-detects Node.js and runs `npm start`

### Frontend
1. Add another service in the same Railway project
2. Set **Root Directory** to `/client`
3. Add env variable: `VITE_API_URL=https://your-backend.railway.app/api`
4. Railway runs `npm run build` and serves the Vite output

---

## 📂 Project Structure

```
task-manager/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Layout, Navbar, Sidebar
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Dashboard, Login, Projects, Tasks
│   │   └── services/       # Axios API client
│   └── .env.example
├── server/                 # Express backend
│   ├── controllers/        # authController, projectController, taskController
│   ├── middleware/         # auth, error, role middleware
│   ├── models/             # User, Project, Task (Mongoose)
│   ├── routes/             # authRoutes, projectRoutes, taskRoutes
│   ├── utils/              # DB connection
│   ├── seed_admin.js       # Admin seeder script
│   └── .env.example
├── .gitignore
├── Procfile                # Railway / Heroku process definition
└── README.md
```

---

## 👩‍💻 Author

**Sweta** — [github.com/Sweta170](https://github.com/Sweta170)
