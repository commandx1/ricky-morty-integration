'use client';

import React from 'react';

import { Heart, Users, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCharacterStore } from '@/store/character-store';

export function Header() {
  const {
    selectedCharacters,
    favorites,
    clearSelectedCharacters,
    clearFavorites,
  } = useCharacterStore();

  const handleClearAll = () => {
    clearSelectedCharacters();
    clearFavorites();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/60">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-teal-500/10 to-emerald-500/10"></div>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative z-10">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <h1 className="text-lg md:text-2xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            Rick & Morty
          </h1>
          <span className="hidden sm:block text-sm text-slate-300">
            Character Explorer
          </span>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Selected Characters */}
          {selectedCharacters.length > 0 && (
            <div className="inline-flex items-center rounded bg-emerald-500/20 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-emerald-300 border border-emerald-500/30 gap-1 md:gap-1.5">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">
                {selectedCharacters.length} Selected
              </span>
              <span className="sm:hidden">{selectedCharacters.length}</span>
            </div>
          )}

          {/* Clear Button - Show when either selected OR favorites exist */}
          {(selectedCharacters.length > 0 || favorites.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs px-1 md:px-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 border border-emerald-500/30"
            >
              <span className="hidden sm:inline">Clear</span>
              <X className="sm:hidden h-3 w-3" />
            </Button>
          )}

          {/* Favorites Count */}
          <div className="inline-flex items-center rounded bg-emerald-500/20 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-emerald-300 border border-emerald-500/30 gap-1 md:gap-1.5">
            <Heart className="h-3 w-3" />
            <span className="hidden sm:inline">
              {favorites.length} Favorites
            </span>
            <span className="sm:hidden">{favorites.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
