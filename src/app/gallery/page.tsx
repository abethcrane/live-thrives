"use client";

import { Suspense } from 'react';
import { getPhotos } from '@/lib/data';
import PhotoGrid from '@/components/PhotoGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Click on a photo to see camera settings + info about the band
            </p>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <GalleryPageInner />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

function GalleryPageInner() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') || '';
  return <PhotoGridWrapper tag={tag} />;
}

function PhotoGridWrapper({ tag }: { tag: string }) {
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  React.useEffect(() => {
    getPhotos().then(setPhotos).catch(setError);
  }, []);
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load photos</div>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }
  return <PhotoGrid photos={photos} initialTag={tag} />;
} 