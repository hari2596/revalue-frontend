import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      type: 'admin',
      title: 'Admin',
      description: 'Manage platform, users, and all transactions',
      icon: '👨‍💼',
      color: '#6366f1'
    },
    {
      type: 'buyer',
      title: 'Buyer',
      description: 'Browse and purchase scrap materials',
      icon: '🛒',
      color: '#10b981'
    },
    {
      type: 'seller',
      title: 'Seller',
      description: 'List and sell your scrap materials',
      icon: '💼',
      color: '#f59e0b'
    }
  ];

  const handleRoleSelect = (role) => {
    navigate('/login', { state: { role } });
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-content">
        <div className="role-selection-header">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <h1>scravo</h1>
          </div>
          <h2>Welcome to Scravo</h2>
          <p>Select your role to continue</p>
        </div>

        <div className="roles-grid">
          {roles.map((role) => (
            <div
              key={role.type}
              className="role-card"
              onClick={() => handleRoleSelect(role.type)}
              style={{ borderColor: role.color }}
            >
              <div className="role-icon" style={{ backgroundColor: role.color }}>
                {role.icon}
              </div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              <button 
                className="role-btn"
                style={{ backgroundColor: role.color }}
              >
                Continue as {role.title}
              </button>
            </div>
          ))}
        </div>

        <div className="role-selection-footer">
          <p>Secure platform for scrap material trading</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;