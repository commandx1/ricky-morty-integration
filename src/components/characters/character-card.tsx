'use client';

import React from 'react';

import Image from 'next/image';
import { Heart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCharacterStore } from '@/store/character-store';
import type { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const {
    toggleFavorite,
    isFavorite,
    toggleCharacterSelection,
    selectedCharacters,
  } = useCharacterStore();

  const isSelected = selectedCharacters.some(c => c.id === character.id);
  const isCharacterFavorite = isFavorite(character.id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getGenderBadgeStyle = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'female':
        return 'bg-pink-500/20 text-pink-300 border border-pink-500/30';
      case 'genderless':
        return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-emerald-500/20 shadow-lg shadow-slate-900/50 border-slate-700/50 bg-slate-800/80 backdrop-blur-sm flex flex-col h-full ${
        isSelected ? 'ring-2 ring-emerald-400 shadow-emerald-400/30' : ''
      }`}
    >
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Character Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Status Indicator */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            <div
              className={`h-2 w-2 rounded-full ${getStatusColor(character.status)}`}
            />
            {character.status}
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/70 p-0 text-white hover:bg-black/80"
            onClick={() => toggleFavorite(character.id)}
          >
            <Heart
              className={`h-4 w-4 ${
                isCharacterFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </Button>
        </div>

        {/* Character Info - Flex container for proper spacing */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="mb-2 text-lg font-semibold leading-tight text-white">
            {character.name}
          </h3>

          {/* Character Details - Flex grow to take available space */}
          <div className="flex-1">
            <div className="mb-3 space-y-1 text-sm text-slate-300">
              <p>
                <span className="font-medium text-emerald-400">Species:</span>{' '}
                {character.species}
              </p>
              {character.type && (
                <p>
                  <span className="font-medium text-emerald-400">Type:</span>{' '}
                  {character.type}
                </p>
              )}
              <p>
                <span className="font-medium text-emerald-400">Origin:</span>{' '}
                {character.origin.name}
              </p>
              <p>
                <span className="font-medium text-emerald-400">Location:</span>{' '}
                {character.location.name}
              </p>
            </div>

            {/* Gender Badge */}
            <div className="mb-3">
              <Badge
                variant="outline"
                className={`${getGenderBadgeStyle(character.gender)}`}
              >
                {character.gender}
              </Badge>
            </div>
          </div>

          {/* Episodes Count - Always at bottom of content */}
          <p className="text-xs text-slate-400">
            Appears in {character.episode.length} episode
            {character.episode.length !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>

      {/* Footer - Always at bottom */}
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isSelected ? 'default' : 'outline'}
          className="w-full"
          onClick={() => toggleCharacterSelection(character)}
        >
          {isSelected ? 'Selected' : 'Select Character'}
        </Button>
      </CardFooter>
    </Card>
  );
}
