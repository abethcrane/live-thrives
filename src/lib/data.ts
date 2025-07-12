import photoData from '../../photos.json';
import { PhotoData, Photo, PhotoWithExif } from '@/types';

export async function getPhotoData(): Promise<PhotoData> {
  return photoData as PhotoData;
}

export async function getPhotos(): Promise<Photo[]> {
  const data = await getPhotoData();
  return data.photos;
}

export async function getBands(): Promise<Record<string, any>> {
  const data = await getPhotoData();
  return data.bands;
}

export async function getPhotoByFilename(filename: string): Promise<Photo | null> {
  const photos = await getPhotos();
  return photos.find(photo => photo.filename === filename) || null;
}

export async function getPhotosByBand(bandName: string): Promise<Photo[]> {
  const photos = await getPhotos();
  return photos.filter(photo => photo.band === bandName);
}

export async function getPhotosByTag(tag: string): Promise<Photo[]> {
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