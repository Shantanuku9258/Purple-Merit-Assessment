# Frontend Startup Script for Windows PowerShell
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan

# Navigate to frontend
Set-Location frontend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start frontend
Write-Host "Starting frontend server on http://localhost:3000" -ForegroundColor Green
npm start

