'use client';

import { useState, useEffect } from 'react';

const scavengerHuntItems = [
  'photo shot on film',
  'photo taken outside of nyc',
  'photo shot from above',
  'photo taken at bar freda',
  'photo from a venue that closed',
  'photo from a show you went to',
  'photo that you\'re in',
  'follow a new band on instagram',
  'photo of a band you\'ve never heard of',
  'photo where the drummer looks good',
  'photo of a musician in the crowd',
  'photo with a lot of negative space',
  'text a friend a photo of them',
  'post an insta story (tag @abethcrane and @barfreda801)',
  'text beth and tell her which photo is your favorite'

];

// Celebration Animation Component
function CelebrationAnimation({ isVisible }: { isVisible: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string; size: number; rotation: number; rotationSpeed: number }>>([]);

  useEffect(() => {
    if (!isVisible) return;

    // Create confetti particles with more variety
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * 4 + 3,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#FF8A80', '#80CBC4', '#81C784', '#FFD54F'][Math.floor(Math.random() * 12)],
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    }));

    setParticles(newParticles);

    // Animate particles with better physics
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.15, // gravity
        vx: particle.vx * 0.99, // air resistance
        rotation: particle.rotation + particle.rotationSpeed
      })).filter(p => p.y < window.innerHeight + 100));
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-sm"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.y > window.innerHeight - 200 ? Math.max(0, (window.innerHeight - particle.y) / 200) : 1,
          }}
        />
      ))}
      
      {/* Firework effects with more variety */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-5 h-5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/6 right-1/6 w-6 h-6 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-1/6 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
      
      {/* Celebration overlay with gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100/30 to-transparent animate-pulse" />
      
      {/* Additional sparkle effects */}
      <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-2/5 right-1/5 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-3/5 left-1/5 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
    </div>
  );
}

export default function ScavengerHuntPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scavenger-hunt-progress');
    if (saved) {
      const savedItems = new Set(JSON.parse(saved) as string[]);
      setCheckedItems(savedItems);
      const newProgress = (savedItems.size / scavengerHuntItems.length) * 100;
      setProgress(newProgress);
      
      // Don't show celebration on page load, only when actually completing
      if (newProgress === 100) {
        setHasShownCelebration(true);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scavenger-hunt-progress', JSON.stringify([...checkedItems]));
    const newProgress = (checkedItems.size / scavengerHuntItems.length) * 100;
    setProgress(newProgress);
    
    // Trigger celebration when reaching 100%
    if (newProgress === 100 && !hasShownCelebration) {
      setShowCelebration(true);
      setHasShownCelebration(true);
      
      // Haptic feedback for mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
      
      // Hide celebration after 5 seconds
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [checkedItems, hasShownCelebration]);

  const toggleItem = (item: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    setCheckedItems(newCheckedItems);
  };

  const resetProgress = () => {
    setCheckedItems(new Set());
    setHasShownCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CelebrationAnimation isVisible={showCelebration} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Photo Scavenger Hunt
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Find these photos in the gallery and check them off!
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {checkedItems.size}/{scavengerHuntItems.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {progress === 100 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetProgress}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Progress
          </button>
        </div>

        {/* Scavenger Hunt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scavengerHuntItems.map((item, index) => (
            <div
              key={item}
              className={`relative bg-white rounded-lg shadow-sm border-2 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:scale-105 ${
                checkedItems.has(item) 
                  ? 'border-green-500 bg-green-50 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleItem(item)}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                      checkedItems.has(item)
                        ? 'bg-green-500 border-green-500 scale-110'
                        : 'border-gray-300'
                    }`}>
                      {checkedItems.has(item) && (
                        <svg className="w-3 h-3 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-relaxed transition-all duration-300 ${
                      checkedItems.has(item) ? 'text-green-800 line-through' : 'text-gray-900'
                    }`}>
                      {item}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Completion indicator */}
              {checkedItems.has(item) && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 shadow-xl transform scale-105">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 animate-pulse">
                🎉 Congratulations! 🎉
              </h3>
              <p className="text-green-700 text-lg mb-4">
                You've completed the photo scavenger hunt! Thanks for checking out my work :)
              </p>
              <div className="flex justify-center space-x-4 text-2xl">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎵</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>📸</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎤</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎸</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🥁</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 