export interface Photo {
  filename: string;
  band: string;
  location: string;
  date: string;
  description: string;
  person: string;
  tags: string[];
}

export interface Band {
  instagram: string;
  news: string;
  nextShow: string;
}

export interface PhotoData {
  photos: Photo[];
  bands: Record<string, Band>;
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
  };
} 