// Install: npm install axios
// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
//   headers: { 'Content-Type': 'application/json' },
// });

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem('token');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized request');
//     }
//     if (error.response?.status === 403) {
//       console.error('Forbidden request');
//     }
//     if (error.response?.status >= 500) {
//       console.error('Server error');
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
