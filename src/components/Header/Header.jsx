import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleColor = () => {
    const colors = {
      admin: '#6366f1',
      buyer: '#10b981',
      seller: '#f59e0b'
    };
    return colors[user.role] || '#667eea';
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-left">
          <h3>Welcome back, {user.name}!</h3>
          <p>Manage your {user.role} dashboard</p>
        </div>
        <div className="header-right">
          <div className="user-badge" style={{ backgroundColor: getRoleColor() }}>
            <span>{user.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;