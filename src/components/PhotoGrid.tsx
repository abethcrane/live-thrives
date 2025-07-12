'use client';

import { useState, useMemo } from 'react';
import { PhotoWithExif } from '@/types';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { getUniqueBands, getUniqueTags } from '@/lib/data';

interface PhotoGridProps {
  photos: PhotoWithExif[];
}

type SortOption = 'date' | 'band';

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedBand, setSelectedBand] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedColorType, setSelectedColorType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithExif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bands = useMemo(() => getUniqueBands(), []);
  const tags = useMemo(() => getUniqueTags(), []);

  const filteredAndSortedPhotos = useMemo(() => {
    // First filter the photos
    const filtered = photos.filter(photo => {
      const matchesBand = !selectedBand || photo.band === selectedBand;
      const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
      const matchesColorType = !selectedColorType || photo.colorType === selectedColorType;
      const matchesSearch = !searchTerm || 
        photo.band.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.person.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBand && matchesTag && matchesColorType && matchesSearch;
    });

    // Then sort the filtered photos
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        // Sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        // Sort by band name (alphabetically)
        return a.band.toLowerCase().localeCompare(b.band.toLowerCase());
      }
    });
  }, [photos, selectedBand, selectedTag, selectedColorType, searchTerm, sortBy]);

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
    
    const currentIndex = filteredAndSortedPhotos.findIndex(p => p.filename === selectedPhoto.filename);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredAndSortedPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredAndSortedPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredAndSortedPhotos[newIndex]);
  };

  const clearFilters = () => {
    setSelectedBand('');
    setSelectedTag('');
    setSelectedColorType('');
    setSearchTerm('');
  };

  return (
    <>
      <div className="space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search bands, locations, people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-500 text-base"
            />
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm"
            >
              <option value="">All Bands</option>
              {bands.map(band => (
                <option key={band} value={band}>{band}</option>
              ))}
            </select>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm"
            >
              <option value="">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={selectedColorType}
              onChange={(e) => setSelectedColorType(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm"
            >
              <option value="">All Photos</option>
              <option value="black and white">Black & White</option>
              <option value="color">Color</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="band">Sort by Band</option>
            </select>
            
            {(selectedBand || selectedTag || selectedColorType || searchTerm) && (
              <button
                onClick={clearFilters}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-gray-900 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 px-2">
          Showing {filteredAndSortedPhotos.length} of {photos.length} photos
        </div>

        {/* Photo Grid */}
        {filteredAndSortedPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredAndSortedPhotos.map((photo) => (
              <PhotoCard
                key={photo.filename}
                photo={photo}
                onClick={() => handlePhotoClick(photo)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg mb-2">No photos found</p>
            <p className="text-sm">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={filteredAndSortedPhotos}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
} 