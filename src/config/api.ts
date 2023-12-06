import { getLocalStorage } from '@/utils/localStorage';
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const API = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getLocalStorage('token');
  const { headers } = config;

  if (token !== null) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

API.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
