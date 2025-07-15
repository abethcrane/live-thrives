import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import MobileMenu from '@/components/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beth Crane - Live Music Photography Gallery',
  description: 'Capturing moments of joy and connection on stage',
  keywords: 'live music, photography, concert photos, local bands, music venues',
  authors: [{ name: 'Beth Crane' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Beth Crane - Live Music Photography Gallery',
    description: 'Capturing moments of joy and connection on stage',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beth Crane - Live Music Photography Gallery',
    description: 'Capturing moments of joy and connection on stage',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 sm:py-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  <a href="/" className="hover:text-gray-700 transition-colors">
                    Beth Crane: Live Thrives
                  </a>
                </h1>
                <nav className="hidden md:flex space-x-8">
                  <a href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Gallery
                  </a>
                  <a href="/bands" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Bands
                  </a>
                  <a href="/scavenger-hunt" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Scavenger Hunt
                  </a>
                </nav>
                <MobileMenu />
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  © 2025 Beth Crane. All rights reserved.
                </p>
                <p className="text-xs text-gray-500">
                  Capturing moments of joy and connection on stage
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 