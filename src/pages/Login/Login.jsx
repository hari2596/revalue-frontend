import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const selectedRole = location.state?.role || 'buyer';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      // Check if user role matches selected role
      if (result.user.role === selectedRole) {
        navigate('/dashboard');
      } else {
        setError(`This account is registered as ${result.user.role}. Please select the correct role.`);
        // Logout and redirect back
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } else {
      setError(result.message);
    }
  };

  const getRoleInfo = () => {
    const roles = {
      admin: { title: 'Admin', icon: '👨‍💼', color: '#6366f1' },
      buyer: { title: 'Buyer', icon: '🛒', color: '#10b981' },
      seller: { title: 'Seller', icon: '💼', color: '#f59e0b' }
    };
    return roles[selectedRole];
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <h1>scravo</h1>
          </div>
          <div className="role-badge" style={{ backgroundColor: roleInfo.color }}>
            <span>{roleInfo.icon}</span>
            <span>{roleInfo.title} Login</span>
          </div>
        </div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to continue</p>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              style={{ backgroundColor: roleInfo.color }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link 
              to="/register" 
              state={{ role: selectedRole }}
              style={{ color: roleInfo.color }}
            >
              Register as {roleInfo.title}
            </Link>
          </div>

          <div className="back-link">
            <Link to="/">← Back to role selection</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;