Role-Based Task Manager App (Next.js + Node.js + MongoDB)

A fully responsive Full-Stack Web Application with Role-Based Authentication (Admin/User) and complete CRUD, Search, Filtering, Pagination, and Validation features.



🧩 Tech Stack

Frontend: Next.js • TypeScript • Tailwind CSS • Zod
Backend: Node.js • Express.js • MongoDB Atlas (Mongoose)
Auth: JWT • bcrypt
Deployment: Vercel (Frontend) • Render/Railway (Backend)



✨ Features
🔐 Authentication

Role-based signup/login (Admin or User)

Secure password hashing (bcrypt)

JWT authentication

Protected routes & auto-logout



Dashboards

Admin Dashboard:
View all users, manage all items, see ownership info

User Dashboard:
Manage personal items only

Personalized greeting: Welcome, [Name] (Role)


📝 CRUD Operations

Create, Read, Update, Delete items

Beautiful modal forms with client/server validation

Confirmation dialogs for delete actions


🔍 Search & Pagination

Real-time search across item titles and descriptions

Pagination (9 items per page) with counters and navigation


🧮 Filtering

Filter by Category (Work, Personal, Shopping, Health, Other)

Filter by Status (Active, Pending, Completed)

Filter by Priority (Low, Medium, High)

Reset filters button


🧠 Form Validation (Zod)

Client-side + server-side validation

Error handling with clear messages


🧑‍💻 Role-Based Access

Admin: Manage all users/items

User: Access only personal items

Different UI and statistics for both roles


📊 Real-Time Statistics

Total, Active, Pending, and Completed counts

Auto updates on CRUD actions



💅 UI/UX

Fully responsive (mobile → desktop)

Gradient color-coded cards

Smooth animations

Modern, clean design



⚙️ Environment Variables

Backend (/backend/.env)

PORT=5000

MONGODB_URI=mongodb+srv://<your-connection-string>

JWT_SECRET=hiuyuyugyg7t7666gugu557ft

JWT_EXPIRE=7d

NODE_ENV=development

Frontend (/frontend/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api


🚀 How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/<your-username>/role-based-task-manager.git
cd role-based-task-manager



2️⃣ Run Backend

cd backend

npm install

npm run dev


Server runs at http://localhost:5000



3️⃣ Run Frontend

cd frontend

npm install

npm run dev


Frontend runs at http://localhost:3000



🧪 Testing Features

Visit http://localhost:3000/signup
 → Create User/Admin

Login and view the dashboard

Create new items via modal

Test:

Search

Filters

Pagination

Login as Admin to view all users/items

Logout from header menu



🌍 Deployment Links

Frontend (Vercel): https://your-frontend.vercel.app

Backend (Render/Railway): https://your-backend.onrender.com



🧑‍💼 Author

Rajesh Kumar Yadav
CSE @ IIIT Manipur | Full-Stack Developer | AI & ML Enthusiast
