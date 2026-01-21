# Image Assets for Breefix Portfolio

## Supported Image Formats for GitHub Pages

GitHub Pages supports the following image formats for free deployment:

### Recommended Formats:
- **PNG** (.png) - Best for graphics with transparency, lossless
- **JPG/JPEG** (.jpg, .jpeg) - Best for photographs, compressed
- **WebP** (.webp) - Modern format, smaller file sizes
- **SVG** (.svg) - Vector graphics, scalable, ideal for logos and icons
- **GIF** (.gif) - Animated images, limited colors

### Naming Convention:
Use lowercase filenames with hyphens (not spaces):
- ✅ `project-branding-01.jpg`
- ✅ `logo-breefix.svg`
- ❌ `Project Branding 01.jpg` (avoid spaces)

## Folder Structure

```
images/
├── projects/          # Portfolio project images
├── icons/            # Icons and graphics
├── logos/            # Logo variations
├── screenshots/      # UI/UX screenshots
└── banners/          # Header/banner images
```

## File Size Tips for Free Deployment:
- Keep images under 1MB when possible
- Use compression tools:
  - **TinyPNG/TinyJPG** - For PNG/JPG compression
  - **ImageOptim** - For lossless optimization
  - **Squoosh** - Google's online image optimizer

## How to Use Images in HTML:

```html
<!-- Image in portfolio item -->
<div class="portfolio-image">
    <img src="images/projects/project-name.jpg" alt="Project Description">
</div>

<!-- Background image in CSS -->
background-image: url('../images/banners/hero-bg.jpg');

<!-- SVG Logo -->
<img src="images/logos/breefix-logo.svg" alt="Breefix Logo" class="logo-image">
```

## CDN Alternative (Optional):
If you want to keep your GitHub repo smaller, consider hosting images on:
- Cloudinary (free tier available)
- Imgix
- AWS CloudFront
- Bunny CDN

Simply replace the image paths with CDN URLs.
