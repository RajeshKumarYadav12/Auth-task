# 🚀 Vercel Deployment Configuration

This project is configured and ready for deployment on Vercel!

## 📋 What's Included

### Configuration Files
- ✅ `vercel.json` - Root deployment config
- ✅ `backend/vercel.json` - Backend serverless configuration
- ✅ Frontend configured for Next.js deployment
- ✅ CORS setup for production
- ✅ Environment variable templates
- ✅ `.gitignore` configured

### Documentation
- 📖 `QUICK_DEPLOY.md` - Step-by-step deployment guide
- 📖 `DEPLOYMENT_GUIDE.md` - Comprehensive deployment documentation
- 🔧 `prepare-deploy.ps1` - PowerShell helper script

## 🎯 Quick Start

### 1️⃣ Run Preparation Script
```powershell
.\prepare-deploy.ps1
```
This will:
- Initialize Git
- Generate a secure JWT secret
- Show deployment checklist
- Optionally commit your files

### 2️⃣ Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy Backend on Vercel
1. Visit https://vercel.com/new
2. Import your repository
3. Set **Root Directory** to `backend`
4. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - The generated secret from preparation script
   - `NODE_ENV` - Set to `production`
5. Deploy and **copy the backend URL**

### 4️⃣ Deploy Frontend on Vercel
1. Visit https://vercel.com/new again
2. Import the same repository
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` - Your backend URL + `/api`
   - Example: `https://your-backend.vercel.app/api`
5. Deploy

### 5️⃣ Configure MongoDB Atlas
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Allow access from anywhere: `0.0.0.0/0`
4. Save

## ✅ Deployment Checklist

- [ ] MongoDB Atlas database created
- [ ] MongoDB connection string ready
- [ ] JWT secret generated (use preparation script)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable set (NEXT_PUBLIC_API_URL)
- [ ] MongoDB Atlas allows Vercel IP addresses
- [ ] Tested signup and login on production

## 🔐 Environment Variables

### Backend (Vercel Dashboard)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_generated_secret_from_script
NODE_ENV=production
```

### Frontend (Vercel Dashboard)
```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## 🧪 Testing After Deployment

1. **Test Backend API**
   ```
   https://your-backend.vercel.app/
   ```
   Should return: `{"message": "Role-Based Auth API is running"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try signing up
   - Log in
   - Create items in dashboard
   - Test admin features

3. **Check Browser Console**
   - Open DevTools → Console
   - Look for any errors
   - Check Network tab for API calls

## 🐛 Troubleshooting

### Backend Issues
- **Cannot connect to MongoDB**: Check MongoDB Atlas network access
- **JWT errors**: Verify JWT_SECRET is set in Vercel
- **CORS errors**: Check CORS configuration in server.js

### Frontend Issues
- **Cannot reach API**: Verify NEXT_PUBLIC_API_URL is correct
- **Build errors**: Check package.json dependencies
- **Hydration errors**: Already fixed in code

### Common Solutions
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test API endpoints directly with Postman/curl
4. Clear Vercel cache and redeploy

## 📊 Monitoring

### Vercel Dashboard
- **Deployments**: View all deployments and their status
- **Logs**: Real-time and historical logs
- **Analytics**: Traffic and performance metrics
- **Environment Variables**: Manage all secrets

### MongoDB Atlas
- **Metrics**: Database performance
- **Network Access**: Allowed IP addresses
- **Database Access**: User permissions

## 🔄 Continuous Deployment

Once connected to GitHub:
- ✅ Push to `main` → Automatic production deployment
- ✅ Push to other branches → Preview deployments
- ✅ Pull requests → Automatic preview URLs

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)

## 🆘 Need Help?

1. Check `QUICK_DEPLOY.md` for step-by-step guide
2. Read `DEPLOYMENT_GUIDE.md` for detailed documentation
3. Visit Vercel support: https://vercel.com/support
4. Check MongoDB Atlas docs: https://www.mongodb.com/docs/atlas/

---

**Ready to deploy?** Run `.\prepare-deploy.ps1` to get started! 🚀
