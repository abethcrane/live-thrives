'use client';

import { useState, useEffect, useMemo } from 'react';
import { getBands, getPhotosByBand, getPhotos } from '@/lib/data';
import PhotoCard from '@/components/PhotoCard';
import PhotoModal from '@/components/PhotoModal';
import { PhotoWithExif } from '@/types';
import { formatDate } from '@/lib/data';

export default function BandsPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithExif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPhotos, setAllPhotos] = useState<PhotoWithExif[]>([]);
  const [bands, setBands] = useState<Record<string, any>>({});
  const [bandNames, setBandNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sort photos by band name alphabetically
  const sortedPhotos = useMemo(() => {
    return [...allPhotos].sort((a, b) => {
      const bandA = a.band.toLowerCase();
      const bandB = b.band.toLowerCase();
      if (bandA !== bandB) {
        return bandA.localeCompare(bandB);
      }
      // If same band, sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [allPhotos]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [bandsData, photosData] = await Promise.all([
          getBands(),
          getPhotos()
        ]);
        const sortedBandNames = Object.keys(bandsData).sort();
        setBands(bandsData);
        setBandNames(sortedBandNames);
        setAllPhotos(photosData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

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
    
    const currentIndex = sortedPhotos.findIndex(p => p.filename === selectedPhoto.filename);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sortedPhotos.length - 1;
    } else {
      newIndex = currentIndex < sortedPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(sortedPhotos[newIndex]);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Bands
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the artists behind the music and stay updated with their latest news
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading bands...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Bands
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the artists behind the music and stay updated with their latest news
          </p>
        </div>

        <div className="space-y-12">
          {bandNames.map((bandName) => {
            const band = bands[bandName];
            
            return (
              <BandCard 
                key={bandName}
                bandName={bandName}
                band={band}
                allPhotos={allPhotos}
                onPhotoClick={handlePhotoClick}
              />
            );
          })}
        </div>
      </div>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={sortedPhotos}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
}

// Separate component for band cards to handle async photo loading
function BandCard({ 
  bandName, 
  band, 
  allPhotos,
  onPhotoClick 
}: { 
  bandName: string; 
  band: any; 
  allPhotos: PhotoWithExif[];
  onPhotoClick: (photo: PhotoWithExif) => void; 
}) {
  const [bandPhotos, setBandPhotos] = useState<PhotoWithExif[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photos = await getPhotosByBand(bandName);
        setBandPhotos(photos);
      } catch (error) {
        console.error('Error loading photos for band:', bandName, error);
      } finally {
        setIsLoadingPhotos(false);
      }
    };
    loadPhotos();
  }, [bandName]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{bandName}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Band Info */}
          <div className="space-y-4">
            {band.instagram && (
              <div>
                <a 
                  href={`https://instagram.com/${band.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {band.instagram}
                </a>
              </div>
            )}
            
            {band.news && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Latest News</h3>
                <p className="text-sm text-gray-600">{band.news}</p>
              </div>
            )}
            
            {band.nextShow && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Next Show</h3>
                <p className="text-sm text-gray-600">{band.nextShow}</p>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {isLoadingPhotos ? 'Loading...' : `${bandPhotos.length} photo${bandPhotos.length !== 1 ? 's' : ''} in gallery`}
              </p>
            </div>
          </div>

          {/* Photo Previews */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Photos</h3>
            {isLoadingPhotos ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/2] bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : bandPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {bandPhotos.slice(0, 4).map((photo) => (
                  <div 
                    key={photo.filename} 
                    className="group aspect-[3/2] relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onPhotoClick(photo)}
                  >
                    <img
                      src={`/photos/${photo.filename}`}
                      alt={`${photo.band} at ${photo.location}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay with date and location */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-sm font-medium mb-1">{photo.location}</p>
                        <p className="text-xs opacity-90">{formatDate(photo.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {bandPhotos.length > 4 && (
                  <div className="aspect-[3/2] relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-500">
                      +{bandPhotos.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No photos available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 