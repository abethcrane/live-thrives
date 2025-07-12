'use client';

import { useState, useMemo } from 'react';
import { PhotoWithExif } from '@/types';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { getUniqueBands, getUniqueTags } from '@/lib/data';

interface PhotoGridProps {
  photos: PhotoWithExif[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedBand, setSelectedBand] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithExif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bands = useMemo(() => getUniqueBands(), []);
  const tags = useMemo(() => getUniqueTags(), []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesBand = !selectedBand || photo.band === selectedBand;
      const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
      const matchesSearch = !searchTerm || 
        photo.band.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.person.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBand && matchesTag && matchesSearch;
    });
  }, [photos, selectedBand, selectedTag, searchTerm]);

  const handlePhotoClick = (photo: PhotoWithExif) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.filename === selectedPhoto.filename);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search bands, locations, people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="">All Bands</option>
              {bands.map(band => (
                <option key={band} value={band}>{band}</option>
              ))}
            </select>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            
            {(selectedBand || selectedTag || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedBand('');
                  setSelectedTag('');
                  setSearchTerm('');
                }}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-gray-900"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {filteredPhotos.length} of {photos.length} photos
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.filename}
                photo={photo}
                onClick={() => handlePhotoClick(photo)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No photos found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
} 