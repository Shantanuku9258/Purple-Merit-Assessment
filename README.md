# User Management System

A full-stack mini user management system with authentication, role-based access control, and user lifecycle management.

## Quick Start

### Prerequisites
- MongoDB installed and running
- Node.js (v14+)
- npm

### Setup & Run

#### Option 1: Manual Setup (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
# Create .env file (copy from env.example)
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

#### Option 2: Using PowerShell Scripts (Windows)

**Terminal 1:**
```powershell
.\start-backend.ps1
```

**Terminal 2:**
```powershell
.\start-frontend.ps1
```

### Environment Variables

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-secret-key-here
PORT=5000
```

**Frontend** (optional `frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Project Structure

```
purple-merit-backend-intern-assessment/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & role middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── tests/           # Unit tests
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # Auth context
│       ├── pages/       # Page components
│       └── App.js       # Main app component
└── README.md
```

## Features

- ✅ User authentication (Signup/Login)
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin/User)
- ✅ User profile management
- ✅ Admin dashboard with user management
- ✅ Activate/Deactivate users
- ✅ Password change functionality
- ✅ Protected routes
- ✅ Responsive design

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/change-password` - Change password

### Admin
- `GET /api/admin/users?page=1` - Get paginated users
- `PATCH /api/admin/users/:id/activate` - Activate user
- `PATCH /api/admin/users/:id/deactivate` - Deactivate user

## Testing

```bash
# Backend tests
cd backend
npm test
```

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt for password hashing

**Frontend:**
- React (Create React App)
- React Router
- Axios
- Context API
