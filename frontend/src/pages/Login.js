import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await login(email, password);
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      // Check if it's a network error or backend error
      if (error.response) {
        // Backend returned an error response
        setErrorMessage(error.response.data?.message || 'Login failed');
      } else if (error.request) {
        // Request was made but no response received (network error)
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setErrorMessage(error.message || 'Server error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setErrorMessage('');
    
    // Get admin credentials from Vite environment variables (if available)
    // Fallback to demo credentials
    let adminEmail = 'admin@demo.com';
    let adminPassword = 'Admin@123';
    
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        adminEmail = import.meta.env.VITE_ADMIN_EMAIL || adminEmail;
        adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || adminPassword;
      }
    } catch (e) {
      // import.meta not available (e.g., Create React App), use fallback values
    }

    setLoading(true);
    try {
      const response = await login(adminEmail, adminPassword);
      // Admin login always redirects to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data?.message || 'Admin login failed');
      } else if (error.request) {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setErrorMessage(error.message || 'Server error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            border: '1px solid #b3d9ff', 
            borderRadius: '4px', 
            padding: '12px', 
            marginBottom: '15px',
            fontSize: '13px',
            color: '#0056b3'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', fontSize: '12px', color: '#004085' }}>
              Demo / Assessment Only
            </div>
            <div style={{ lineHeight: '1.6' }}>
              <strong>Demo Admin Credentials:</strong><br />
              Email: admin@demo.com<br />
              Password: Admin@123
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleAdminLogin} 
            disabled={loading}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </div>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
