import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">Add photographer image here</p>
                  </div>
                </div>
                <Image
                  src="/images/about-beth.jpg"
                  alt="Beth Crane - Live Music Photographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Beth Crane has been shooting live music in NYC since 2021. She lives for moments of joy and connection on-stage, capturing people having fun with their craft.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    You'll typically find her at the sides with a telephoto lens, or climbing on something to get the right angle, shooting on digital except for those fabled daytime shows where she can whip out the film cam.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    She enjoys the challenge of making something beautiful out of whatever the lighting folks throw her way.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    You can find her work online at{' '}
                    <a 
                      href="http://bethcrane.photos" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      bethcrane.photos
                    </a>{' '}
                    or{' '}
                    <a 
                      href="https://instagram.com/abethcrane" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      @abethcrane
                    </a>{' '}
                    on Instagram. :)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Thrives Event Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Live Thrives 2025
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Back at Bar Freda for the 2nd time, Live Thrives is a showcase of live music photography.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Event Flyer */}
              <div className="relative h-[500px] rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src="/images/live-thrives-flyer.avif"
                  alt="Live Thrives 2025 Event Flyer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Spotify Playlist */}
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <iframe 
                    style={{borderRadius: '12px'}} 
                    src="https://open.spotify.com/embed/playlist/4iy7qu1F3bLVhnZLiQFfI5?utm_source=generator" 
                    width="100%" 
                    height="500" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 