const fs = require('fs').promises;
const path = require('path');
const exifr = require('exifr');

async function extractExifData() {
  try {
    console.log('🔍 Extracting EXIF data from photos...');
    
    // Read the current photos.json
    const photosJsonPath = path.join(process.cwd(), 'photos.json');
    const photosData = JSON.parse(await fs.readFile(photosJsonPath, 'utf8'));
    
    // Path to photos directory
    const photosDir = path.join(process.cwd(), 'public', 'photos');
    
    // Check if photos directory exists
    try {
      await fs.access(photosDir);
    } catch (error) {
      console.log('📁 Photos directory not found, skipping EXIF extraction');
      return;
    }
    
    // Get all photo files
    const photoFiles = await fs.readdir(photosDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];
    const imageFiles = photoFiles.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    
    console.log(`📸 Found ${imageFiles.length} image files`);
    
    // Process each photo and update metadata
    for (const photo of photosData.photos) {
      const photoPath = path.join(photosDir, photo.filename);
      
      try {
        // Check if photo file exists
        await fs.access(photoPath);
        
        // Extract EXIF data
        const exifData = await exifr.parse(photoPath, {
          tiff: true,
          xmp: false,
          icc: false,
          iptc: false,
          jfif: false,
          ihdr: false,
          exif: true,
          gps: false,
          interop: false,
          translateValues: true,
          translateTags: true,
          reviveValues: true,
          mergeOutput: true
        });
        
        if (exifData) {
          // Extract relevant EXIF data
          const extractedExif = {
            make: exifData.Make || null,
            model: exifData.Model || null,
            lens: exifData.LensModel || exifData.Lens || null,
            focalLength: exifData.FocalLength ? Math.round(exifData.FocalLength) : null,
            aperture: exifData.FNumber ? parseFloat(exifData.FNumber.toFixed(1)) : null,
            shutterSpeed: exifData.ExposureTime ? formatShutterSpeed(exifData.ExposureTime) : null,
            iso: exifData.ISO || null,
            dateTaken: exifData.DateTimeOriginal || exifData.DateTime || null,
            exposureCompensation: exifData.ExposureCompensation || null,
            meteringMode: exifData.MeteringMode || null,
            flash: exifData.Flash || null,
            whiteBalance: exifData.WhiteBalance || null
          };
          
          // Only add EXIF data if we found something useful
          const hasUsefulData = Object.values(extractedExif).some(value => value !== null);
          if (hasUsefulData) {
            photo.exif = extractedExif;
            console.log(`✅ Extracted EXIF for ${photo.filename}`);
          } else {
            console.log(`⚠️  No useful EXIF data found for ${photo.filename}`);
          }
        } else {
          console.log(`⚠️  No EXIF data found for ${photo.filename}`);
        }
        
      } catch (error) {
        console.log(`❌ Error processing ${photo.filename}: ${error.message}`);
      }
    }
    
    // Write updated data back to photos.json
    await fs.writeFile(photosJsonPath, JSON.stringify(photosData, null, 2));
    console.log('💾 Updated photos.json with EXIF data');
    
  } catch (error) {
    console.error('❌ Error extracting EXIF data:', error);
    process.exit(1);
  }
}

function formatShutterSpeed(seconds) {
  if (seconds >= 1) {
    return `${seconds}s`;
  } else {
    const fraction = Math.round(1 / seconds);
    return `1/${fraction}s`;
  }
}

// Run the extraction
extractExifData(); 