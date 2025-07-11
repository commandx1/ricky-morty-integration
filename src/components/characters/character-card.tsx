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

  const getGenderBadgeVariant = (
    gender: string
  ): 'default' | 'secondary' | 'outline' => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'default';
      case 'female':
        return 'secondary';
      case 'genderless':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardContent className="p-0">
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

        {/* Character Info */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold leading-tight">
            {character.name}
          </h3>

          <div className="mb-3 space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Species:</span> {character.species}
            </p>
            {character.type && (
              <p>
                <span className="font-medium">Type:</span> {character.type}
              </p>
            )}
            <p>
              <span className="font-medium">Origin:</span>{' '}
              {character.origin.name}
            </p>
            <p>
              <span className="font-medium">Location:</span>{' '}
              {character.location.name}
            </p>
          </div>

          {/* Gender Badge */}
          <div className="mb-3">
            <Badge variant={getGenderBadgeVariant(character.gender)}>
              {character.gender}
            </Badge>
          </div>

          {/* Episodes Count */}
          <p className="text-xs text-muted-foreground">
            Appears in {character.episode.length} episode
            {character.episode.length !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>

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
