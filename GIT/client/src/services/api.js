import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Add token to request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Server responded with an error:', error.response.data);
    throw new Error(error.response.data.message || 'Something went wrong');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
    throw new Error('No response received from the server');
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Request setup error:', error.message);
    throw new Error('Error setting up the request');
  }
};

// Auth-related API calls
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyEmail = async (verificationToken) => {
  try {
    const response = await API.get(`/auth/verify-email/${verificationToken}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const login = async (userData) => {
  try {
    const response = await API.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (emailData) => {
  try {
    const response = await API.post('/auth/forgot-password', emailData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await API.post('/auth/reset-password', resetData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Transaction-related API calls
export const transfer = async (transactionData) => {
  try {
    const response = await API.post('/transactions/transfer', transactionData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// User-related API calls
export const getUserProfile = async () => {
  try {
    const response = await API.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put('/users/update-profile', profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};