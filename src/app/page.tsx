import { getPhotos } from '@/lib/data';
import PhotoGrid from '@/components/PhotoGrid';

export default async function HomePage() {
  const photos = await getPhotos();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Live Music Photography
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Capturing the energy and passion of live music performances across local venues
        </p>
      </div>
      
      <PhotoGrid photos={photos} />
    </div>
  );
} 