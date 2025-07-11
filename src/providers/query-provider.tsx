'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // SSR-friendly defaults
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('404')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { queryClient };
