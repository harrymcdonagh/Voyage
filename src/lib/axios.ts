import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.DEV_URL, 
});

export default axiosInstance;