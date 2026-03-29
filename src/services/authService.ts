import { api, handleApiError } from './api';
import { User, ApiResponse } from '../types';

export const authService = {
  async getMe(): Promise<User> {
    try {
      const { data } = await api.get<ApiResponse<User>>('/auth/me');
      return data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors
    }
  },

  getGoogleLoginUrl(): string {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    return `${apiUrl}/api/auth/google`;
  },
};
