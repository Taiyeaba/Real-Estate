import axios from 'axios';

export const axiosInstance = axios.create({
  // এখন এটি .env থেকে /api নেবে, অথবা ডিফল্টভাবে /api ব্যবহার করবে
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;