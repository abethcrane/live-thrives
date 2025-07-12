'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PhotoWithExif } from '@/types';
import { formatDate } from '@/lib/data';

interface PhotoCardProps {
  photo: PhotoWithExif;
  onClick?: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      <div className="aspect-[3/2] relative">
        {!imageError ? (
          <Image
            src={`/photos/${photo.filename}`}
            alt={`${photo.band} at ${photo.location}`}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {/* Overlay with photo info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{photo.band}</h3>
          <p className="text-sm opacity-90 mb-1 line-clamp-1">{photo.location}</p>
          <p className="text-xs opacity-75 mb-2">{formatDate(photo.date)}</p>
          {photo.person && (
            <p className="text-xs opacity-75 mb-2 line-clamp-1">Featuring: {photo.person}</p>
          )}
          {photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {photo.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {photo.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                  +{photo.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile touch indicator */}
      <div className="absolute top-2 right-2 sm:hidden">
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
} 