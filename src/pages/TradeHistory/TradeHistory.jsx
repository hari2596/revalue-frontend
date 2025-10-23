import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './TradeHistory.css';

const TradeHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getAll();
      setTransactions(response.data.data);
    } catch (error) {
      setError('Failed to fetch transactions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#f59e0b', label: 'Pending' },
      confirmed: { color: '#3b82f6', label: 'Confirmed' },
      processing: { color: '#8b5cf6', label: 'Processing' },
      shipped: { color: '#06b6d4', label: 'Shipped' },
      delivered: { color: '#10b981', label: 'Delivered' },
      cancelled: { color: '#ef4444', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="trade-history">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="trade-history">
      <div className="page-header">
        <div>
          <h1>Trade History</h1>
          <p>Track your material {user.role === 'seller' ? 'sales' : 'purchases'} and manage orders</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="empty-state">
          <span style={{ fontSize: '64px' }}>🛒</span>
          <h3>No transactions yet</h3>
          <p>Your {user.role === 'seller' ? 'sales' : 'purchase'} history will appear here</p>
        </div>
      ) : (
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>{user.role === 'seller' ? 'Buyer' : 'Seller'}</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <div className="material-info">
                      <div className="material-title">
                        {transaction.listing?.materialTitle || 'N/A'}
                      </div>
                      <div className="material-category">
                        {transaction.listing?.category}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-name">
                        {user.role === 'seller' 
                          ? transaction.buyer?.name 
                          : transaction.seller?.name}
                      </div>
                      <div className="user-email">
                        {user.role === 'seller' 
                          ? transaction.buyer?.email 
                          : transaction.seller?.email}
                      </div>
                    </div>
                  </td>
                  <td>{transaction.quantity} units</td>
                  <td className="price">${transaction.totalPrice.toFixed(2)}</td>
                  <td>{getStatusBadge(transaction.status)}</td>
                  <td>{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradeHistory;