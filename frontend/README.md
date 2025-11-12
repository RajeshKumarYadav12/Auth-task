Role-Based Authentication Frontend

Frontend for role-based authentication system built with Next.js, TypeScript, and Tailwind CSS.

Features

- User signup and login pages
- Protected dashboard route
- Role-based UI (Admin/User)
- JWT token authentication
- Responsive design with Tailwind CSS

Setup

1. Install dependencies:

   bash
   npm install

2. Environment Variables:

   Copy `.env.example` to `.env.local`
   Update `NEXT_PUBLIC_API_URL` with your backend URL

3. Run the development server:

   bash
   npm run dev

4. Open your browser:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Pages

`/` - Home page
`/signup` - User registration
`/login` - User login
`/dashboard` - Protected dashboard (requires authentication)

## Build for Production

bash
npm run build
npm start

## Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy
