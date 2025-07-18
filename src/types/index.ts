export interface Photo {
  filename: string;
  band: string;
  location: string;
  date: string;
  description: string;
  person: string;
  featuredInstagramHandles: string;
  tags: string[];
  colorType?: 'black and white' | 'color' | 'unknown';
}

export interface Band {
  instagram: string;
  news: string;
  nextShow: string;
}

export interface PhotoData {
  photos: Photo[];
}

export interface PhotoWithExif extends Photo {
  exif?: {
    make?: string;
    model?: string;
    lens?: string;
    focalLength?: number;
    aperture?: number;
    shutterSpeed?: string;
    iso?: number;
    dateTaken?: string;
    exposureCompensation?: number;
    meteringMode?: string;
    flash?: string;
    whiteBalance?: string;
  };
} 