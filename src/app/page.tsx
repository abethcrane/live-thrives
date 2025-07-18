import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Live Thrives Event Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Live Thrives 2025
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Back at Bar Freda for the 2nd time, Live Thrives is a one-night showcase of live music photography. 
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Event Description */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Bar Freda is a live music venue / bar in Ridgewood, and they've agreed to leave these photos up for a week - come see them before July 20!
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Say hi to the bartender(s), grab a drink, and check out the <a href="/scavenger-hunt" className="text-blue-600 hover:text-blue-800 underline">scavenger hunt page</a> - see which ones you can cross off :)
                </p>

                <p className="text-gray-700 leading-relaxed">
                  The photos are printed on fabric, using sublimation printing. Thank you to Jim Holodak and All U, inc. for letting us use their space and materials, to Isis for the fabric cutter, and Ida for lending her time/sewing machine.
                </p>
                <p className="text-gray-700 leading-relaxed">
                   Above all, thank you to Jeff Schaer-Moses for organizing, and to Dan Holodak for helping with every part of the process 💙
                </p>
              </div>

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
            </div>
          </div>

          {/* Spotify Playlist Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Looking for new tunes?
              </h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                There would be no photos without the bands - you'll find songs from all 27 bands on this playlist 🤘 
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
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

          {/* Installation Gallery Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Here’s how the installation looks
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="overflow-hidden rounded-lg shadow flex flex-col">
                <img src="/images/me.JPG" alt="Me at the installation" className="w-full h-auto object-cover" />
                <span className="block text-center text-sm text-gray-700 mt-2">
                  Me at the installation <a href="/gallery" className="text-blue-600 hover:text-blue-800 underline ml-1">(see all photos in the gallery)</a>
                </span>
              </div>
              <div className="overflow-hidden rounded-lg shadow flex flex-col">
                <img src="/images/outside-glam.JPG" alt="Outside shots: Glam" className="w-full h-auto object-cover" />
                <span className="block text-center text-sm text-gray-700 mt-2">
                  Outside shots: <a href="/gallery?tag=cool as heck" className="text-blue-600 hover:text-blue-800 underline ml-1">Cool as heck</a>
                </span>
              </div>
              <div className="overflow-hidden rounded-lg shadow flex flex-col">
                <img src="/images/inside-connection.JPG" alt="Inside shots: We’re in it together" className="w-full h-auto object-cover" />
                <span className="block text-center text-sm text-gray-700 mt-2">
                  Inside shots: <a href="/gallery?tag=in it together" className="text-blue-600 hover:text-blue-800 underline ml-1">In it together</a>
                </span>
              </div>
              <div className="overflow-hidden rounded-lg shadow flex flex-col">
                <img src="/images/outside-crowd.JPG" alt="Outside shots: Crowd goes hard" className="w-full h-auto object-cover" />
                <span className="block text-center text-sm text-gray-700 mt-2">
                  Outside shots: <a href="/gallery?tag=crowd goes hard" className="text-blue-600 hover:text-blue-800 underline ml-1">Crowd goes hard</a>
                </span>
              </div>
              <div className="overflow-hidden rounded-lg shadow flex flex-col">
                <img src="/images/inside-bands.JPG" alt="Inside shots: The whole band" className="w-full h-auto object-cover" />
                <span className="block text-center text-sm text-gray-700 mt-2">
                  Inside shots: <a href="/gallery?tag=band's all here" className="text-blue-600 hover:text-blue-800 underline ml-1">The band's all here</a>
                </span>
              </div>
            </div>
          </div>
                    {/* About Beth Section */}
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
              
              <div>
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-gray-700">
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

        </div>
      </div>
    </div>
  );
} 