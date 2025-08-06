import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // 쿠키 인증 등이 필요할 경우
});
