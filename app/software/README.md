# Calc-Tech Software Hub

This is the software download and review section of Calc-Tech, inspired by appposts.com.

## Structure

```
/software
├── layout.tsx          # Software section layout with metadata
├── page.tsx            # Software hub landing page
├── software.css        # Shared styles for all software pages
└── com_ubercab/        # Individual app pages
    └── page.tsx        # Uber app download page
```

## Features

### Implemented ✅
- Clean, modern design with gradient accents
- Fully responsive layout (mobile, tablet, desktop)
- AdSense integration with calc-tech's publisher ID: `ca-pub-2201920716197483`
- Manual ad placements at strategic locations
- App details including ratings, downloads, and safety badges
- Editor reviews with pros/cons
- Download buttons with external links
- SEO-optimized metadata
- Beautiful footer with links

### Design Elements
- **Colors**: Purple gradient theme (#667eea to #764ba2)
- **Layout**: Based on appposts.com structure
- **Components**:
  - App header card with icon and stats
  - Info grid (6 items: name, category, downloads, safety, developer, price)
  - Editor review section
  - Features, Pros, and Cons lists
  - Download CTA section
  - Ad placements between sections

## Adding New Apps

To add a new app page:

1. Create a new directory under `/software/` with the app package name (e.g., `com_example_app`)
2. Create a `page.tsx` file in that directory
3. Copy the structure from `com_ubercab/page.tsx`
4. Update the content:
   - Metadata (title, description, keywords)
   - App icon URL
   - App name and details
   - Ratings, downloads, age rating
   - About section details
   - Editor review content
   - Features, Pros, Cons lists
   - Download link

## AdSense Configuration

The site uses **manual ad placements** (not auto ads) with the following structure:

- **AdSense ID**: ca-pub-2201920716197483
- **Ad Slots**: Each ad unit has a unique slot ID
  - Slot 1: 3339483394
  - Slot 2: 9713320054

Ads are placed:
1. After the app header
2. After the about section
3. (Additional placements can be added as needed)

## Routes

- `/software` - Software hub landing page
- `/software/com_ubercab` - Uber app page (example)

## Next Steps

1. Add more app pages following the same structure
2. Create category pages (Games, Social Media, etc.)
3. Add search functionality
4. Implement app comparison features
5. Add user reviews/comments
6. Create an admin panel to manage apps dynamically
7. Build out the database of apps similar to appposts.com

## Building and Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

The pages are statically generated for optimal performance.
