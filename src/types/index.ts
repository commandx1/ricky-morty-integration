// Base types
export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

// Character types
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// API Response types
export interface ApiResponse<T> {
  info: Info;
  results: T[];
}

export type CharactersResponse = ApiResponse<Character>;

// Filter types - Updated to handle null values for clearing filters
export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | null;
  species?: string;
  type?: string;
  gender?: CharacterGender | null;
  page?: number;
}

// Location types
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type LocationsResponse = ApiResponse<Location>;

// Episode types
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type EpisodesResponse = ApiResponse<Episode>;

// Filter options for UI
export const CHARACTER_STATUS_OPTIONS: {
  value: CharacterStatus;
  label: string;
}[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

export const CHARACTER_GENDER_OPTIONS: {
  value: CharacterGender;
  label: string;
}[] = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

// Query parameters type for URL state
export interface QueryParams {
  status?: CharacterStatus | null;
  gender?: CharacterGender | null;
  page?: number;
}

// Error types
export interface ApiError {
  error: string;
}
