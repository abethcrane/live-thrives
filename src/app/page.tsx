import { Suspense } from 'react';
import { getPhotos } from '@/lib/data';
import PhotoGrid from '@/components/PhotoGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PhotoGridWrapper />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

async function PhotoGridWrapper() {
  try {
    const photos = await getPhotos();
    return <PhotoGrid photos={photos} />;
  } catch (error) {
    console.error('Error loading photos:', error);
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load photos</div>
        <p className="text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }
} 