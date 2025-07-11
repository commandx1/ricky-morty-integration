import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type {
  Character,
  CharacterFilters,
  CharacterGender,
  CharacterStatus,
} from '@/types';

interface CharacterStore {
  // Filter state
  activeFilters: CharacterFilters;

  // UI state
  selectedCharacters: Character[];
  favorites: number[]; // Store character IDs
  isLoading: boolean;

  // Actions
  setFilters: (filters: Partial<CharacterFilters>) => void;
  clearFilters: () => void;
  setStatus: (status: CharacterStatus | null) => void;
  setGender: (gender: CharacterGender | null) => void;
  setPage: (page: number) => void;

  // Character selection actions
  toggleCharacterSelection: (character: Character) => void;
  clearSelectedCharacters: () => void;

  // Favorites actions
  toggleFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;

  // UI actions
  setIsLoading: (loading: boolean) => void;
}

const initialFilters: CharacterFilters = {
  page: 1,
};

export const useCharacterStore = create<CharacterStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      activeFilters: initialFilters,
      selectedCharacters: [],
      favorites: [],
      isLoading: false,

      // Filter actions
      setFilters: filters =>
        set(
          state => ({
            activeFilters: {
              ...state.activeFilters,
              ...filters,
              // Reset page when changing filters (except when explicitly setting page)
              page: filters.page !== undefined ? filters.page : 1,
            },
          }),
          false,
          'setFilters'
        ),

      clearFilters: () =>
        set(
          {
            activeFilters: initialFilters,
          },
          false,
          'clearFilters'
        ),

      setStatus: status =>
        set(
          state => ({
            activeFilters: {
              ...state.activeFilters,
              status,
              page: 1, // Reset page when changing status
            },
          }),
          false,
          'setStatus'
        ),

      setGender: gender =>
        set(
          state => ({
            activeFilters: {
              ...state.activeFilters,
              gender,
              page: 1, // Reset page when changing gender
            },
          }),
          false,
          'setGender'
        ),

      setPage: page =>
        set(
          state => ({
            activeFilters: {
              ...state.activeFilters,
              page,
            },
          }),
          false,
          'setPage'
        ),

      // Character selection actions
      toggleCharacterSelection: character =>
        set(
          state => {
            const isSelected = state.selectedCharacters.some(
              c => c.id === character.id
            );

            if (isSelected) {
              return {
                selectedCharacters: state.selectedCharacters.filter(
                  c => c.id !== character.id
                ),
              };
            } else {
              return {
                selectedCharacters: [...state.selectedCharacters, character],
              };
            }
          },
          false,
          'toggleCharacterSelection'
        ),

      clearSelectedCharacters: () =>
        set(
          {
            selectedCharacters: [],
          },
          false,
          'clearSelectedCharacters'
        ),

      // Favorites actions
      toggleFavorite: characterId =>
        set(
          state => {
            const isFav = state.favorites.includes(characterId);

            if (isFav) {
              return {
                favorites: state.favorites.filter(id => id !== characterId),
              };
            } else {
              return {
                favorites: [...state.favorites, characterId],
              };
            }
          },
          false,
          'toggleFavorite'
        ),

      isFavorite: characterId => {
        const { favorites } = get();
        return favorites.includes(characterId);
      },

      // UI actions
      setIsLoading: loading =>
        set(
          {
            isLoading: loading,
          },
          false,
          'setIsLoading'
        ),
    }),
    {
      name: 'character-store',
    }
  )
);
