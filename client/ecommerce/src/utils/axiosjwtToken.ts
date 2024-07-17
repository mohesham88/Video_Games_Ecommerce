import axios from 'axios';
import { cookies } from 'next/headers';

export const getCookie = async (name : string) => {
  // Get the cookie value
  return cookies().get(name)?.value ?? '';
};



// Create an Axios instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your base URL
  withCredentials: true, // Include credentials in requests if needed
});

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
  const accessToken = await getCookie('accessToken');
  config.headers.Cookie = `accessToken=${accessToken}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;