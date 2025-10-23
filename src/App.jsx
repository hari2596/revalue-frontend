import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';

import RoleSelection from './pages/RoleSelection/RoleSelection';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateListing from './pages/CreateListing/CreateListing';
import MyListings from './pages/MyListings/MyListings';
import TradeHistory from './pages/TradeHistory/TradeHistory';
import Messages from './pages/Messages/Messages';
import Settings from './pages/Settings/Settings';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <RoleSelection />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-listing"
        element={
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <Layout><CreateListing /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-listings"
        element={
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <Layout><MyListings /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trade-history"
        element={
          <ProtectedRoute><Layout><TradeHistory /></Layout></ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;