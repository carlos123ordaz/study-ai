import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token from localStorage
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on login/landing
      if (!window.location.pathname.match(/^\/(login|$)/)) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem('token');
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromAxiosError(error: AxiosError): ApiError {
    const data = error.response?.data as { error?: string; message?: string } | undefined;
    const message = data?.error || data?.message || error.message || 'An error occurred';
    const statusCode = error.response?.status || 500;
    return new ApiError(message, statusCode, data);
  }
}

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    throw ApiError.fromAxiosError(error);
  }
  throw error;
}
