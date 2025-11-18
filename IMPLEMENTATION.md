# Quantrock Landing Page - Implementation Guide

A premium, high-conversion landing page built with React, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

### Visual Style
- **Dark Theme**: Background #0A0F1C with purple-to-blue gradient accents (#A855F7 → #8B5CF6 → #3B82F6)
- **Logo**: Quantrock hexagonal logo with matching gradient colors
- **Typography**: Poppins (Latin) and Tajawal (Arabic) fonts
- **Tone**: Expert, data-driven, trustworthy, modern, tech-forward

### Key Sections

0. **Transparent Header**
   - Fixed navigation with scroll effect
   - Logo with gradient text
   - Desktop & mobile responsive menu
   - Smooth background transition on scroll

1. **Hero Section**
   - Full-screen video background with overlay
   - Animated headline and CTA
   - App store badges
   - Phone mockup with gradient glow effect

2. **Social Proof Marquee**
   - Infinite horizontal scroll with major brand logos
   - Auto-pause on hover
   - Smooth animations

3. **Features Section**
   - 4 interactive cards with icons
   - 3D tilt effect on hover
   - Staggered entrance animations

4. **How It Works**
   - 3-step process with icons
   - Animated connecting paths
   - Number badges

5. **Gallery**
   - Swipeable carousel for phone mockups
   - Video playback with lightbox modal
   - Keyboard navigation support

6. **Testimonials**
   - 3 floating cards with user quotes
   - Avatar placeholders with initials
   - Rotation effects on hover

7. **About Section**
   - Animated particle background
   - Company information

8. **Final CTA**
   - Prominent call-to-action
   - Animated gradient background
   - Dual app store buttons

9. **Footer**
   - Contact information
   - Social media links
   - Bottom ticker marquee

## 🛠 Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

## 📦 Project Structure

```
src/
├── components/
│   ├── QuantrockLanding.tsx  # Main landing page component
│   ├── Marquee.tsx           # Reusable infinite scroll component
│   └── Gallery.tsx           # Image/video gallery with modal
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles + Tailwind

public/
└── media/                    # Placeholder for all media assets
    └── README.md             # Asset specifications and requirements
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Media Assets

Place the following assets in `/public/media/`:

**Videos:**
- `hero.mp4` - Hero background video
- `demo1.mp4` - App demo video

**Images:**
- `poster.jpg` - Video fallback poster
- `phone-mockup.png` - Hero phone mockup
- `screen1.png` through `screen4.png` - App screenshots
- `og-image.jpg` - Social media preview image

**Logos:**
- `bloomberg-logo.svg`
- `forbes-logo.svg`
- `cnbc-logo.svg`
- `arabian-business-logo.svg`

See `/public/media/README.md` for detailed specifications.

### 3. Update App Store Links

In `src/components/QuantrockLanding.tsx`, search for and replace:
- `https://apps.apple.com` → Your Apple App Store URL
- `https://play.google.com` → Your Google Play Store URL

### 4. Update Social Media Links

In the footer section, replace:
- `https://linkedin.com` → Your LinkedIn profile
- `https://twitter.com` → Your Twitter profile
- `https://instagram.com` → Your Instagram profile

### 5. Run Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

## ✨ Animation Features

- **Fade-up entrance** for all sections
- **Staggered animations** for lists and cards
- **3D hover effects** on feature cards
- **Parallax scrolling** on hero elements
- **Infinite marquees** with pause-on-hover
- **Particle animations** in background
- **Smooth page transitions**
- **Modal lightbox** for gallery items

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interactions
- Optimized for all screen sizes

## ♿ Accessibility

- Semantic HTML landmarks (header, main, footer)
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for images
- Focus indicators
- Screen reader friendly

## 🎯 SEO Optimization

- Meta tags in `index.html`
- Open Graph tags for social sharing
- Twitter Card tags
- Semantic HTML structure
- H1 heading in hero section
- Descriptive title and description

## 🔧 Customization

### Changing Colors

Current color scheme based on Quantrock logo:
- Background: `#0A0F1C` (dark navy)
- Primary Purple: `#A855F7`
- Mid Purple: `#8B5CF6`
- Primary Blue: `#3B82F6`
- Hover Purple: `#C084FC`
- Hover Blue: `#60A5FA`

### Modifying Content

Content is organized in arrays at the top of `QuantrockLanding.tsx`:
- `features` - Feature cards
- `steps` - How it works steps
- `testimonials` - User testimonials
- `galleryItems` - Gallery images/videos
- `logos` - Partner/media logos

### Adjusting Animations

Framer Motion variants are defined at component level:
- `fadeUpVariants` - Standard entrance animation
- `staggerContainer` - Parent container for staggered children

## 📊 Performance

- Lazy loading for off-screen images
- Video poster images for fallback
- Optimized animation performance
- Minimal bundle size
- No external CSS dependencies

## 🐛 Troubleshooting

### Video not playing
- Ensure video is in MP4 format (H.264)
- Check that video path is correct
- Verify poster image exists as fallback

### Images not loading
- Check file paths in `/public/media/`
- Verify file extensions match code
- Logo fallback shows text if image fails

### Animations not smooth
- Reduce number of animated elements
- Check browser hardware acceleration
- Consider reducing particle count

## 📝 Notes

- All assets currently use placeholder paths
- Graceful degradation for missing assets
- Logo marquee shows text fallback if images fail
- Gallery handles both images and videos
- Modal closes on ESC key or background click

## 🤝 Support

For questions or issues, contact:
- Email: support@quantrock.com
- Phone: +971 52 713 9014
