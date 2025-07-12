# Live Thrives - Live Music Photography Gallery

A modern, responsive photography gallery showcasing live music performances across local venues. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- 🖼️ **High-Performance Image Loading** - Lazy loading with loading states
- 🔍 **Advanced Filtering & Search** - Filter by band, tags, and search across all fields
- 📊 **EXIF Data Display** - Camera settings and technical details
- 🎯 **Touch Gestures** - Swipe navigation on mobile devices
- ⚡ **Static Export Ready** - Deploy to any static hosting service
- ♿ **Accessibility Focused** - WCAG compliant with keyboard navigation
- 🔒 **Security Optimized** - Security headers and best practices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp
- **EXIF Reading**: exifr
- **Date Handling**: date-fns

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd live-thrives
```

2. Install dependencies:
```bash
npm install
```

3. Add your photos to the `public/photos/` directory

4. Run the EXIF extraction script:
```bash
npm run extract-exif
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build & Export

### Development Build
```bash
npm run build
```

### Static Export (for hosting)
```bash
npm run export
```

The static files will be generated in the `out/` directory.

### Preview Static Build
```bash
npm run preview
```

## Deployment

### Netlify

1. **Automatic Deployment**:
   - Connect your repository to Netlify
   - Set build command: `npm run export`
   - Set publish directory: `out`
   - Deploy!

2. **Manual Deployment**:
```bash
npm run export
# Upload the contents of the 'out' directory to Netlify
```

### Vercel

1. **Automatic Deployment**:
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Set environment variable: `NEXT_PUBLIC_BASE_PATH=""`

2. **Manual Deployment**:
```bash
npm run export
# Upload the contents of the 'out' directory to Vercel
```

### GitHub Pages

1. **Setup**:
   - Create a GitHub repository
   - Enable GitHub Pages in repository settings
   - Set source to "GitHub Actions"

2. **Create GitHub Action** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Extract EXIF data
        run: npm run extract-exif
        
      - name: Build and export
        run: npm run export
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### AWS S3 + CloudFront

1. **Build and upload**:
```bash
npm run export
aws s3 sync out/ s3://your-bucket-name --delete
```

2. **Configure CloudFront** for CDN and HTTPS

### Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**:
```bash
firebase init hosting
```

3. **Configure firebase.json**:
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. **Deploy**:
```bash
npm run export
firebase deploy
```

## Performance Optimizations

### Image Optimization

- **Responsive Images**: Multiple sizes for different screen sizes
- **Lazy Loading**: Images load as they enter the viewport
- **WebP/AVIF Support**: Modern image formats for better compression
- **Loading States**: Smooth loading animations

### Code Optimization

- **Tree Shaking**: Unused code is automatically removed
- **Code Splitting**: Automatic code splitting by Next.js
- **Minification**: Production builds are minified
- **Bundle Analysis**: Run `npm run analyze` to analyze bundle size

### Caching Strategy

- **Static Assets**: Images and CSS are cached aggressively
- **Service Worker**: Optional PWA support for offline viewing
- **CDN Ready**: Optimized for CDN deployment

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_BASE_PATH=""
NODE_ENV=development
```

### Image Sizes

Configure image sizes in `next.config.js`:

```javascript
images: {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Data Structure

### Photos JSON Format

```json
{
  "photos": [
    {
      "filename": "photo1.jpg",
      "band": "Band Name",
      "location": "Venue Name",
      "date": "2024-01-15",
      "person": "Featured Artist",
      "tags": ["rock", "live", "concert"],
      "exif": {
        "make": "Canon",
        "model": "EOS R5",
        "focalLength": "50",
        "aperture": "1.8",
        "shutterSpeed": "1/125",
        "iso": "800"
      }
    }
  ]
}
```

## Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for custom styles
- Component-specific styles in individual component files

### Adding New Features

1. **New Filter Types**: Add to `PhotoGrid.tsx` filter logic
2. **Additional EXIF Data**: Extend the EXIF interface in `types.ts`
3. **Custom Animations**: Add to `globals.css` or component files

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Ensure Node.js version is 18+
   - Clear cache: `npm run clean`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

2. **Image Loading Issues**:
   - Check file paths in `public/photos/`
   - Verify image formats (JPG, PNG, WebP)
   - Ensure proper file permissions

3. **EXIF Data Missing**:
   - Run `npm run extract-exif` after adding new photos
   - Check photo metadata contains EXIF data
   - Verify exifr library compatibility

### Performance Issues

1. **Slow Loading**:
   - Optimize image sizes before upload
   - Use WebP format when possible
   - Consider CDN for global distribution

2. **Large Bundle Size**:
   - Run `npm run analyze` to identify large dependencies
   - Consider code splitting for large components
   - Optimize imports and remove unused code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

© 2025 Beth Crane. All rights reserved.

## Support

For questions or issues:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the Next.js documentation for framework-specific questions