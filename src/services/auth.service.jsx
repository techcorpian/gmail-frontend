import axios from 'axios';
// const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const API_URL = `http://localhost:5000/auth/`;

const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password }).then(response => {
    if (response.data.accessToken) {
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
