'use client';

import Image from 'next/image';
import { PhotoWithExif } from '@/types';
import { formatDate } from '@/lib/data';

interface PhotoCardProps {
  photo: PhotoWithExif;
  onClick?: () => void;
  showExif?: boolean;
}

export default function PhotoCard({ photo, onClick, showExif = false }: PhotoCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-[3/2] relative">
        <Image
          src={`/photos/${photo.filename}`}
          alt={`${photo.band} at ${photo.location}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{photo.band}</h3>
          <p className="text-sm opacity-90 mb-1">{photo.location}</p>
          <p className="text-xs opacity-75">{formatDate(photo.date)}</p>
          {photo.person && (
            <p className="text-xs opacity-75 mt-1">Featuring: {photo.person}</p>
          )}
          {photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {photo.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* EXIF Data Display */}
          {showExif && photo.exif && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="grid grid-cols-2 gap-2 text-xs opacity-75">
                {photo.exif.make && photo.exif.model && (
                  <div>
                    <span className="font-medium">Camera:</span> {photo.exif.make} {photo.exif.model}
                  </div>
                )}
                {photo.exif.lens && (
                  <div>
                    <span className="font-medium">Lens:</span> {photo.exif.lens}
                  </div>
                )}
                {photo.exif.focalLength && (
                  <div>
                    <span className="font-medium">Focal:</span> {photo.exif.focalLength}mm
                  </div>
                )}
                {photo.exif.aperture && (
                  <div>
                    <span className="font-medium">Aperture:</span> f/{photo.exif.aperture}
                  </div>
                )}
                {photo.exif.shutterSpeed && (
                  <div>
                    <span className="font-medium">Shutter:</span> {photo.exif.shutterSpeed}
                  </div>
                )}
                {photo.exif.iso && (
                  <div>
                    <span className="font-medium">ISO:</span> {photo.exif.iso}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 