'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1f2937" />
        <link rel="icon" href="/favicon.ico" />
        <title>Beth Crane - Live Music Photography Gallery</title>
        <meta name="description" content="Capturing the energy and passion of live music performances across local venues. Browse our collection of live music photography." />
        <meta name="keywords" content="live music, photography, concert photos, local bands, music venues" />
        <meta name="author" content="Beth Crane" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Beth Crane - Live Music Photography Gallery" />
        <meta property="og:description" content="Capturing the energy and passion of live music performances across local venues." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beth Crane - Live Music Photography Gallery" />
        <meta name="twitter:description" content="Capturing the energy and passion of live music performances across local venues." />
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
                  <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Gallery
                  </a>
                  <a href="/bands" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Bands
                  </a>
                  <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </a>
                </nav>
                {/* Mobile menu button */}
                <button 
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
              
              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 py-4">
                  <nav className="flex flex-col space-y-4">
                    <a 
                      href="/" 
                      className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      Gallery
                    </a>
                    <a 
                      href="/bands" 
                      className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      Bands
                    </a>
                    <a 
                      href="/about" 
                      className="text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      About
                    </a>
                  </nav>
                </div>
              )}
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