# Chrome Extension Landing Page Template

A guide for creating high-conversion Chrome extension landing pages on calc-tech.com. Every design decision is optimized to maximize "Add to Chrome" clicks.

---

## 1. Page Structure (Top to Bottom)

### Hero Section (Above the Fold — MOST IMPORTANT)

This is where 80% of conversions happen. Everything above the fold must communicate value and provide a clear action.

**Layout (desktop):** Two columns — text left (55%), screenshot right (45%). On mobile, stack vertically: text first, then image, then CTA.

**Elements in order:**

1. **Headline (H1):** Problem-focused, not feature-focused.
   - Good: "Stop Missing Profitable Trades"
   - Bad: "Polymarket Trade Tracker Extension"
   - Keep it under 8 words. Lead with the pain point.

2. **Subheadline:** One sentence describing the solution. Max 20 words.
   - Example: "Get instant alerts when high-value trades hit Polymarket — right in your browser."

3. **Primary CTA Button:**
   - Text: "Add to Chrome — It's Free"
   - Style: Large (min 48px height), orange-to-amber gradient (`from-orange-500 to-amber-500`), rounded-full, white bold text, Chrome icon on the left (use a small SVG or lucide `Chrome` icon)
   - Links directly to Chrome Web Store listing
   - Add subtle hover scale transform (`hover:scale-105`) and shadow

4. **Trust Line (below CTA):**
   - Text: "Free -- No account required -- 100% private"
   - Style: Small muted text with separator dots or dashes
   - Use `ShieldCheck`, `Zap`, `Lock` icons from lucide-react next to each phrase

5. **Hero Image/Screenshot:**
   - Show the extension popup or overlay with REAL data (not empty state)
   - Add a subtle shadow and slight rotation (2-3 degrees) for depth
   - On mobile this goes below the CTA

### Social Proof Bar

A narrow horizontal strip below the hero. Light gray or white background with subtle top border.

**Three items, centered, evenly spaced:**

| Item | Example | Icon |
|------|---------|------|
| User count | "39+ traders using this" | `Users` |
| Chrome rating | "4.8 stars on Chrome Web Store" | Filled star icons |
| Featured badge | "Featured in Polymarket Tools" | `Award` |

The "Featured" badge links back to the relevant calc-tech.com tools page. Keep numbers honest — "39+" is fine when starting out.

### Problem-Agitate Section

**Purpose:** Make the reader feel the pain of NOT having the extension.

**Layout:** 3 cards in a row (stacked on mobile). Each card:

```
[Icon]
[Problem headline — 5-7 words]
[1-2 sentence description of the pain]
```

**Example cards for a trade tracker:**
- Card 1: `AlertTriangle` icon — "You're Missing Big Moves" — "By the time you check Polymarket, whale trades have already moved the market."
- Card 2: `Clock` icon — "Manual Tracking Wastes Hours" — "Refreshing pages and scanning for trades is tedious and error-prone."
- Card 3: `TrendingDown` icon — "Late Entries Cost You Money" — "Entering a position 10 minutes late can mean 3-5% worse odds."

**Style:** White cards with shadow, colored icon (orange/amber), dark text. Cards should have a top colored border (4px orange gradient).

### Feature Showcase (3-4 Features)

**Layout:** Alternating left-right blocks. Odd features: image left, text right. Even features: text left, image right.

**Each feature block contains:**

1. **Section label:** Small uppercase text in orange (e.g., "REAL-TIME ALERTS")
2. **Feature headline:** Benefit-focused, 5-8 words
3. **Description:** 2-3 sentences max. What it does AND why the reader cares.
4. **Mini-CTA or benefit statement:** A single line like "Never miss another whale trade." in bold or a small text link.

**Example feature block:**

```
SMART FILTERING
Track Only the Trades That Matter
Set your own dollar threshold and market filters.
Get notified about $25,000+ trades on your watchlist
markets — ignore the noise.

-> Filter by amount, market, and trader type
-> Customizable notification settings
-> Works across all Polymarket markets
```

**Style:** Each block gets generous vertical padding (80px+). Use subtle background alternation (white / slate-50) to visually separate blocks.

### How It Works (3 Steps)

**Layout:** Horizontal on desktop (3 columns), vertical on mobile. Steps connected by a thin line or arrow.

**Structure:**

```
[1]                    [2]                    [3]
Install                Configure              Profit
Click "Add to         Set your alerts        Get notified
Chrome" — takes       and filters in         instantly when
10 seconds.           one click.             trades hit.
```

**Style:**
- Numbered circles: 40px, orange gradient background, white bold number
- Connecting line: 2px dashed gray line between circles
- Step title: Bold, 1 word
- Step description: 1-2 sentences, muted text

### Second CTA Section (Mid-Page)

**Purpose:** Catch visitors who scrolled past the hero but are now convinced.

**Layout:** Centered text block with CTA button. Light gradient background (orange-50 to amber-50).

```
Join 39+ Traders Already Using [Extension Name]
[Add to Chrome — It's Free]  (same button style as hero)
"Install in 10 seconds. No account needed."
```

Different headline angle from the hero — focus on social proof ("Join X traders") rather than the problem.

### FAQ Section

**Layout:** Accordion-style, collapsible. 4-5 questions.

**Required questions (adapt wording per extension):**

| Question | Answer Focus |
|----------|-------------|
| Is it really free? | Yes, 100% free. No premium tier, no hidden costs. |
| Is my data safe? | Runs entirely in your browser. No data sent to servers. No account required. |
| How do I install it? | One click from Chrome Web Store. Works instantly. |
| Does it work on [platform]? | Describe which sites/pages the extension works on. |
| How do I uninstall it? | Right-click the icon > Remove from Chrome. No leftover files. |

**Style:** White cards, subtle border. Question text bold. Plus/minus toggle icon on the right. Answer text in muted gray. Use client-side state for open/close toggle.

### Final CTA Section (Bottom)

**Purpose:** Last chance to convert before the reader leaves.

**Layout:** Full-width section with dark background (slate-900) and white text.

```
Ready to Stop Missing Trades?
[Add to Chrome — It's Free]
Free -- No account required -- 100% private -- Install in 10 seconds
```

**Style:** Strong contrast with the rest of the page. Large headline, large CTA button (same orange gradient), trust signals repeated in small text below.

### Footer

Use the same footer as the rest of calc-tech.com. No custom footer needed.

---

## 2. Conversion Optimization Rules

These rules are non-negotiable for every extension landing page:

1. **CTA appears exactly 3 times:** hero, mid-page, and bottom. Every CTA links to the Chrome Web Store URL for that extension.

2. **Orange/amber gradient on all CTA buttons.** Use `bg-gradient-to-r from-orange-500 to-amber-500` with white bold text. This is the Polymarket Tools brand color for action buttons.

3. **"Free" appears at least 3 times on the page:** in the CTA button text, in the trust line, and in the FAQ answer.

4. **No registration wall.** Emphasize "no account needed" prominently. This removes the biggest friction point.

5. **Privacy emphasis.** Include "runs entirely in your browser" or "100% private" in the trust line and FAQ. Many users worry about extensions accessing their data.

6. **Speed emphasis.** Use "install in 10 seconds" in at least one CTA section. Reduces perceived effort.

7. **Social proof numbers even if small.** "39+ active traders" is better than no number. Update these as the user base grows.

8. **Screenshots show real data.** Never show an empty state or placeholder data. Mock up realistic-looking data if needed during initial launch.

9. **Above-the-fold CTA is visible without scrolling on desktop.** Test at 1440x900 viewport. The "Add to Chrome" button must be fully visible.

10. **No distracting navigation.** Keep the header minimal. Remove or reduce nav links on landing pages — the only goal is the CTA click.

11. **Loading speed matters.** No heavy images. Use Next.js Image component with proper sizing. Lazy-load everything below the fold.

12. **Single focus.** Each page sells ONE extension. No cross-promotion above the fold.

---

## 3. SEO Guidelines

### Meta Tags

```tsx
export const metadata: Metadata = {
  title: "[Extension Name] — Free Chrome Extension for Polymarket",
  description: "[Benefit statement]. Free Chrome extension for Polymarket traders. No account required. Install in seconds.",
  keywords: "[extension name], polymarket, chrome extension, prediction markets, trading tools, polymarket tools",
  openGraph: {
    title: "[Extension Name] — Free Chrome Extension",
    description: "[Benefit statement]",
    url: "https://www.calc-tech.com/extensions/[slug]",
    type: "website",
  },
};
```

### On-Page SEO

- **H1:** The hero headline (problem-focused). Only one H1 per page.
- **H2s:** Section headings (features, how it works, FAQ).
- **Semantic keywords to include naturally:** prediction markets, trading, Polymarket tools, Chrome extension, browser extension, free tool.
- **Internal links:** Link to related calculators like `/polymarket-ev`, `/polymarket-kelly`, `/polymarket-arbitrage` where relevant (in FAQ or feature descriptions).
- **External link:** Chrome Web Store listing (nofollow not needed — it is a legitimate product link).
- **URL structure:** `/extensions/[extension-slug]` (e.g., `/extensions/polymarket-trade-tracker`).

---

## 4. Technical Implementation

### File Structure

```
app/extensions/
  extensions.css              # Shared styles for all extension pages
  page.tsx                    # Extensions hub page (optional, list all extensions)
  [extension-slug]/
    page.tsx                  # Landing page for one extension
```

### Page Setup

```tsx
// app/extensions/polymarket-trade-tracker/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  Chrome, ShieldCheck, Zap, Lock, Users, Star, Award,
  AlertTriangle, Clock, TrendingDown, ChevronDown, ChevronUp,
} from "lucide-react";
import "../extensions.css";
```

### Chrome Web Store Link Format

```
https://chromewebstore.google.com/detail/[extension-name-slug]/[extension-id]
```

Example:
```
https://chromewebstore.google.com/detail/polymarket-trade-tracker/abcdefghijklmnopqrstuvwxyz
```

### CTA Button Component

Reuse this across all three CTA placements:

```tsx
function CtaButton({ chromeStoreUrl }: { chromeStoreUrl: string }) {
  return (
    <a
      href={chromeStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-button"
    >
      <Chrome className="cta-icon" />
      Add to Chrome — It&apos;s Free
    </a>
  );
}
```

### FAQ Accordion Component

```tsx
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{question}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}
```

### Shared Styles (extensions.css)

Create `app/extensions/extensions.css` with styles for:
- `.cta-button` — Orange gradient, large, rounded-full, white text, shadow, hover scale
- `.hero-section` — Two-column on desktop, stacked on mobile
- `.social-proof-bar` — Flexbox, centered, light background
- `.problem-cards` — 3-column grid (1-column mobile)
- `.feature-block` — Alternating image/text layout
- `.steps-section` — Horizontal steps with connecting line
- `.faq-item` — Collapsible card
- `.final-cta` — Dark background section

**Responsive breakpoints:** Match the rest of the site (821px, 1201px).

### Color Palette

| Usage | Color | Tailwind |
|-------|-------|----------|
| CTA buttons | Orange-amber gradient | `from-orange-500 to-amber-500` |
| Section labels | Orange | `text-orange-500` |
| Card borders/accents | Orange | `border-orange-500` |
| Body text | Dark slate | `text-slate-800` |
| Muted text | Gray | `text-slate-500` |
| Card backgrounds | White | `bg-white` |
| Alternating section bg | Light gray | `bg-slate-50` |
| Final CTA background | Dark slate | `bg-slate-900` |

### AdSense Placement

Include ad units only if they do not compete with the CTA:
- One sidebar ad on desktop (same pattern as software pages)
- One bottom ad above the footer
- NO inline ads between the hero and the first CTA — ads must never distract from conversion

---

## 5. Template Variables

When creating a new extension landing page, copy the template and replace these variables:

```typescript
const config = {
  // Core
  extensionName: "Polymarket Trade Tracker",
  extensionSlug: "polymarket-trade-tracker",
  chromeStoreUrl: "https://chromewebstore.google.com/detail/.../...",

  // Hero
  heroHeadline: "Stop Missing Profitable Trades",
  heroSubheadline: "Get instant alerts when high-value trades hit Polymarket — right in your browser.",

  // Social Proof
  userCount: "39+",
  rating: "4.8",
  ratingCount: "12",

  // Problem Cards (3 items)
  problemCards: [
    {
      icon: "AlertTriangle",
      title: "You're Missing Big Moves",
      description: "By the time you check Polymarket, whale trades have already moved the market.",
    },
    // ... 2 more
  ],

  // Features (3-4 items)
  features: [
    {
      label: "REAL-TIME ALERTS",
      title: "Know the Moment Big Money Moves",
      description: "Get browser notifications for trades above your custom threshold.",
      bullets: ["Configurable dollar amount filter", "Desktop notifications", "Sound alerts"],
      screenshotUrl: "/images/extensions/feature-alerts.png",
    },
    // ... 2-3 more
  ],

  // How It Works (3 steps)
  howItWorks: [
    { step: 1, title: "Install", description: "Click 'Add to Chrome' — takes 10 seconds." },
    { step: 2, title: "Configure", description: "Set your alerts and filters in one click." },
    { step: 3, title: "Profit", description: "Get notified instantly when trades hit." },
  ],

  // FAQ (4-5 items)
  faqItems: [
    { question: "Is it really free?", answer: "Yes, 100% free. No premium tier, no hidden costs, no ads." },
    { question: "Is my data safe?", answer: "The extension runs entirely in your browser. No data is sent to any server. No account required." },
    // ... 2-3 more
  ],

  // Screenshot
  heroScreenshotUrl: "/images/extensions/trade-tracker-hero.png",
};
```

To add a new extension page:
1. Create `app/extensions/[new-slug]/page.tsx`
2. Copy an existing extension page
3. Replace the config object values
4. Add screenshots to `public/images/extensions/`
5. Build and test locally: `npm run build`
6. Deploy

---

## 6. Copywriting Rules for Maximum Conversion

### Headlines

- Lead with the BENEFIT, not the feature.
  - Good: "Never Miss a Whale Trade Again"
  - Bad: "Real-Time Polymarket Trade Notifications"
- Use power words: "instantly", "automatically", "never miss", "stop", "free"
- Keep headlines under 8 words.

### Body Copy

- Address the reader as "you" — never "users" or "traders" in the abstract.
- Every section must answer: "What's in it for me?"
- Keep paragraphs under 3 lines. One idea per paragraph.
- Use numbers where possible: "Track trades over $25,000" beats "Track large trades."
- Create urgency without being spammy. "Markets move fast" is fine. "LIMITED TIME OFFER" is not.

### CTA Text

- Primary: "Add to Chrome — It's Free"
- Secondary variations: "Get Started Free", "Install Now — It's Free"
- Never use: "Download", "Sign Up", "Learn More" (too vague or implies friction)

### Trust Copy

- "No account required" — removes sign-up friction
- "100% private" — addresses data fears
- "Runs in your browser" — implies lightweight and safe
- "Install in 10 seconds" — reduces perceived effort
- "Free forever" — if applicable, use it

### Tone

- Confident but not arrogant
- Direct and concise
- Slightly informal (contractions are fine)
- No jargon unless the audience uses it (Polymarket traders know what "whale trades" means)
- No exclamation marks in headlines (they reduce trust)

---

## Quick Checklist for New Pages

Before publishing a new extension landing page, verify:

- [ ] CTA button appears 3 times (hero, mid-page, bottom)
- [ ] All CTAs link to the correct Chrome Web Store URL
- [ ] "Free" appears at least 3 times
- [ ] Hero CTA is visible without scrolling at 1440x900
- [ ] Screenshot shows real data, not empty state
- [ ] Privacy/trust signals present in hero trust line
- [ ] FAQ includes "Is it free?" and "Is my data safe?"
- [ ] Meta title and description are set
- [ ] Internal links to related calculators are included
- [ ] Page builds without errors (`npm run build`)
- [ ] Mobile layout is usable (test at 375px width)
- [ ] No competing ads above the first CTA
