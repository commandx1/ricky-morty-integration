'use client';

import React from 'react';

import { Heart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCharacterStore } from '@/store/character-store';

export function Header() {
  const { selectedCharacters, favorites, clearSelectedCharacters } =
    useCharacterStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-orange-50/95 backdrop-blur supports-[backdrop-filter]:bg-orange-50/80 border-orange-100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">Rick & Morty</h1>
          <span className="text-sm text-muted-foreground">
            Character Explorer
          </span>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Selected Characters */}
          {selectedCharacters.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                {selectedCharacters.length} Selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelectedCharacters}
                className="text-xs"
              >
                Clear
              </Button>
            </div>
          )}

          {/* Favorites Count */}
          <Badge variant="outline" className="gap-1">
            <Heart className="h-3 w-3" />
            {favorites.length} Favorites
          </Badge>
        </div>
      </div>
    </header>
  );
}
