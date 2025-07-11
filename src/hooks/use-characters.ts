import { useQuery } from '@tanstack/react-query';

import type { CharacterFilters, CharactersResponse, ApiError } from '@/types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

async function fetchCharacters(
  filters: CharacterFilters = {}
): Promise<CharactersResponse> {
  const params = new URLSearchParams();

  // Add filters to URL params, skip null/undefined values
  if (filters.status && filters.status !== null)
    params.append('status', filters.status);
  if (filters.gender && filters.gender !== null)
    params.append('gender', filters.gender);
  if (filters.name) params.append('name', filters.name);
  if (filters.species) params.append('species', filters.species);
  if (filters.type) params.append('type', filters.type);
  if (filters.page) params.append('page', filters.page.toString());

  const url = `${API_BASE_URL}/character${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ApiError = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }));
    throw new Error(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

interface UseCharactersOptions extends CharacterFilters {
  enabled?: boolean;
}

export function useCharacters(options: UseCharactersOptions = {}) {
  const { enabled = true, ...filters } = options;

  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => fetchCharacters(filters),
    enabled,
    // SSR-friendly options
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  });
}

// Hook for single character (might be useful later)
async function fetchCharacter(
  id: number
): Promise<import('@/types').Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ApiError = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }));
    throw new Error(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export function useCharacter(id: number, enabled = true) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}
