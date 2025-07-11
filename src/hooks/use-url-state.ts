import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import type { CharacterGender, CharacterStatus } from '@/types';

// Define parsers for URL parameters
const searchParamsCache = {
  status: parseAsString.withDefault('').withOptions({ shallow: false }), // SSR trigger on change
  gender: parseAsString.withDefault('').withOptions({ shallow: false }), // SSR trigger on change
  page: parseAsInteger.withDefault(1).withOptions({ shallow: false }), // SSR trigger on change
};

export function useUrlState() {
  const [params, setParams] = useQueryStates(searchParamsCache);

  // Convert empty strings to null for better type safety
  const normalizedParams = {
    status: params.status || null,
    gender: params.gender || null,
    page: params.page,
  };

  // Type-safe setters
  const setStatus = (status: CharacterStatus | null) => {
    setParams({ status: status || '', page: 1 });
  };

  const setGender = (gender: CharacterGender | null) => {
    setParams({ gender: gender || '', page: 1 });
  };

  const setPage = (page: number) => {
    setParams({ page });
  };

  const clearFilters = () => {
    setParams({ status: '', gender: '', page: 1 });
  };

  const setMultipleFilters = (filters: {
    status?: CharacterStatus | null;
    gender?: CharacterGender | null;
    page?: number;
  }) => {
    setParams({
      status: filters.status !== undefined ? filters.status || '' : undefined,
      gender: filters.gender !== undefined ? filters.gender || '' : undefined,
      page: filters.page !== undefined ? filters.page : undefined,
    });
  };

  return {
    // Current state
    status: normalizedParams.status as CharacterStatus | null,
    gender: normalizedParams.gender as CharacterGender | null,
    page: normalizedParams.page,

    // Setters
    setStatus,
    setGender,
    setPage,
    clearFilters,
    setMultipleFilters,

    // Raw params for debugging
    rawParams: params,
  };
}
