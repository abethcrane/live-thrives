'use client';

import { useState, useEffect, useMemo } from 'react';
import { getBands, getPhotosByBand, getPhotos } from '@/lib/data';
import PhotoCard from '@/components/PhotoCard';
import PhotoModal from '@/components/PhotoModal';
import { PhotoWithExif } from '@/types';
import { formatDate } from '@/lib/data';

// Color palette for band cards
const bandColors = [
  { bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-teal-500 to-blue-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-yellow-500 to-orange-500', text: 'text-gray-900', accent: 'bg-black/20' },
  { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-violet-500 to-purple-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-cyan-500 to-blue-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-rose-500 to-pink-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-lime-500 to-green-600', text: 'text-gray-900', accent: 'bg-black/20' },
  { bg: 'bg-gradient-to-br from-sky-500 to-blue-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-fuchsia-500 to-purple-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-amber-500 to-orange-600', text: 'text-gray-900', accent: 'bg-black/20' },
  { bg: 'bg-gradient-to-br from-slate-600 to-gray-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-stone-600 to-neutral-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-zinc-600 to-gray-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-red-600 to-rose-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-blue-600 to-indigo-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-green-600 to-emerald-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-pink-600 to-rose-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-indigo-600 to-purple-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-blue-500 to-cyan-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-green-500 to-emerald-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-orange-500 to-red-500', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-teal-600 to-cyan-600', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-emerald-600 to-teal-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-cyan-600 to-blue-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-violet-600 to-purple-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-rose-600 to-pink-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-lime-600 to-green-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-sky-600 to-blue-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-fuchsia-600 to-purple-700', text: 'text-white', accent: 'bg-white/20' },
  { bg: 'bg-gradient-to-br from-amber-600 to-orange-700', text: 'text-white', accent: 'bg-white/20' },
];

// Function to get consistent color for a band name
function getBandColor(bandName: string) {
  const hash = bandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return bandColors[hash % bandColors.length];
}

export default function BandsPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithExif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPhotos, setAllPhotos] = useState<PhotoWithExif[]>([]);
  const [bands, setBands] = useState<Record<string, any>>({});
  const [bandNames, setBandNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // All photos sorted for modal navigation
  const sortedPhotos = useMemo(() => {
    return [...allPhotos].sort((a, b) => {
      const bandA = a.band.toLowerCase();
      const bandB = b.band.toLowerCase();
      if (bandA !== bandB) {
        return bandA.localeCompare(bandB);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [allPhotos]);

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
            Discover the artists behind the music
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
      <div className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Bands
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the artists behind the music
          </p>
        </div>

        {/* Responsive grid of band cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bandNames.map((bandName) => (
            <BandCard 
              key={bandName}
              bandName={bandName}
              band={bands[bandName]}
              allPhotos={allPhotos}
              onPhotoClick={handlePhotoClick}
            />
          ))}
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

// Card component for each band
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
  const colorScheme = getBandColor(bandName);

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
    <div className={`card flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${colorScheme.bg}`}>
      <div className="p-5 flex-1 flex flex-col">
        <h2 className={`text-xl font-bold mb-2 line-clamp-1 ${colorScheme.text}`}>{bandName}</h2>
        {band.instagram && (
          <a 
            href={`https://instagram.com/${band.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colorScheme.text} hover:opacity-80 font-medium text-sm mb-3 block truncate transition-opacity`}
          >
            {band.instagram}
          </a>
        )}
        {band.news && (
          <div className="mb-3">
            <h3 className={`text-xs font-semibold ${colorScheme.text} opacity-90 mb-1`}>Latest News</h3>
            <p className={`text-xs ${colorScheme.text} opacity-80 line-clamp-2`}>{band.news}</p>
          </div>
        )}
        {band.nextShow && (
          <div className="mb-3">
            <h3 className={`text-xs font-semibold ${colorScheme.text} opacity-90 mb-1`}>Next Show</h3>
            <p className={`text-xs ${colorScheme.text} opacity-80 line-clamp-2`}>{band.nextShow}</p>
          </div>
        )}
        <div className={`mt-auto pt-2 text-xs ${colorScheme.text} opacity-70`}>
          {isLoadingPhotos ? 'Loading photos...' : `${bandPhotos.length} photo${bandPhotos.length !== 1 ? 's' : ''}`}
        </div>
      </div>
      {/* Photo preview grid */}
      <div className={`p-3 border-t ${colorScheme.accent} backdrop-blur-sm`}>
        <h3 className={`text-xs font-semibold ${colorScheme.text} opacity-90 mb-2`}>Photos</h3>
        {isLoadingPhotos ? (
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`aspect-[3/2] ${colorScheme.accent} rounded-lg animate-pulse`} />
            ))}
          </div>
        ) : bandPhotos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
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
                  loading="lazy"
                />
                {/* Hover overlay with date and location */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-xs font-medium mb-1 truncate">{photo.location}</p>
                    <p className="text-[10px] opacity-90">{formatDate(photo.date)}</p>
                  </div>
                </div>
              </div>
            ))}
            {bandPhotos.length > 4 && (
              <div className={`aspect-[3/2] relative rounded-lg overflow-hidden ${colorScheme.accent} flex items-center justify-center`}>
                <span className={`text-xs ${colorScheme.text} opacity-70`}>
                  +{bandPhotos.length - 4} more
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className={`text-xs ${colorScheme.text} opacity-70`}>No photos available</p>
        )}
      </div>
    </div>
  );
} 