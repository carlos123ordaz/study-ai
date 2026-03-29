import { api, handleApiError } from './api';
import { FlashcardSet, ApiResponse } from '../types';

export const flashcardService = {
  async estimateCost(): Promise<{ total: number }> {
    try {
      const { data } = await api.get<ApiResponse<{ total: number }>>('/flashcards/estimate');
      return data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async create(documentId: string, cardCount?: number): Promise<FlashcardSet> {
    try {
      const { data } = await api.post<ApiResponse<FlashcardSet>>(
        '/flashcards',
        { documentId, cardCount },
        { timeout: 120000 }
      );
      return data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async list(
    page = 1,
    limit = 20
  ): Promise<{ sets: FlashcardSet[]; total: number; pages: number }> {
    try {
      const { data } = await api.get<ApiResponse<FlashcardSet[]>>('/flashcards', {
        params: { page, limit },
      });
      return {
        sets: data.data!,
        total: data.meta?.pagination?.total ?? 0,
        pages: data.meta?.pagination?.pages ?? 1,
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  async get(id: string): Promise<FlashcardSet> {
    try {
      const { data } = await api.get<ApiResponse<FlashcardSet>>(`/flashcards/${id}`);
      return data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/flashcards/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
