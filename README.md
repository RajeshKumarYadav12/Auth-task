# Role-Based Authentication System

A full-stack web application with role-based authentication featuring secure user management and protected routes.

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend

- **Node.js & Express** - Server framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **JWT** - JSON Web Tokens for authentication

## 📋 Features

- ✅ User registration with role selection (User/Admin)
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ Role-based access control
- ✅ Admin dashboard to view all users
- ✅ User dashboard with personal data
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript for type safety

## 📁 Project Structure

```
role-based-auth-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT verification middleware
│   │   ├── models/
│   │   │   └── User.js              # Mongoose schema
│   │   ├── routes/
│   │   │   └── authRoutes.js        # Signup/Login/Me routes
│   │   ├── controllers/
│   │   │   └── authController.js    # Logic for signup/login
│   │   ├── utils/
│   │   │   └── generateToken.js     # JWT generator helper
│   │   └── server.js                # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx            # Home/welcome page
│   │   │   ├── signup.tsx           # Signup page with role select
│   │   │   ├── login.tsx            # Login page
│   │   │   ├── dashboard.tsx        # Protected dashboard
│   │   │   ├── _app.tsx             # App wrapper
│   │   │   └── _document.tsx        # Document wrapper
│   │   ├── components/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Layout.tsx           # Page layout wrapper
│   │   │   └── ProtectedRoute.tsx   # Route guard component
│   │   ├── lib/
│   │   │   └── api.ts               # Axios configuration
│   │   ├── styles/
│   │   │   └── globals.css          # Global styles
│   │   └── utils/
│   │       └── auth.ts              # Auth utility functions
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   copy .env.example .env
   ```

4. **Configure MongoDB Atlas:**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Update `.env` file with your MongoDB URI

5. **Update `.env` file:**

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/role-auth-db?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_change_this
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   copy .env.example .env.local
   ```

4. **Update `.env.local` file:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 🧪 Testing the Application

### 1. Create an Admin User

- Go to `http://localhost:3000/signup`
- Fill in the form:
  - Name: Admin User
  - Email: admin@example.com
  - Password: admin123
  - Role: **Admin**
- Click "Sign up"

### 2. Create a Regular User

- Logout and sign up again with:
  - Name: John Doe
  - Email: john@example.com
  - Password: john123
  - Role: **User**

### 3. Test Login

- Login with either account
- You'll be redirected to the dashboard

### 4. Test Dashboards

- **Admin Dashboard**: Shows all registered users in a table
- **User Dashboard**: Shows only personal information

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | Login user        |

### Protected Endpoints

| Method | Endpoint          | Description      | Access        |
| ------ | ----------------- | ---------------- | ------------- |
| GET    | `/api/auth/me`    | Get current user | Authenticated |
| GET    | `/api/auth/users` | Get all users    | Admin only    |

### Example Requests

**Signup:**

```json
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
```

**Login:**

```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User:**

```json
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_jwt_token>
```

## 🚀 Deployment

### Deploy Backend

#### Option 1: Render

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

#### Option 2: Railway

1. Create account on [Railway](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Deploy Frontend

#### Vercel (Recommended)

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy from frontend directory:

   ```bash
   cd frontend
   vercel
   ```

3. Set environment variables in Vercel dashboard:

   - `NEXT_PUBLIC_API_URL` = Your backend URL

4. Production deployment:
   ```bash
   vercel --prod
   ```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware guards on both frontend and backend
- **Role-Based Access**: Different permissions for Users and Admins
- **Input Validation**: Server-side validation for all inputs
- **CORS Enabled**: Cross-origin resource sharing configured

## 🎨 UI Features

- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS
- Loading states and error handling
- Protected route redirects
- Role-based conditional rendering
- Toast notifications for user actions

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**

- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

**JWT Token Error:**

- Ensure JWT_SECRET is set in .env
- Check token expiry time

### Frontend Issues

**API Connection Failed:**

- Verify backend is running on correct port
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure CORS is enabled in backend

**Build Errors:**

- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear Next.js cache: `rm -rf .next`

## 📚 Additional Enhancements (Optional)

- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] User profile editing
- [ ] CRUD operations for user items
- [ ] Form validation with Zod
- [ ] Rate limiting on API endpoints
- [ ] Logging with Winston/Morgan
- [ ] Unit and integration tests

## 📄 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Author

Created as a full-stack authentication demonstration project.

## 🙏 Acknowledgments

- Next.js Documentation
- MongoDB Atlas
- Tailwind CSS
- Express.js
- JWT.io
