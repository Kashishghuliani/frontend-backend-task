import api from './api';

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (payload) => api.put('/user/profile', payload);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
