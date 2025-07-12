import photoData from '../../photos.json';
import bandsData from '../../bands.json';
import { PhotoData, Photo, PhotoWithExif } from '@/types';

export async function getPhotoData(): Promise<PhotoData> {
  return photoData as PhotoData;
}

export async function getPhotos(): Promise<PhotoWithExif[]> {
  const data = await getPhotoData();
  return data.photos as PhotoWithExif[];
}

export async function getBands(): Promise<Record<string, any>> {
  return bandsData.bands;
}

export async function getPhotoByFilename(filename: string): Promise<PhotoWithExif | null> {
  const photos = await getPhotos();
  return photos.find(photo => photo.filename === filename) || null;
}

export async function getPhotosByBand(bandName: string): Promise<PhotoWithExif[]> {
  const photos = await getPhotos();
  return photos.filter(photo => photo.band === bandName);
}

export async function getPhotosByTag(tag: string): Promise<PhotoWithExif[]> {
  const photos = await getPhotos();
  return photos.filter(photo => photo.tags.includes(tag));
}

export async function getPhotoWithExif(filename: string): Promise<PhotoWithExif | null> {
  const photo = await getPhotoByFilename(filename);
  if (!photo) return null;

  try {
    // Note: In a static export, we can't read EXIF on the client side
    // This would need to be pre-processed during build time
    // For now, returning the photo without EXIF data
    return photo as PhotoWithExif;
  } catch (error) {
    console.error('Error reading EXIF data:', error);
    return photo as PhotoWithExif;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getUniqueTags(): string[] {
  const tags = photoData.photos.flatMap((photo: Photo) => photo.tags);
  return Array.from(new Set(tags));
}

export function getUniqueBands(): string[] {
  return Array.from(new Set(photoData.photos.map((photo: Photo) => photo.band)));
}

export function formatExifData(exif: any): string {
  if (!exif) return '';
  
  const parts = [];
  
  if (exif.make && exif.model) {
    parts.push(`${exif.make} ${exif.model}`);
  }
  
  if (exif.focalLength) {
    parts.push(`${exif.focalLength}mm`);
  }
  
  if (exif.aperture) {
    parts.push(`f/${exif.aperture}`);
  }
  
  if (exif.shutterSpeed) {
    parts.push(exif.shutterSpeed);
  }
  
  if (exif.iso) {
    parts.push(`ISO ${exif.iso}`);
  }
  
  return parts.join(' • ');
} 