# User Management System

A full-stack user management system with authentication, role-based access control, and user lifecycle management. This application demonstrates secure authentication, admin privileges, and modern full-stack development practices.

## 🚀 Live Demo

- **Frontend:** [https://purple-merit-assessment-cyan.vercel.app/](https://purple-merit-assessment-cyan.vercel.app/)
- **Backend:** [https://purple-merit-assessment-5rpk.onrender.com](https://purple-merit-assessment-5rpk.onrender.com)
- **API Documentation (Postman):** [View Collection](https://shantanukumar-6838509.postman.co/workspace/f7fccffc-38ff-4e26-8de8-43bfd12873d7/collection/45131844-5e850af0-7997-4f99-a565-7703487c741d?action=share&source=copy-link&creator=45131844)

## 🛠 Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens) for Authentication
- bcrypt for Password Hashing
- Jest & Supertest for Testing

**Frontend:**
- React.js (Create React App)
- React Router v6
- Axios for API Requests
- Context API for State Management
- CSS3 for Styling

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB Atlas Account (or local MongoDB)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Copy content from env.example or see Environment Variables section below

# Run in development mode
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional, see below)

# Start the application
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key_here
PORT=5000

# Optional: Auto-create default admin on startup
ADMIN_NAME=System Admin
ADMIN_EMAIL=admin@demo.com
ADMIN_PASSWORD=Admin@123
```

Create a `.env` file in the `frontend` directory (optional for local dev):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment Instructions

### Backend (Render/Heroku/Vercel)
1. Push code to GitHub.
2. Connect repository to hosting provider (e.g., Render).
3. Set `Root Directory` to `backend`.
4. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`) in the dashboard.
5. Deploy.

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Connect repository to hosting provider (e.g., Vercel).
3. Set `Root Directory` to `frontend`.
4. Set `Build Command` to `npm run build` and `Output Directory` to `build`.
5. Add `REACT_APP_API_URL` environment variable pointing to your deployed backend URL.
6. Deploy.

## 📚 API Documentation

For detailed request/response examples, please refer to the [Postman Collection](https://shantanukumar-6838509.postman.co/workspace/f7fccffc-38ff-4e26-8de8-43bfd12873d7/collection/45131844-5e850af0-7997-4f99-a565-7703487c741d?action=share&source=copy-link&creator=45131844).

### Key Endpoints

#### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current user details

#### User Operations
- `GET /api/user/profile` - View profile
- `PUT /api/user/profile` - Update profile details
- `PUT /api/user/change-password` - Change account password

#### Admin Operations
- `GET /api/admin/users` - List all users (paginated)
- `PATCH /api/admin/users/:id/activate` - Activate a user account
- `PATCH /api/admin/users/:id/deactivate` - Deactivate a user account

## 🧪 Testing

Run backend unit and integration tests:

```bash
cd backend
npm test
```
