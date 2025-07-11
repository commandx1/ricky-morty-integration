import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { QueryProvider } from '@/providers/query-provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
  description: 'Browse and filter Rick and Morty characters with modern UI',
  keywords: ['Rick and Morty', 'Characters', 'API', 'Next.js'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
