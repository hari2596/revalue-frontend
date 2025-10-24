import axios from 'axios';

// Use environment variable for base URL (include /api)
const BASE_URL = import.meta.env.VITE_API_URL || 'https://reavalue-backend.onrender.com/api';

console.log('API Base URL:', BASE_URL);

// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Listing APIs
export const listingAPI = {
  getAll: (params) => api.get('/listings', { params }),
  getOne: (id) => api.get(`/listings/${id}`),
  getMy: () => api.get('/listings/my-listings'),
  create: (data) => api.post('/listings', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/listings/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/listings/${id}`)
};

// Transaction APIs
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getOne: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  updateStatus: (id, status) => api.put(`/transactions/${id}/status`, { status }),
  cancel: (id) => api.delete(`/transactions/${id}`),
  getSellerStats: () => api.get('/transactions/stats/seller'),
  getBuyerStats: () => api.get('/transactions/stats/buyer')
};

export default api;