# Quantrock Media Assets

This directory should contain all media assets for the Quantrock landing page.

## Required Assets

### Hero Section
- `hero.mp4` - Background video for hero section (muted, looping)
- `poster.jpg` - Poster image for video fallback
- `phone-mockup.png` - Phone mockup showing the app interface
- `og-image.jpg` - Open Graph image for social sharing (1200x630px)

### Social Proof Logos
- `bloomberg-logo.svg`
- `forbes-logo.svg`
- `cnbc-logo.svg`
- `arabian-business-logo.svg`

### Gallery/Screenshots
- `screen1.png` - Dashboard overview screenshot
- `screen2.png` - Portfolio tracking screenshot
- `screen3.png` - AI insights screenshot
- `screen4.png` - Market analysis screenshot
- `demo1.mp4` - App demo video

### Testimonials
- `avatar1.jpg` - User avatar (optional, as fallback uses initials)
- `avatar2.jpg` - User avatar
- `avatar3.jpg` - User avatar

## Video Specifications

### Hero Video (`hero.mp4`)
- Format: MP4 (H.264)
- Resolution: 1920x1080 or higher
- Length: 10-30 seconds (looping)
- No audio required (will be muted)
- Subject: Finance/tech abstract visuals, data visualization, or investment-related imagery

### Demo Video (`demo1.mp4`)
- Format: MP4 (H.264)
- Resolution: 1080x1920 (vertical, mobile format)
- Shows app interface and features
- Can include audio (user-controlled in modal)

## Image Specifications

### Screenshots
- Format: PNG with transparency or JPG
- Resolution: 1080x1920 (mobile portrait) or 2x for retina
- Show actual app UI or high-quality mockups

### Logos
- Format: SVG preferred, PNG acceptable
- Transparent background
- White or light-colored for dark theme

### Avatars
- Format: JPG or PNG
- Size: 200x200px minimum
- Square aspect ratio

## App Store Links

Update the following links in `QuantrockLanding.tsx`:
- Apple App Store: Replace `https://apps.apple.com` with actual app URL
- Google Play Store: Replace `https://play.google.com` with actual app URL

## Social Media Links

Update the following links in the footer section:
- LinkedIn: Replace `https://linkedin.com` with actual profile
- Twitter: Replace `https://twitter.com` with actual profile
- Instagram: Replace `https://instagram.com` with actual profile

## Notes

- All assets are currently placeholders
- The page will gracefully handle missing images (logos will show text fallback)
- Video background will show poster image if video fails to load
- Optimize all images for web (compress, use appropriate formats)
- Consider lazy loading for below-the-fold images
