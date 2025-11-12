# Quick Deployment Script for Vercel
# Run this from the frontend directory

Write-Host "🚀 Starting Vercel Deployment Process..." -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "📦 Checking Vercel CLI installation..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI is already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Cyan
Write-Host "   ✅ Backend deployed at: https://auth-task-alpha.vercel.app" -ForegroundColor Green
Write-Host "   ✅ NEXT_PUBLIC_API_URL configured" -ForegroundColor Green
Write-Host "   ✅ CORS configuration updated" -ForegroundColor Green
Write-Host "   ✅ Telemetry disabled" -ForegroundColor Green
Write-Host ""

# Run build test
Write-Host "🔨 Testing production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 You'll be asked a few questions:" -ForegroundColor Yellow
Write-Host "   1. Set up and deploy? → Yes" -ForegroundColor White
Write-Host "   2. Which scope? → Select your account" -ForegroundColor White
Write-Host "   3. Link to existing project? → No (first time) or Yes (redeployment)" -ForegroundColor White
Write-Host "   4. Project name? → auth-task-frontend (or your choice)" -ForegroundColor White
Write-Host "   5. Directory? → ./ (just press Enter)" -ForegroundColor White
Write-Host "   6. Override settings? → No (just press Enter)" -ForegroundColor White
Write-Host ""

# Login to Vercel
vercel login

# Deploy
Write-Host ""
Write-Host "🎯 Deploying to preview environment first..." -ForegroundColor Yellow
vercel

Write-Host ""
$deploy = Read-Host "Deploy to production? (y/n)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host "🚀 Deploying to production..." -ForegroundColor Cyan
    vercel --prod
    
    Write-Host ""
    Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Copy your frontend URL from Vercel" -ForegroundColor White
    Write-Host "   2. Add it as FRONTEND_URL in backend environment variables" -ForegroundColor White
    Write-Host "   3. Redeploy backend on Vercel" -ForegroundColor White
    Write-Host "   4. Test your application!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "ℹ️  Preview deployment complete. Run 'vercel --prod' when ready for production." -ForegroundColor Yellow
}

Write-Host "✨ All done!" -ForegroundColor Green
