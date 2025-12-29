# Backend Startup Script for Windows PowerShell
Write-Host "Starting Backend Server..." -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating .env file from env.example..." -ForegroundColor Yellow
    Copy-Item "backend\env.example" "backend\.env"
    Write-Host "Please edit backend\.env and set your JWT_SECRET!" -ForegroundColor Yellow
}

# Navigate to backend
Set-Location backend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start backend
Write-Host "Starting backend server on http://localhost:5000" -ForegroundColor Green
npm run dev

