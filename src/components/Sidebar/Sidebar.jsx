import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    if (user.role === 'seller') {
      return [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/create-listing', icon: '➕', label: 'Create Listing' },
        { path: '/my-listings', icon: '📦', label: 'My Listings' },
        { path: '/trade-history', icon: '🛒', label: 'Trade History' },
        { path: '/messages', icon: '💬', label: 'Messages' },
      ];
    } else if (user.role === 'buyer') {
      return [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/marketplace', icon: '🛍️', label: 'Marketplace' },
        { path: '/my-orders', icon: '📦', label: 'My Orders' },
        { path: '/messages', icon: '💬', label: 'Messages' },
      ];
    } else if (user.role === 'admin') {
      return [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/all-listings', icon: '📦', label: 'All Listings' },
        { path: '/all-transactions', icon: '🛒', label: 'All Transactions' },
        { path: '/users', icon: '👥', label: 'Users' },
        { path: '/messages', icon: '💬', label: 'Messages' },
      ];
    }
    return [];
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏢</span>
          <h2>scravo</h2>
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {getMenuItems().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;