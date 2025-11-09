# Calculator.Net Clone

A stunning, modern recreation of Calculator.net built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features a beautiful design inspired by Omni Calculator with enhanced gradients, animations, and user experience.

## Features

### Design & UX
- **Modern Gradient Design**: Beautiful blue-purple-pink gradient theme with floating animated background elements
- **Glassmorphism Effects**: Frosted glass backdrop blur on header and footer
- **Smooth Animations**: Fade-in-up animations, floating elements, and micro-interactions
- **Featured Calculators Section**: Highlighted popular calculators with hover effects
- **Responsive Layout**: Fully mobile-optimized with adaptive spacing and grid layouts

### Content
- 200+ calculator links organized by category:
  - **Financial Calculators** (15 types) - Emerald gradient theme
  - **Fitness & Health Calculators** (8 types) - Pink/Rose gradient theme
  - **Math Calculators** (6 types) - Purple/Indigo gradient theme
  - **Other Calculators** (10 types) - Amber/Orange gradient theme
- Enhanced search bar with gradient glow effect
- Category cards with gradient headers and icons
- Call-to-action section with gradient background
- Ready for Vercel deployment

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Development

```bash
# Navigate to project directory
cd calculator-net-clone

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and configure the build settings
5. Click "Deploy"

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Project Structure

```
calculator-net-clone/
├── app/
│   ├── page.tsx          # Homepage with calculator categories
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # shadcn/ui components
│       ├── card.tsx
│       ├── button.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Next Steps

The homepage is complete with all calculator links. Next steps:

1. Create individual calculator pages (e.g., `/bmi`, `/mortgage`, etc.)
2. Implement calculator logic for each type
3. Add form validation
4. Implement the search functionality
5. Add more features as needed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

This is a educational/demonstration project inspired by Calculator.net.
