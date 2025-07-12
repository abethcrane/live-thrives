import { getBands, getPhotosByBand } from '@/lib/data';
import PhotoCard from '@/components/PhotoCard';

export default async function BandsPage() {
  const bands = await getBands();
  const bandNames = Object.keys(bands).sort();

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

      <div className="space-y-12">
        {bandNames.map(async (bandName) => {
          const band = bands[bandName];
          const bandPhotos = await getPhotosByBand(bandName);
          
          return (
            <div key={bandName} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                        {bandPhotos.length} photo{bandPhotos.length !== 1 ? 's' : ''} in gallery
                      </p>
                    </div>
                  </div>

                  {/* Photo Previews */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Photos</h3>
                    {bandPhotos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {bandPhotos.slice(0, 4).map((photo) => (
                          <div key={photo.filename} className="aspect-[3/2] relative rounded-lg overflow-hidden">
                            <img
                              src={`/photos/${photo.filename}`}
                              alt={`${photo.band} at ${photo.location}`}
                              className="w-full h-full object-cover"
                            />
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
        })}
      </div>
    </div>
  );
} 