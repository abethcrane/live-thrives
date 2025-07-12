'use client';

import { useEffect, useCallback } from 'react';
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full"
          aria-label="Next photo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Photo container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full flex flex-col">
          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-4xl max-h-[calc(100vh-200px)]">
              <Image
                src={`/photos/${photo.filename}`}
                alt={`${photo.band} at ${photo.location}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[calc(100vh-200px)] object-contain"
                priority
              />
            </div>
          </div>

          {/* Photo info overlay */}
          <div className="w-full max-w-4xl mx-auto mt-4">
            <div className="bg-black/80 rounded-lg p-6 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic info */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{photo.band}</h2>
                  <p className="text-lg opacity-90 mb-1">{photo.location}</p>
                  <p className="text-sm opacity-75 mb-2">{formatDate(photo.date)}</p>
                  {photo.person && (
                    <p className="text-sm opacity-75 mb-3">Featuring: {photo.person}</p>
                  )}
                  {photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm"
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
                    <h3 className="text-lg font-semibold mb-3">Camera Settings</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {photo.exif.make && photo.exif.model && (
                        <div>
                          <span className="font-medium opacity-75">Camera:</span>
                          <div>{photo.exif.make} {photo.exif.model}</div>
                        </div>
                      )}
                      {photo.exif.lens && (
                        <div>
                          <span className="font-medium opacity-75">Lens:</span>
                          <div>{photo.exif.lens}</div>
                        </div>
                      )}
                      {photo.exif.focalLength && (
                        <div>
                          <span className="font-medium opacity-75">Focal Length:</span>
                          <div>{photo.exif.focalLength}mm</div>
                        </div>
                      )}
                      {photo.exif.aperture && (
                        <div>
                          <span className="font-medium opacity-75">Aperture:</span>
                          <div>f/{photo.exif.aperture}</div>
                        </div>
                      )}
                      {photo.exif.shutterSpeed && (
                        <div>
                          <span className="font-medium opacity-75">Shutter Speed:</span>
                          <div>{photo.exif.shutterSpeed}</div>
                        </div>
                      )}
                      {photo.exif.iso && (
                        <div>
                          <span className="font-medium opacity-75">ISO:</span>
                          <div>{photo.exif.iso}</div>
                        </div>
                      )}
                      {photo.exif.dateTaken && (
                        <div className="col-span-2">
                          <span className="font-medium opacity-75">Date Taken:</span>
                          <div>{new Date(photo.exif.dateTaken).toLocaleString()}</div>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-75">
        {currentIndex + 1} of {photos.length}
      </div>
    </div>
  );
} 