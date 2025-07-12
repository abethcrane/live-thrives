import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Live Thrives - Live Music Photography Gallery',
  description: 'Capturing the energy and passion of live music performances across local venues. Browse our collection of live music photography.',
  keywords: 'live music, photography, concert photos, local bands, music venues',
  authors: [{ name: 'Beth Crane' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    title: 'Live Thrives - Live Music Photography Gallery',
    description: 'Capturing the energy and passion of live music performances across local venues.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Thrives - Live Music Photography Gallery',
    description: 'Capturing the energy and passion of live music performances across local venues.',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 sm:py-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Live Thrives
                </h1>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Gallery
                  </a>
                  <a href="/bands" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Bands
                  </a>
                </nav>
                {/* Mobile menu button - placeholder for future mobile menu */}
                <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
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
                  Capturing live music moments across local venues
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 