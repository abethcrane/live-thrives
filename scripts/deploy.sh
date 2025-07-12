#!/bin/bash

# Live Thrives - Deployment Script
# This script builds and exports the static site for deployment

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next out node_modules/.cache

# Install dependencies
print_status "Installing dependencies..."
npm ci --silent

# Extract EXIF data
print_status "Extracting EXIF data from photos..."
npm run extract-exif

# Run type checking
print_status "Running TypeScript type checking..."
npm run type-check

# Run linting
print_status "Running ESLint..."
npm run lint

# Build the project
print_status "Building the project..."
npm run build

# Export static files
print_status "Exporting static files..."
npm run export

# Check if export was successful
if [ ! -d "out" ]; then
    print_error "Export failed. 'out' directory not found."
    exit 1
fi

# Count files in out directory
FILE_COUNT=$(find out -type f | wc -l)
print_success "Export completed successfully!"
print_status "Generated $FILE_COUNT files in the 'out' directory"

# Show export directory size
EXPORT_SIZE=$(du -sh out | cut -f1)
print_status "Export size: $EXPORT_SIZE"

# List main files
print_status "Main files generated:"
ls -la out/ | head -10

# Optional: Start preview server
if [ "$1" = "--preview" ]; then
    print_status "Starting preview server..."
    print_warning "Press Ctrl+C to stop the preview server"
    npx serve out -p 3000
fi

print_success "Deployment build completed successfully!"
print_status "You can now deploy the contents of the 'out' directory to your hosting provider."
print_status "Run './scripts/deploy.sh --preview' to start a local preview server." 