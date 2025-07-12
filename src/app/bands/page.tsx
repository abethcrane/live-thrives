import { getBands, getPhotosByBand } from '@/lib/data';
import { formatDate } from '@/lib/data';

export default async function BandsPage() {
  const bands = await getBands();
  const bandNames = Object.keys(bands);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bandNames.map(async (bandName) => {
          const band = bands[bandName];
          const bandPhotos = await getPhotosByBand(bandName);
          
          return (
            <div key={bandName} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{bandName}</h2>
                
                {band.instagram && (
                  <div className="mb-4">
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
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Latest News</h3>
                    <p className="text-sm text-gray-600">{band.news}</p>
                  </div>
                )}
                
                {band.nextShow && (
                  <div className="mb-4">
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
            </div>
          );
        })}
      </div>
    </div>
  );
} 