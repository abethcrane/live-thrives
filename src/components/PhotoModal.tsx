'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { PhotoWithExif } from '@/types';
import { formatDate, formatExifData } from '@/lib/data';

interface PhotoModalProps {
  photo: PhotoWithExif | null;
  photos: PhotoWithExif[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function PhotoModal({ photo, photos, isOpen, onClose, onNavigate }: PhotoModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
    }
  }, [isOpen, onClose, onNavigate]);

  // Touch gesture handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onNavigate('next');
    } else if (isRightSwipe) {
      onNavigate('prev');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  const currentIndex = photos.findIndex(p => p.filename === photo.filename);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows - hidden on mobile */}
      {hasPrev && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full hidden sm:block"
          aria-label="Previous photo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full hidden sm:block"
          aria-label="Next photo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Photo container with touch gestures */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-2 sm:p-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-4xl max-h-[calc(100vh-200px)]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={`/photos/${photo.filename}`}
                alt={`${photo.band} at ${photo.location}`}
                width={1200}
                height={800}
                className={`w-full h-auto max-h-[calc(100vh-200px)] object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Photo info overlay */}
          <div className="w-full max-w-4xl mx-auto mt-2 sm:mt-4">
            <div className="bg-black/80 rounded-lg p-4 sm:p-6 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Basic info */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">{photo.band}</h2>
                  <p className="text-base sm:text-lg opacity-90 mb-1">{photo.location}</p>
                  <p className="text-sm opacity-75 mb-2">{formatDate(photo.date)}</p>
                  {photo.person && (
                    <p className="text-sm opacity-75 mb-3">Featuring: {photo.person}</p>
                  )}
                  {photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* EXIF data */}
                {photo.exif && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3">Camera Settings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                      {photo.exif.make && photo.exif.model && (
                        <div>
                          <span className="font-medium opacity-75">Camera:</span>
                          <div className="text-xs sm:text-sm">{photo.exif.make} {photo.exif.model}</div>
                        </div>
                      )}
                      {photo.exif.lens && (
                        <div>
                          <span className="font-medium opacity-75">Lens:</span>
                          <div className="text-xs sm:text-sm">{photo.exif.lens}</div>
                        </div>
                      )}
                      {photo.exif.focalLength && (
                        <div>
                          <span className="font-medium opacity-75">Focal Length:</span>
                          <div className="text-xs sm:text-sm">{photo.exif.focalLength}mm</div>
                        </div>
                      )}
                      {photo.exif.aperture && (
                        <div>
                          <span className="font-medium opacity-75">Aperture:</span>
                          <div className="text-xs sm:text-sm">f/{photo.exif.aperture}</div>
                        </div>
                      )}
                      {photo.exif.shutterSpeed && (
                        <div>
                          <span className="font-medium opacity-75">Shutter Speed:</span>
                          <div className="text-xs sm:text-sm">{photo.exif.shutterSpeed}</div>
                        </div>
                      )}
                      {photo.exif.iso && (
                        <div>
                          <span className="font-medium opacity-75">ISO:</span>
                          <div className="text-xs sm:text-sm">{photo.exif.iso}</div>
                        </div>
                      )}
                      {photo.exif.dateTaken && (
                        <div className="col-span-1 sm:col-span-2">
                          <span className="font-medium opacity-75">Date Taken:</span>
                          <div className="text-xs sm:text-sm">{new Date(photo.exif.dateTaken).toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-75 bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} of {photos.length}
      </div>

      {/* Mobile navigation hints */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-xs opacity-50 sm:hidden">
        Swipe to navigate
      </div>
    </div>
  );
} 