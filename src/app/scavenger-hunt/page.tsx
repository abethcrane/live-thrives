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
  'photo shot from below',
  'photo of a band you\'ve never heard of',
  'photo where the drummer looks good',
  'photo of a musician in the crowd',
  'photo with a lot of negative space',
  'text a friend a photo of them',
  'post an insta story (tag @abethcrane and @barfreda801)',
  'text beth and tell her which photo is your favorite'

];

export default function ScavengerHuntPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scavenger-hunt-progress');
    if (saved) {
      const savedItems = new Set(JSON.parse(saved) as string[]);
      setCheckedItems(savedItems);
      setProgress((savedItems.size / scavengerHuntItems.length) * 100);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('scavenger-hunt-progress', JSON.stringify([...checkedItems]));
    setProgress((checkedItems.size / scavengerHuntItems.length) * 100);
  }, [checkedItems]);

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
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
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
              className={`relative bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                checkedItems.has(item) 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleItem(item)}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      checkedItems.has(item)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}>
                      {checkedItems.has(item) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-relaxed ${
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
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
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
          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-green-700">
                You've completed the photo scavenger hunt! You're a true music photography expert.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 