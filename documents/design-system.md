# Calculator.Net Design System

This document records the complete design system and styling approach used for the Calculator.Net homepage.

## Color Palette

### Primary Gradients
- **Main Brand Gradient**: `from-blue-600 to-purple-600`
- **Extended Brand Gradient**: `from-blue-600 via-purple-600 to-pink-600`
- **Hero Gradient**: `from-blue-600 via-purple-600 to-pink-600`

### Category-Specific Gradients
- **Financial**: `from-emerald-500 to-teal-600` (Green/Teal theme)
- **Health & Fitness**: `from-pink-500 to-rose-600` (Pink/Rose theme)
- **Math**: `from-purple-500 to-indigo-600` (Purple/Indigo theme)
- **Other**: `from-amber-500 to-orange-600` (Amber/Orange theme)

### Background Colors
- **Primary Background**: `bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`
- **Card Background**: `bg-white`
- **Header/Footer**: `bg-white/80 backdrop-blur-md` (Glassmorphism)

### Text Colors
- **Primary Text**: `text-slate-800`
- **Secondary Text**: `text-slate-600`
- **Muted Text**: `text-slate-500`
- **Link Hover**: `text-blue-600` / `text-blue-700`

### Accent Colors
- **Featured BMI**: `text-pink-600`, `bg-pink-50`
- **Featured Mortgage**: `text-emerald-600`, `bg-emerald-50`
- **Featured Percentage**: `text-purple-600`, `bg-purple-50`

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
```

### Font Sizes & Weights
- **Hero Title**: `text-5xl md:text-7xl font-bold` (Large displays)
- **Page Title (Calculator pages)**: `text-4xl md:text-5xl font-bold`
- **Section Headings**: `text-3xl md:text-4xl font-bold`
- **Card Titles**: `text-2xl font-bold`
- **Featured Calculator Names**: `text-xl font-bold`
- **Body Text**: `text-lg md:text-xl` (Hero), `text-sm` (Links)
- **Badge Text**: `text-sm font-medium`

### Text Effects
- **Gradient Text**: `bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`
- **Line Height**: `leading-tight` (Hero titles), `leading-normal` (Page titles), `leading-relaxed` (Body)
- **Important**: When using gradient text with `bg-clip-text`, add `pb-1` or `pb-2` to prevent descenders (g, y, p, q, j) from being cut off

## Spacing & Layout

### Container
- **Max Width**: `container mx-auto px-4`
- **Section Padding**: `py-12 md:py-20` (Main), `py-4` (Header)

### Grid Systems
- **Featured Calculators**: `grid gap-6 md:grid-cols-3`
- **Category Cards**: `grid gap-8 md:grid-cols-2`
- **Features Section**: `grid gap-8 md:grid-cols-3`

### Padding & Margins
- **Card Content**: `p-6` (Small), `p-8 md:p-12` (Large sections)
- **Section Margins**: `mb-16` (Standard), `mb-12` (Search/Featured)
- **Header Padding**: `px-4 py-4`

## Border Radius

### Rounding System
- **Small Elements**: `rounded-xl` (Icon containers, buttons)
- **Medium Elements**: `rounded-2xl` (Cards, search bar)
- **Large Elements**: `rounded-3xl` (Feature sections, CTA)
- **Circular**: `rounded-full` (Badges, decorative elements)

## Shadows

### Shadow Hierarchy
- **Default**: `shadow-sm` (Header)
- **Cards**: `shadow-lg` (Normal), `shadow-2xl` (Hover)
- **Featured Elements**: `shadow-xl hover:shadow-2xl`
- **Glow Effects**: Gradient shadows using blur and opacity

## Animations

### Custom Keyframes

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

### Animation Classes
- **Fade In Up**: `.animate-fade-in-up` (0.6s ease-out)
- **Float**: `.animate-float` (3s ease-in-out infinite)

### Transition Timings
- **Fast**: `transition-all duration-200` (Buttons, links)
- **Standard**: `transition-all duration-300` (Cards, hover states)
- **Smooth**: `transition-colors` (Text color changes)
- **Transform**: `transform hover:scale-105` (Buttons)

## Interactive States

### Hover Effects

#### Cards
```css
hover:border-blue-300
hover:shadow-2xl
transition-all duration-300
transform hover:-translate-y-1
```

#### Links
```css
hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
hover:text-blue-700
transition-all duration-200
```

#### Buttons
```css
hover:from-blue-700 hover:to-purple-700
hover:shadow-xl
transition-all duration-200
```

#### Arrows (Micro-interaction)
```css
group-hover:translate-x-1
transition-transform
```

## Special Effects

### Glassmorphism
```css
bg-white/80 backdrop-blur-md
```

### Gradient Glow (Search Bar)
```css
<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
```

### Floating Background Orbs
```css
w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float
```
- Three orbs with staggered animation delays (0s, 1s, 2s)
- Positioned: top-right, bottom-left, center
- Pointer-events disabled for click-through

### Logo Glow Effect
```css
<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
```

## Component Patterns

### Featured Calculator Card
- Border: `border-2 hover:border-blue-300`
- Shadow: `shadow-lg hover:shadow-2xl`
- Transform: `transform hover:-translate-y-1`
- Icon Container: Colored background matching category
- Action Text: `text-blue-600 font-medium text-sm` with arrow

### Category Card
- Gradient Header: Category-specific gradient with white text
- Header Decoration: Semi-transparent white circle in corner
- Icon Container: `bg-white/20 backdrop-blur-sm p-3 rounded-xl`
- Calculator Links: Individual hover states with gradient backgrounds
- Arrow appears on hover: `opacity-0 group-hover/item:opacity-100`

### Search Bar
- Height: `h-14`
- Icon: Absolute positioned left
- Padding: `pl-14 pr-6`
- Border: `border-2 border-slate-200 focus:border-blue-400`
- Glow wrapper with gradient blur effect

### Button Styles

#### Primary Button
```css
bg-gradient-to-r from-blue-600 to-purple-600
hover:from-blue-700 hover:to-purple-700
text-white shadow-lg hover:shadow-xl
transition-all duration-200
```

#### CTA Button
```css
bg-white text-blue-600 hover:bg-blue-50
font-bold px-8 py-6 text-lg rounded-xl
shadow-xl hover:shadow-2xl
transform hover:scale-105
```

## Icons

### Icon Library
- **Source**: Lucide React
- **Standard Size**: `h-6 w-6` (Most icons)
- **Small Size**: `h-4 w-4` (Inline icons, arrows)
- **Large Size**: `h-8 w-8` (Feature icons)

### Icon Usage
- **Calculator**: Logo, brand identity
- **Search**: Search bar
- **Heart**: Health calculators
- **DollarSign**: Financial calculators
- **Brain**: Math calculators
- **Sparkles**: Other calculators, badge
- **ArrowRight**: Call-to-action, links
- **Zap**: Lightning fast feature
- **Shield**: Accuracy feature
- **Clock**: Always available feature
- **TrendingUp**: Percentage calculator

## Responsive Breakpoints

### Mobile First Approach
- **Base**: Mobile (< 768px)
- **md**: Tablet (≥ 768px)
  - Text: `md:text-7xl`, `md:text-4xl`
  - Grid: `md:grid-cols-2`, `md:grid-cols-3`
  - Padding: `md:py-20`, `md:p-12`

## Accessibility

### Focus States
- **Outline**: `outline-ring/50` (Applied globally)
- **Border**: `focus:border-blue-400` (Inputs)

### Color Contrast
- All text colors meet WCAG AA standards
- Interactive elements have clear hover states
- Gradient text maintains readability

## Best Practices

### Performance
- Use CSS transitions over JavaScript animations
- Limit blur effects to static elements
- Optimize gradient usage
- Lazy load heavy components if needed

### Consistency
- All cards use `rounded-2xl` or `rounded-3xl`
- All transitions use standardized durations (200ms, 300ms)
- All gradients follow the blue-purple-pink theme
- All hover states include `transition-all`

### Scalability
- Category colors defined in data structure
- Reusable component patterns
- Consistent spacing scale (4, 6, 8, 12, 16)
- Icon components accept dynamic props

## Future Enhancements

### Potential Additions
- Dark mode support with adjusted gradients
- More sophisticated parallax effects
- Loading skeletons with gradient shimmer
- Toast notifications with gradient borders
- Modal overlays with glassmorphism
- Animated number counters
- Progress indicators with gradients

### Animation Improvements
- Stagger animations for lists
- Page transition effects
- Scroll-triggered animations
- Skeleton loading states
- Entrance animations for dynamic content

---

**Version**: 1.0
**Last Updated**: January 2025
**Author**: Calculator.Net Team
