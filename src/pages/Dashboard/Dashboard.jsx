import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { listingAPI, transactionAPI } from '../../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user.role]);

  const fetchDashboardData = async () => {
    try {
      if (user.role === 'seller') {
        const [listingsRes, statsRes] = await Promise.all([
          listingAPI.getMy(),
          transactionAPI.getSellerStats()
        ]);
        
        const activeListings = listingsRes.data.data.filter(l => l.status === 'active').length;
        const totalListings = listingsRes.data.data.length;
        
        setStats({
          activeListings,
          totalListings,
          ...statsRes.data.data
        });
      } else if (user.role === 'buyer') {
        const statsRes = await transactionAPI.getBuyerStats();
        setStats(statsRes.data.data);
      } else if (user.role === 'admin') {
        // Admin stats would come from a different endpoint
        const [listingsRes, transactionsRes] = await Promise.all([
          listingAPI.getAll(),
          transactionAPI.getAll()
        ]);
        
        setStats({
          totalListings: listingsRes.data.count,
          totalTransactions: transactionsRes.data.count,
          activeListings: listingsRes.data.data.filter(l => l.status === 'active').length,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSellerStats = () => [
    { icon: '📦', label: 'Active Listings', value: stats?.activeListings || 0, color: '#3b82f6' },
    { icon: '🛒', label: 'Total Sales', value: stats?.totalSales || 0, color: '#10b981' },
    { icon: '📈', label: 'Revenue', value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, color: '#f59e0b' },
    { icon: '⏳', label: 'Pending Orders', value: stats?.pendingOrders || 0, color: '#8b5cf6' }
  ];

  const getBuyerStats = () => [
    { icon: '🛒', label: 'Active Orders', value: stats?.activeOrders || 0, color: '#3b82f6' },
    { icon: '✅', label: 'Completed Orders', value: stats?.completedOrders || 0, color: '#10b981' },
    { icon: '💰', label: 'Total Spent', value: `$${stats?.totalSpent?.toFixed(2) || '0.00'}`, color: '#f59e0b' },
    { icon: '📦', label: 'Total Orders', value: stats?.totalOrders || 0, color: '#8b5cf6' }
  ];

  const getAdminStats = () => [
    { icon: '📦', label: 'Total Listings', value: stats?.totalListings || 0, color: '#3b82f6' },
    { icon: '✅', label: 'Active Listings', value: stats?.activeListings || 0, color: '#10b981' },
    { icon: '🛒', label: 'Total Transactions', value: stats?.totalTransactions || 0, color: '#f59e0b' },
    { icon: '👥', label: 'Platform Users', value: '156', color: '#8b5cf6' }
  ];

  const getStatsForRole = () => {
    if (user.role === 'seller') return getSellerStats();
    if (user.role === 'buyer') return getBuyerStats();
    if (user.role === 'admin') return getAdminStats();
    return [];
  };

  const getDashboardTitle = () => {
    if (user.role === 'seller') return 'Seller Dashboard';
    if (user.role === 'buyer') return 'Buyer Dashboard';
    if (user.role === 'admin') return 'Admin Dashboard';
    return 'Dashboard';
  };

  const getDashboardSubtitle = () => {
    if (user.role === 'seller') return 'Manage your material listings and track sales';
    if (user.role === 'buyer') return 'Track your orders and manage purchases';
    if (user.role === 'admin') return 'Monitor platform activity and manage users';
    return 'Overview of your account';
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{getDashboardTitle()}</h1>
        <p>{getDashboardSubtitle()}</p>
      </div>

      <div className="stats-grid">
        {getStatsForRole().map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              <span style={{ fontSize: '32px' }}>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>🎉 Welcome to Scravo!</h3>
          <p>Start managing your {user.role === 'seller' ? 'listings' : user.role === 'buyer' ? 'orders' : 'platform'} efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;