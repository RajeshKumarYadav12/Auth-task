# Quick Deployment Steps

## Option 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Prepare Git Repository
```powershell
# Navigate to your project
cd C:\Users\yraje\OneDrive\Desktop\Assign1

# Initialize git if not done
git init
git add .
git commit -m "Ready for Vercel deployment"
```

### Step 2: Push to GitHub
1. Create new repository at https://github.com/new
2. Run these commands:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Framework**: Other
4. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_key_min_32_chars
   NODE_ENV=production
   ```
5. Click Deploy
6. **Copy the deployed URL** (e.g., `https://your-app-backend.vercel.app`)

### Step 4: Deploy Frontend on Vercel
1. Go to https://vercel.com/new again
2. Import the **same repository**
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Next.js
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-app-backend.vercel.app/api
   ```
   (Use the backend URL from Step 3)
5. Click Deploy

### Step 5: Configure MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Navigate to: Database Access → Network Access
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click Confirm

### Step 6: Test Your Deployment
1. Open your frontend URL
2. Click "Sign Up"
3. Create an account
4. Log in and test features

---

## Option 2: Deploy via Vercel CLI

### Install Vercel CLI
```powershell
npm install -g vercel
```

### Deploy Backend
```powershell
cd C:\Users\yraje\OneDrive\Desktop\Assign1\backend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? role-auth-backend
# - Directory? ./
# - Override settings? No
```

### Add Backend Environment Variables
```powershell
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
```

### Deploy Backend to Production
```powershell
vercel --prod
```

### Deploy Frontend
```powershell
cd C:\Users\yraje\OneDrive\Desktop\Assign1\frontend
vercel

# Add environment variable first
vercel env add NEXT_PUBLIC_API_URL

# Deploy to production
vercel --prod
```

---

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=create_a_long_random_string_minimum_32_characters
NODE_ENV=production
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Verify connection string is correct
- Check environment variables in Vercel dashboard

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings in backend
- Open browser DevTools → Network to see requests

### Build errors
- Run `npm install` in both folders locally first
- Check Node.js version compatibility
- Clear Vercel cache and redeploy

---

## Post-Deployment

### Automatic Deployments
Every push to your GitHub main branch will trigger automatic deployment on Vercel.

### Preview Deployments
Every pull request gets its own preview URL for testing.

### Monitoring
- View logs: Vercel Dashboard → Your Project → Deployments → Logs
- Check analytics: Vercel Dashboard → Your Project → Analytics

---

## Need Help?
- Vercel Support: https://vercel.com/support
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
