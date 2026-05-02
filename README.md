# Team Task Manager

A production-ready full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). This platform provides role-based access control (Admin/Member), project and task management, analytics, and an intuitive, modern UI styled with Tailwind CSS.

## 🌟 Features

- **🔐 Authentication & Authorization:** JWT-based auth with encrypted passwords. Role-Based Access Control (Admin and Member).
- **📁 Project Management:** Admins can create and delete projects and assign members.
- **✅ Task Management:** Kanban-style task board. Admins create/edit tasks; Members update status.
- **⏰ Overdue Detection:** Tasks automatically flagged if deadlines are missed.
- **📊 Interactive Dashboard:** Visual breakdown of tasks using Recharts.
- **🔎 Search & Filter:** Filter tasks by project and search by title.
- **🎨 Premium UI:** Responsive design with modern styling, glassmorphism, and micro-animations.

## 🧱 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Recharts, Axios, React Hot Toast
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB (Mongoose)

## 🚀 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)

### Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in `server/` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm run dev` (runs on http://localhost:5000)

### Frontend Setup
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. The API base URL is configured to `http://localhost:5000/api`. If your backend runs elsewhere, update `src/services/api.js`.
4. Start the development server: `npm run dev` (runs on http://localhost:5173)

## 🌐 Deployment (Railway)

1. **Database:** Provision a MongoDB instance on Railway or use MongoDB Atlas.
2. **Backend:**
   - Push the code to GitHub.
   - In Railway, create a new project and select the repository.
   - Set the Root Directory to `/server`.
   - Add environment variables: `PORT`, `MONGODB_URI`, `JWT_SECRET`.
   - Railway will automatically detect Node.js and run `npm start`. Ensure `package.json` has: `"start": "node index.js"`.
3. **Frontend:**
   - Add another service in the same Railway project from the repository.
   - Set the Root Directory to `/client`.
   - Add environment variable: `VITE_API_URL` pointing to your deployed backend URL.
   - Change `api.js` to use `import.meta.env.VITE_API_URL`.
   - Railway will detect the Vite config and run `npm run build`.

## 📜 API Endpoints

### Auth (`/api/auth`)
- `POST /register`: Register a new user
- `POST /login`: Authenticate and get token
- `GET /profile`: Get user profile
- `GET /users`: Get all users (Admin)

### Projects (`/api/projects`)
- `GET /`: Get all projects (Filtered by user)
- `POST /`: Create project (Admin)
- `GET /:id`: Get specific project
- `PUT /:id`: Update project (Admin)
- `DELETE /:id`: Delete project (Admin)

### Tasks (`/api/tasks`)
- `GET /`: Get all tasks
- `GET /stats/dashboard`: Get user task statistics
- `POST /`: Create task (Admin)
- `PUT /:id`: Update task
- `DELETE /:id`: Delete task (Admin)
