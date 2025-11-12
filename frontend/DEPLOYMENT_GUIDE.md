# 🚀 Vercel Deployment Guide

## ✅ Configuration Complete!

Your project is now configured for Vercel deployment with:
- Backend URL: `https://auth-task-alpha.vercel.app`
- Frontend ready for deployment
- CORS properly configured
- Telemetry disabled

---

## 📋 Step-by-Step Deployment Instructions

### **Frontend Deployment (This Project)**

#### 1️⃣ Push Code to GitHub
```bash
# Navigate to frontend directory
cd C:\Users\yraje\OneDrive\Desktop\Assign1\frontend

# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for Vercel deployment"

# Push to GitHub
git remote add origin https://github.com/RajeshKumarYadav12/Auth-task.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Deploy on Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from frontend directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? auth-task-frontend (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://auth-task-alpha.vercel.app/api`
6. Click "Deploy"

---

## 🔧 Backend Environment Variables on Vercel

Make sure these are set on your backend Vercel project:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=5000
```

**To add/update environment variables:**
1. Go to your backend project on Vercel
2. Settings → Environment Variables
3. Add `FRONTEND_URL` with your frontend URL after deployment
4. Redeploy the backend

---

## ✅ Post-Deployment Checklist

### After Frontend Deployment:

1. **Update Backend CORS**
   - Copy your frontend URL from Vercel (e.g., `https://auth-task-frontend.vercel.app`)
   - Add to backend environment variables as `FRONTEND_URL`
   - Redeploy backend

2. **Test the Application**
   - Visit your frontend URL
   - Try to sign up a new user
   - Try to log in
   - Test creating/editing/deleting items
   - Check if admin features work

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for any CORS or API errors
   - Verify API calls are going to the correct backend URL

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:** Make sure `FRONTEND_URL` is set in backend environment variables on Vercel

### Issue: API calls failing
**Solution:** 
- Check if `NEXT_PUBLIC_API_URL` is correctly set to `https://auth-task-alpha.vercel.app/api`
- Verify backend is running at https://auth-task-alpha.vercel.app

### Issue: 500 Internal Server Error
**Solution:** 
- Check backend logs on Vercel dashboard
- Ensure MongoDB connection string is correct
- Verify all environment variables are set

### Issue: Build fails
**Solution:** 
- Run `npm run build` locally first to check for errors
- Fix any TypeScript errors
- Check Node.js version compatibility

---

## 📱 Vercel CLI Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL
```

---

## 🎉 Your Deployment URLs

After deployment, you'll have:
- **Backend**: `https://auth-task-alpha.vercel.app`
- **Frontend**: `https://your-frontend-url.vercel.app` (will be provided after deployment)

---

## 📝 Important Notes

1. ✅ Telemetry is **disabled** in `next.config.js`
2. ✅ CORS is configured to accept all `.vercel.app` domains
3. ✅ Environment variables are properly configured
4. ✅ Production optimizations are enabled
5. ✅ MongoDB connection is ready for serverless

---

## 🔄 Redeployment

To redeploy after making changes:

```bash
# Push changes to GitHub
git add .
git commit -m "Your commit message"
git push

# Vercel will auto-deploy if connected to GitHub
# Or manually deploy with:
vercel --prod
```

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Check Logs**: Go to Vercel Dashboard → Your Project → Deployments → Click on deployment → View Function Logs

---

**Ready to deploy!** 🚀
