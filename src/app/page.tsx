import { Suspense } from 'react';

import { CharacterFilters } from '@/components/filters/character-filters';
import { Header } from '@/components/layout/header';
import { CharacterList } from '@/components/characters/character-list';
import type { CharactersResponse } from '@/types';

// Server-side data fetching function
async function fetchCharactersSSR(searchParams: {
  status?: string;
  gender?: string;
  page?: string;
}): Promise<CharactersResponse | null> {
  try {
    const params = new URLSearchParams();

    if (searchParams.status && searchParams.status !== '') {
      params.append('status', searchParams.status);
    }
    if (searchParams.gender && searchParams.gender !== '') {
      params.append('gender', searchParams.gender);
    }
    if (searchParams.page) {
      params.append('page', searchParams.page);
    }

    const url = `https://rickandmortyapi.com/api/character${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error('Failed to fetch characters:', response.statusText);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
}

interface HomePageProps {
  searchParams: Promise<{
    status?: string;
    gender?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Fetch initial data on server side
  const initialData = await fetchCharactersSSR(resolvedSearchParams);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Sidebar with Filters - Narrower */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<FiltersSkeleton />}>
                <CharacterFilters />
              </Suspense>
            </div>
          </aside>

          {/* Main Content - Wider */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Page Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Characters
                </h2>
                <p className="text-muted-foreground">
                  Discover and explore characters from the Rick and Morty
                  universe. Use filters to find your favorite characters by
                  status and gender.
                </p>
              </div>

              {/* Character List */}
              <Suspense fallback={<CharacterListSkeleton />}>
                <CharacterList
                  initialData={
                    initialData
                      ? {
                          characters: initialData.results,
                          totalPages: initialData.info.pages,
                          currentPage: parseInt(
                            resolvedSearchParams.page || '1'
                          ),
                        }
                      : undefined
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15, TypeScript, and Tailwind CSS
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Data from{' '}
                <a
                  href="https://rickandmortyapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  The Rick and Morty API
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © 2024 Rick & Morty Character Explorer
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Loading Skeletons
function FiltersSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="space-y-4">
        <div className="h-5 w-16 bg-muted rounded animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-9 w-full bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-14 bg-muted rounded animate-pulse" />
          <div className="h-9 w-full bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function CharacterListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square w-full bg-muted rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status;
  const gender = resolvedSearchParams.gender;

  let title = 'Rick & Morty Characters';
  let description = 'Explore characters from the Rick and Morty universe';

  if (status || gender) {
    const filters = [];
    if (status) filters.push(`Status: ${status}`);
    if (gender) filters.push(`Gender: ${gender}`);

    title += ` - ${filters.join(', ')}`;
    description += ` filtered by ${filters.join(' and ')}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}
