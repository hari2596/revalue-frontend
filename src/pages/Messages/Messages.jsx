import React from 'react';
import './Messages.css';

const Messages = () => {
  return (
    <div className="messages">
      <div className="page-header">
        <h1>Messages</h1>
        <p>Communicate with buyers and sellers</p>
      </div>

      <div className="coming-soon">
        <span style={{ fontSize: '64px' }}>💬</span>
        <h3>Messages Coming Soon</h3>
        <p>Chat functionality will be available in the next update</p>
      </div>
    </div>
  );
};

export default Messages;