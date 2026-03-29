import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { creditService } from '@/services/creditService';
import { useAuthStore } from '@/store/authStore';

/**
 * Single source of truth for the credit balance.
 * Fetches from the API, keeps TanStack Query cache in sync,
 * and propagates changes to the auth store so every component
 * (CreditsBadge, Dashboard, etc.) stays up to date without a reload.
 */
export function useCreditsBalance() {
  const updateCredits = useAuthStore((s) => s.updateCredits);
  const storeCredits = useAuthStore((s) => s.user?.credits ?? 0);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data, isLoading } = useQuery({
    queryKey: ['credits'],
    queryFn: () => creditService.getBalance(),
    staleTime: 30_000,       // consider fresh for 30 s
    enabled: isAuthenticated,
  });

  // Whenever the API returns a new balance, push it to the auth store
  // so every subscriber (CreditsBadge, sidebar, etc.) re-renders instantly.
  useEffect(() => {
    if (data !== undefined) {
      updateCredits(data);
    }
  }, [data, updateCredits]);

  return {
    credits: data ?? storeCredits,
    isLoading,
  };
}
