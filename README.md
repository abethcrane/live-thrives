# Concert Photo Gallery

A responsive photo gallery website built with Next.js for showcasing concert photography. Features filtering by band and location, sorting by date or band name, and automatic EXIF metadata extraction.

## Features

- 📸 **Photo Display**: Grid and grouped views for concert photos
- 🎵 **Band Information**: Integrated band details, social links, and latest news
- 🏛️ **Location Grouping**: View photos organized by venue
- 📅 **Smart Sorting**: Sort chronologically or alphabetically by band
- 🔍 **Filter & Search**: Find photos by band, location, or tags
- 📊 **EXIF Integration**: Automatic camera metadata extraction
- ⚡ **Static Site**: Fast loading, deployable anywhere

## Tech Stack

- **Next.js** - React framework with static export
- **React** - Component-based UI
- **EXIF.js** - Camera metadata extraction
- **CSS Modules/Tailwind** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/photo-gallery.git
cd photo-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Add your photos to the `public/photos/` directory

4. Update the photo metadata in `data/photos.json`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
photo-gallery/
├── components/           # React components
│   ├── PhotoCard.js     # Individual photo display
│   ├── FilterBar.js     # Filtering controls
│   ├── GalleryGrid.js   # Photo grid layout
│   └── BandInfo.js      # Band information display
├── data/
│   └── photos.json      # Photo and band metadata
├── pages/               # Next.js pages
│   ├── index.js         # Main gallery page
│   └── band/[slug].js   # Individual band pages
├── public/
│   └── photos/          # Photo files
├── styles/              # CSS styles
└── next.config.js       # Next.js configuration
```

## Configuration

### Adding Photos

1. Place photo files in `public/photos/`
2. Update `data/photos.json` with photo metadata:

```json
{
  "filename": "2024-03-15-band-venue.jpg",
  "band": "Band Name",
  "location": "Venue Name",
  "date": "2024-03-15",
  "person": "Band Member Name (optional)",
  "tags": ["tag1", "tag2"]
}
```

### Band Information

Add band details to the `bands` section in `photos.json`:

```json
"Band Name": {
  "instagram": "@bandhandle",
  "news": "Latest album info",
  "nextShow": "Upcoming show details"
}
```

### EXIF Data

Camera information is automatically extracted from photo files. Supported data includes:
- Camera make/model
- Lens information
- Exposure settings (ISO, aperture, shutter speed)
- Focal length

## Deployment

### Static Export

The site is configured for static export. To build:

```bash
npm run build
```

This creates an `out/` directory with static files ready for deployment.

### Git Hook Deployment

For automatic deployment via git hooks:

```bash
#!/bin/bash
cd /path/to/repo
git pull origin main
npm install
npm run build
cp -r out/* /path/to/webroot/
```

### Hosting Options

- **GitHub Pages**: Push the `out` folder to a gh-pages branch
- **Netlify**: Connect your repo for automatic builds
- **Vercel**: Native Next.js support
- **Static Hosting**: Any provider that serves static files

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (not needed for static export)
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `components/`
2. Add new pages in `pages/`
3. Update data structure in `photos.json` as needed
4. Test with `npm run dev`

## Data Format

### Photo Object
```json
{
  "filename": "string",
  "band": "string",
  "location": "string", 
  "date": "YYYY-MM-DD",
  "person": "string (optional)",
  "tags": ["array", "of", "strings"]
}
```

### Band Object
```json
{
  "instagram": "@handle",
  "news": "Latest news or releases",
  "nextShow": "Upcoming show information"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Concert photography by Beth Crane
- Built with Next.js and React
- EXIF data extraction powered by EXIF.js