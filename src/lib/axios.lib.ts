import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Asegúrate de tener esta variable en tu archivo .env
});

export default axiosInstance;