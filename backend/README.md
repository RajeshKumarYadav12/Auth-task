Role-Based Authentication Backend

Backend API for role-based authentication system built with Node.js, Express, and MongoDB.

Features

User registration with role selection (User/Admin)
Password hashing with bcrypt
JWT authentication
Protected routes with role-based access
MongoDB database with Mongoose ODM

Setup

1. Install dependencies:
   bash
   npm install

2. Environment Variables:
   Copy `.env.example` to `.env`
   Update the values with your MongoDB URI and JWT secret

3. Run the server:
   bash
   npm run dev

API Endpoints

`POST /api/auth/signup` - Register new user
`POST /api/auth/login` - Login user
`GET /api/auth/me` - Get current user (Protected)
`GET /api/auth/users` - Get all users (Admin only)
