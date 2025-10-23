import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  const selectedRole = location.state?.role || 'buyer';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: selectedRole
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

    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...registrationData } = formData;
    const result = await register(registrationData);

    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
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
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <h1>scravo</h1>
          </div>
          <div className="role-badge" style={{ backgroundColor: roleInfo.color }}>
            <span>{roleInfo.icon}</span>
            <span>{roleInfo.title} Registration</span>
          </div>
        </div>

        <div className="register-card">
          <h2>Create Account</h2>
          <p>Fill in your details to get started</p>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                rows="3"
              />
            </div>

            <button 
              type="submit" 
              className="register-btn"
              style={{ backgroundColor: roleInfo.color }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account?</p>
            <Link 
              to="/login" 
              state={{ role: selectedRole }}
              style={{ color: roleInfo.color }}
            >
              Login as {roleInfo.title}
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

export default Register;