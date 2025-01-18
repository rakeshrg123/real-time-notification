import axios from 'axios';
import  store  from '../store/store'; 

const API_URL = 'https://real-time-notification-backend-ilqa.onrender.com'; 

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
    const state = store.getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    return token;
  }

export const registerUser = (userData) =>{ 
  const token = getToken();
  api.post('authApi/add-user', userData,{ headers: { Authorization: `Bearer ${token}` } });
}
export const loginUser = (credentials) => api.post('authApi/login', credentials);
export const getProfile = () => {
  const token = getToken();
  return api.get('users/profile', { headers: { Authorization: `Bearer ${token}` } });
};
export const getAllUsers = () => {
  const token = getToken();
  
  return api.get('/adminApi/users', { headers: { Authorization: `Bearer ${token}` } });
};
export const getUser = (id) => {
  const token = getToken();
  
  return api.get(`/users/getUser/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
export const deleteUser = (userId) => {
  const token = getToken();
  return api.delete(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
};

export default api;

