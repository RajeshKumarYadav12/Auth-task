# Vercel Deployment Helper Script

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Vercel Deployment Helper" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git initialized!" -ForegroundColor Green
} else {
    Write-Host "Git repository already exists." -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT CHECKLIST" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[ ] 1. Create GitHub repository at https://github.com/new" -ForegroundColor Yellow
Write-Host "[ ] 2. Get MongoDB Atlas connection string" -ForegroundColor Yellow
Write-Host "[ ] 3. Generate JWT secret (min 32 characters)" -ForegroundColor Yellow
Write-Host "[ ] 4. Create Vercel account at https://vercel.com" -ForegroundColor Yellow
Write-Host ""

# Generate JWT secret suggestion
$randomBytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($randomBytes)
$jwtSecret = [Convert]::ToBase64String($randomBytes)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "GENERATED JWT SECRET" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host $jwtSecret -ForegroundColor Green
Write-Host ""
Write-Host "Copy this for your Vercel environment variables!" -ForegroundColor Yellow
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Stage all files:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host ""
Write-Host "2. Commit changes:" -ForegroundColor White
Write-Host "   git commit -m 'Ready for Vercel deployment'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Add GitHub remote (replace with your repo URL):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Push to GitHub:" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Deploy on Vercel:" -ForegroundColor White
Write-Host "   - Go to https://vercel.com/new" -ForegroundColor Gray
Write-Host "   - Import your repository" -ForegroundColor Gray
Write-Host "   - Deploy backend first (root: backend)" -ForegroundColor Gray
Write-Host "   - Then deploy frontend (root: frontend)" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see QUICK_DEPLOY.md" -ForegroundColor Cyan
Write-Host ""

# Ask if user wants to commit now
$commit = Read-Host "Do you want to commit all changes now? (y/n)"
if ($commit -eq "y") {
    Write-Host ""
    Write-Host "Staging files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Committing..." -ForegroundColor Yellow
    git commit -m "Ready for Vercel deployment"
    
    Write-Host ""
    Write-Host "Files committed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now add your GitHub remote and push:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
    Write-Host "git branch -M main" -ForegroundColor Gray
    Write-Host "git push -u origin main" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Done! Good luck with deployment!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
