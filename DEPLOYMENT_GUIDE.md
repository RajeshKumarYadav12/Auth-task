# Deployment Guide for Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account with your database set up

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
cd C:\Users\yraje\OneDrive\Desktop\Assign1
git init
git add .
git commit -m "Initial commit - Role-based auth system"
```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "role-based-auth-app")
   - Don't initialize with README (we already have files)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**:
   - Select your GitHub repository
   - Click "Import"

3. **Configure Backend Deployment**:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the backend URL (e.g., `https://your-backend.vercel.app`)

## Step 3: Deploy Frontend to Vercel

1. **Import Same Repository Again**:
   - Click "Add New..." → "Project"
   - Select the same repository

2. **Configure Frontend Deployment**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
   ```
   (Replace with your actual backend URL from Step 2)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app is now live!

## Step 4: Update CORS Settings

After deployment, update your backend CORS to allow your frontend domain:

1. Edit `backend/src/server.js` locally
2. Update the CORS origin to include your Vercel frontend URL
3. Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Vercel will automatically redeploy.

## Important Notes

### Environment Variables
- Backend needs: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`
- Frontend needs: `NEXT_PUBLIC_API_URL`

### MongoDB Atlas
Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) for Vercel's serverless functions, or add Vercel's IP ranges.

### Testing After Deployment
1. Visit your frontend URL
2. Sign up with a new account
3. Log in and test dashboard features
4. Check browser console for any API errors

## Troubleshooting

### Backend Issues
- Check Vercel deployment logs
- Verify environment variables are set correctly
- Test API endpoints directly: `https://your-backend.vercel.app/api/auth/me`

### Frontend Issues
- Check if `NEXT_PUBLIC_API_URL` is set correctly
- Open browser DevTools → Network tab to see API calls
- Verify CORS is configured properly in backend

### Database Connection
- Check MongoDB Atlas network access settings
- Verify connection string includes username and password
- Ensure database name is correct in connection string

## Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments
- **Pull requests** → Preview deployments

Simply push to GitHub and Vercel handles the rest!

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Repeat for both frontend and backend if desired

## Alternative: Deploy as Monorepo

If you want both frontend and backend in one deployment:

1. Keep the root `vercel.json`
2. Deploy the entire repository
3. Set root directory to `/`
4. Configure environment variables for both
5. The backend will be available at `/api/*` routes

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
