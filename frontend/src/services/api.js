import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/auth';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);
