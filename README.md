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
- 65+ calculator links organized by category:
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

This project is optimized for deployment on Vercel with a custom domain from GoDaddy.

### Quick Deploy (5 minutes)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Click "Deploy" (Vercel auto-detects Next.js)
5. Connect your GoDaddy domain in Vercel settings

### Detailed Instructions

- **Quick Start**: See `VERCEL-QUICK-START.md` for a 5-minute deployment guide
- **Complete Guide**: See `VERCEL-DEPLOYMENT.md` for detailed instructions including:
  - GitHub setup
  - Vercel deployment
  - GoDaddy domain connection (DNS configuration)
  - Troubleshooting
  - Auto-deployment setup

### Using Vercel CLI

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

## Features Complete

✅ **60+ fully functional calculators** including:
- Financial calculators (mortgage, investment, loans, retirement, etc.)
- Health & fitness calculators (BMI, BMR, body fat, ideal weight, etc.)
- Math calculators (fractions, percentages, standard deviation, etc.)
- Utility calculators (date, time, conversion, password generator, etc.)

✅ **Production ready** with all calculator logic implemented
✅ **Optimized for Vercel** deployment
✅ **Mobile responsive** and fully tested
✅ **Type-safe** with TypeScript throughout

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

This is a educational/demonstration project inspired by Calculator.net.
