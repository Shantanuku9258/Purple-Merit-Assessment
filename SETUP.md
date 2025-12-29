# Setup and Run Instructions

## Prerequisites
1. **MongoDB** must be installed and running on your system
2. **Node.js** (v14 or higher) installed
3. **npm** installed

## Step-by-Step Setup

### 1. Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
# Windows PowerShell:
Copy-Item env.example .env

# Or manually create .env file with:
# MONGODB_URI=mongodb://localhost:27017/user-management
# JWT_SECRET=your-secret-key-here-change-this-in-production
# PORT=5000
```

### 2. Setup Frontend

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install
```

### 3. Run the Project

You need **TWO terminal windows** - one for backend, one for frontend.

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

#### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```
Frontend will run on: http://localhost:3000

## Quick Start (All Commands)

### Windows PowerShell:
```powershell
# Terminal 1 - Backend
cd backend
npm install
# Create .env file manually or copy env.example
npm run dev

# Terminal 2 - Frontend (open new terminal)
cd frontend
npm install
npm start
```

### Linux/Mac:
```bash
# Terminal 1 - Backend
cd backend
npm install
cp env.example .env
npm run dev

# Terminal 2 - Frontend (open new terminal)
cd frontend
npm install
npm start
```

## Verify Setup

1. **Backend Health Check**: http://localhost:5000/api/health
2. **Frontend**: http://localhost:3000 (auto-opens in browser)

## Environment Variables

### Backend (.env file):
```
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-secret-key-here-change-this-in-production
PORT=5000
```

### Frontend (optional .env file):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

1. **MongoDB not running**: Start MongoDB service
2. **Port 5000 in use**: Change PORT in backend/.env
3. **Port 3000 in use**: React will ask to use another port
4. **CORS errors**: Make sure backend is running on port 5000

