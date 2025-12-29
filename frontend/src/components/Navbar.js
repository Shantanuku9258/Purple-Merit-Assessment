import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Ensure Admin Dashboard link only shows for admin users
  const showAdminLink = user && user.role === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h3>User Management</h3>
        </div>
        <div className="navbar-menu">
          {showAdminLink && (
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="nav-link"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate('/profile')}
            className="nav-link"
          >
            Profile
          </button>
          <div className="user-info">
            <span className="user-name">{user?.fullName}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

