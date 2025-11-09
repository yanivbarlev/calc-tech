# SEO Optimization & Google AdSense Guide

Complete guide for making Calculator.Net SEO-optimized and Google AdSense compliant.

---

## Table of Contents

1. [SEO Fundamentals](#seo-fundamentals)
2. [Metadata & Schema](#metadata--schema)
3. [Content Strategy](#content-strategy)
4. [Technical SEO](#technical-seo)
5. [Google AdSense Requirements](#google-adsense-requirements)
6. [Required Pages](#required-pages)
7. [Performance Optimization](#performance-optimization)
8. [Checklists](#checklists)

---

## SEO Fundamentals

### Why SEO Matters for Calculator Sites

Calculator websites have excellent SEO potential because:
- **High search intent**: Users actively searching for solutions
- **Low competition**: Niche calculators can rank easily
- **Repeat visitors**: Users bookmark useful calculators
- **Natural backlinks**: Other sites reference calculator tools
- **Long-tail keywords**: Specific calculator terms are easy to rank

### Primary SEO Goals

1. **Rank for calculator-specific keywords**
   - "mortgage calculator"
   - "BMI calculator free"
   - "percentage calculator online"

2. **Appear in featured snippets**
   - Calculator rich results
   - FAQ snippets
   - How-to guides

3. **Build domain authority**
   - Quality backlinks from financial/health sites
   - Internal linking between calculators
   - Comprehensive content library

---

## Metadata & Schema

### Meta Tags Template

Every calculator page needs:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Primary metadata
  title: 'Mortgage Calculator - Calculate Monthly Payments | Calculator.Net',
  description: 'Free mortgage calculator to estimate monthly payments, total interest, and amortization schedule. Calculate your home loan costs instantly with taxes and insurance.',

  // Keywords (still useful for some search engines)
  keywords: 'mortgage calculator, home loan calculator, monthly payment calculator, amortization calculator, mortgage estimator',

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: 'Mortgage Calculator - Calculator.Net',
    description: 'Calculate your monthly mortgage payments instantly with our free calculator.',
    type: 'website',
    url: 'https://calculator.net/mortgage',
    siteName: 'Calculator.Net',
    images: [
      {
        url: '/og-mortgage-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator - Monthly Payment Estimator'
      }
    ],
    locale: 'en_US'
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@CalculatorNet',
    title: 'Mortgage Calculator - Calculator.Net',
    description: 'Calculate your monthly mortgage payments instantly.',
    images: ['/twitter-mortgage-calculator.png']
  },

  // Canonical URL (prevents duplicate content issues)
  alternates: {
    canonical: 'https://calculator.net/mortgage'
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },

  // Verification (optional)
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
};
```

### Structured Data (JSON-LD)

#### WebApplication Schema

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Mortgage Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript enabled",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online mortgage calculator to estimate monthly payments, calculate total interest, and view complete amortization schedule. Includes property tax and insurance calculations.",
  "url": "https://calculator.net/mortgage",
  "screenshot": "https://calculator.net/mortgage-screenshot.png",
  "featureList": [
    "Monthly payment calculation",
    "Total interest calculation",
    "Amortization schedule",
    "Property tax inclusion",
    "Home insurance calculation"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "provider": {
    "@type": "Organization",
    "name": "Calculator.Net",
    "url": "https://calculator.net"
  }
};
```

#### FAQ Schema

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is a monthly mortgage payment calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly mortgage payments are calculated using the loan amount, annual interest rate, and loan term. The formula is: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect my mortgage payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your mortgage payment is affected by home price, down payment amount, interest rate, loan term, property taxes, home insurance, and PMI if applicable. Even small changes in interest rates can significantly impact your monthly payment."
      }
    },
    {
      "@type": "Question",
      "name": "Should I make a 20% down payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 20% down payment helps you avoid PMI (private mortgage insurance) and typically secures better interest rates. However, programs exist for as little as 3% down for qualified buyers. Consider your financial situation and savings goals."
      }
    }
  ]
};
```

#### BreadcrumbList Schema

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://calculator.net"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Financial Calculators",
      "item": "https://calculator.net/financial"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Mortgage Calculator",
      "item": "https://calculator.net/mortgage"
    }
  ]
};
```

### Implementing Structured Data

```typescript
export default function MortgageCalculator() {
  return (
    <>
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page content */}
    </>
  );
}
```

---

## Content Strategy

### Content Requirements

**Minimum Standards:**
- 1,500+ words per calculator page
- 100% unique content (no copying from competitors)
- Natural, conversational writing style
- Proper grammar and spelling
- Factually accurate information

### Content Structure

```
H1: [Calculator Name] (Include primary keyword)
├── Intro Paragraph (100-150 words)
│   └── Hook + Value proposition + Primary keyword
│
H2: How to Use This Calculator
├── Step-by-step instructions
└── Screenshot or example

H2: Understanding [Topic]
├── H3: What is [Main Concept]?
│   └── Definition + context (200-300 words)
├── H3: Why [Topic] Matters
│   └── Real-world importance (150-200 words)
├── H3: Key Components
│   ├── H4: Component 1
│   ├── H4: Component 2
│   └── H4: Component 3

H2: Examples and Use Cases
├── Example 1 (with numbers)
├── Example 2 (different scenario)
└── Example 3 (edge case)

H2: Tips and Best Practices
├── Tip 1
├── Tip 2
└── Tip 3

H2: Common Mistakes to Avoid
├── Mistake 1
├── Mistake 2
└── Mistake 3

H2: Frequently Asked Questions
├── Question 1 + Answer
├── Question 2 + Answer
├── Question 3 + Answer
└── (5-10 total FAQs)

H2: Related Calculators
├── Link to Calculator 1
├── Link to Calculator 2
└── Link to Calculator 3

H2: Additional Resources
├── External authoritative link 1
└── External authoritative link 2
```

### Keyword Optimization

**Primary Keyword Placement:**
- H1 title (exactly)
- First paragraph (first 100 words)
- At least one H2 heading
- Meta description
- URL slug
- Image alt text
- Naturally throughout content (2-3% density)

**Secondary Keywords:**
- Related terms and synonyms
- Long-tail variations
- Question-based keywords ("how to calculate...")
- Comparison keywords ("vs", "difference between")

**Example for Mortgage Calculator:**
- Primary: "mortgage calculator"
- Secondary: "home loan calculator", "monthly payment calculator", "mortgage payment estimator"
- Long-tail: "how to calculate monthly mortgage payment", "mortgage calculator with taxes and insurance"
- Questions: "what is a mortgage calculator?", "how does a mortgage calculator work?"

### Internal Linking Strategy

**Link Types:**
1. **Contextual Links** (in content body)
2. **Related Calculator Cards** (at bottom)
3. **Breadcrumb Navigation** (at top)
4. **Category Pages** (e.g., Financial Calculators)

**Best Practices:**
- Link to 3-5 related calculators per page
- Use descriptive anchor text (not "click here")
- Link from high-authority pages to new pages
- Create hub pages for calculator categories
- Build logical link hierarchies

**Example Internal Links for Mortgage Calculator:**
```typescript
<p>
  Before calculating your mortgage, use our{' '}
  <Link href="/affordability-calculator">
    home affordability calculator
  </Link>{' '}
  to determine your budget. You may also want to compare with our{' '}
  <Link href="/loan-calculator">
    general loan calculator
  </Link>{' '}
  or explore{' '}
  <Link href="/interest-rate-calculator">
    interest rate scenarios
  </Link>.
</p>
```

---

## Technical SEO

### URL Structure

**Best Practices:**
- Use clean, descriptive slugs
- Include primary keyword
- Use hyphens (not underscores)
- Keep it short (3-5 words max)
- No unnecessary parameters

**Good Examples:**
```
✅ calculator.net/mortgage
✅ calculator.net/bmi-calculator
✅ calculator.net/compound-interest
```

**Bad Examples:**
```
❌ calculator.net/calc?id=123
❌ calculator.net/mortgage_payment_calculator_online
❌ calculator.net/calculator/financial/mortgage/index.html
```

### Semantic HTML

Use proper HTML5 semantic elements:

```typescript
<header>         {/* Site header with navigation */}
  <nav>          {/* Primary navigation */}
</header>

<main>           {/* Main page content */}
  <article>      {/* Calculator and educational content */}
    <section>    {/* Distinct content sections */}
      <h2>...</h2>
    </section>
  </article>

  <aside>        {/* Sidebar with related calculators */}
  </aside>
</main>

<footer>         {/* Site footer with links */}
</footer>
```

### Heading Hierarchy

**Rules:**
- One H1 per page (the calculator name)
- H2 for main sections
- H3 for subsections
- H4 for sub-subsections
- Never skip levels (don't jump from H2 to H4)

**Example:**
```html
<h1>Mortgage Calculator</h1>
  <h2>Understanding Mortgages</h2>
    <h3>What is a Mortgage?</h3>
    <h3>Types of Mortgages</h3>
      <h4>Fixed-Rate Mortgages</h4>
      <h4>Adjustable-Rate Mortgages</h4>
  <h2>Frequently Asked Questions</h2>
    <h3>How much can I afford?</h3>
    <h3>What is PMI?</h3>
```

### Image Optimization

**Requirements:**
- Descriptive filenames: `mortgage-amortization-schedule.png`
- Comprehensive alt text: "Mortgage amortization schedule showing monthly breakdown of principal and interest payments over 30 years"
- Appropriate dimensions (don't serve 4000px images for 800px display)
- Modern formats: WebP with fallbacks
- Lazy loading for below-fold images
- Compressed without noticeable quality loss

**Implementation:**
```typescript
import Image from 'next/image';

<Image
  src="/images/mortgage-calculator-breakdown.webp"
  alt="Mortgage payment breakdown showing $2,500 monthly payment split between $1,800 principal/interest, $400 taxes, and $300 insurance"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Mobile Optimization

**Requirements:**
- Responsive design (works on all screen sizes)
- Touch-friendly buttons (44x44px minimum)
- Readable text (16px minimum font size)
- No horizontal scrolling
- Fast mobile load times (< 3 seconds)
- Mobile-first CSS approach

**Testing:**
- Use Chrome DevTools mobile emulation
- Test on real devices
- Use Google's Mobile-Friendly Test
- Check Core Web Vitals on mobile

### Site Speed Optimization

**Target Metrics:**
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Page Load Time**: < 3 seconds

**Optimization Techniques:**
1. Use Next.js Image component
2. Implement code splitting
3. Lazy load below-fold content
4. Minimize CSS and JavaScript
5. Use CDN (Vercel Edge Network)
6. Enable compression (gzip/brotli)
7. Optimize fonts (use font-display: swap)
8. Reduce third-party scripts

---

## Google AdSense Requirements

### Eligibility Criteria

**Content Requirements:**
- [ ] 20-30 pages minimum of unique, valuable content
- [ ] Each page 1,500+ words
- [ ] Original content (not scraped or copied)
- [ ] Proper grammar and spelling
- [ ] No prohibited content (see below)

**Site Requirements:**
- [ ] Custom domain (www.calculator.net, not subdomain)
- [ ] Site is 3-6 months old (recommended, not strict)
- [ ] HTTPS enabled (SSL certificate)
- [ ] Professional design and layout
- [ ] Clear navigation structure
- [ ] Mobile-responsive design

**Technical Requirements:**
- [ ] All required pages present (Privacy, Terms, About, Contact)
- [ ] No broken links or 404 errors
- [ ] Functional features (calculators must work)
- [ ] Fast loading speeds
- [ ] Accessible to Googlebot (robots.txt allows crawling)

**Traffic Requirements:**
- No minimum (though more is better)
- Quality traffic from search engines
- Low bounce rate (under 50% ideal)
- Good engagement metrics

### Prohibited Content

**Never include:**
- Adult or sexual content
- Violent or shocking content
- Hate speech or discrimination
- Illegal activities or drugs
- Copyright infringement
- Misleading or deceptive content
- Dangerous products (weapons, tobacco)
- Hacked/pirated content

**For Calculator Sites:**
- Avoid gambling calculators (unless clearly educational)
- Don't promote get-rich-quick schemes
- No medical advice (health calculators are OK if clearly stated as informational)
- Don't make exaggerated claims

### Required Pages

#### 1. Privacy Policy
Must include:
- What data you collect
- How you use the data
- Third-party services (AdSense, Analytics)
- Cookie usage
- User rights (GDPR compliance)
- Contact information

See template in main document.

#### 2. Terms of Service
Must include:
- Acceptable use policy
- Disclaimer (calculations are estimates)
- Intellectual property rights
- Limitation of liability
- Governing law

#### 3. About Us
Must include:
- Site mission and purpose
- Team/founder information (can be minimal)
- Why users should trust you
- Contact information

#### 4. Contact Page
Must include:
- Email address OR contact form
- Response time expectations
- Additional contact methods (optional)

### AdSense Application Process

**Step 1: Prepare Your Site**
- Complete 20-30 calculator pages
- Add all required pages
- Ensure mobile-responsiveness
- Fix all technical issues

**Step 2: Apply**
1. Go to google.com/adsense
2. Sign up with Google account
3. Enter your website URL
4. Add AdSense code to your site

**Step 3: Site Review**
- Google reviews your site (takes 1-2 weeks)
- Check email for approval/rejection
- Address any issues if rejected

**Step 4: Set Up Ads**
- Create ad units
- Place ads on your site
- Test ad display
- Monitor performance

### Ad Placement Best Practices

**Recommended Placements:**
1. **Above the fold** - After title, before calculator (leaderboard 728x90)
2. **Sidebar** - Next to calculator (300x250 or 300x600)
3. **In-content** - Within educational text (responsive)
4. **Below results** - After calculator output (responsive)
5. **End of content** - Bottom of page (responsive)

**Placement Rules:**
- Maximum 3 ads per page initially
- Don't push content below fold
- Don't place ads near buttons
- Leave space around interactive elements
- Maintain readability

**Ad Formats:**
- **Responsive Display Ads** - Adapt to screen size
- **In-Article Ads** - Blend with content
- **Matched Content** - Suggest related pages
- **Auto Ads** - Let Google optimize placement

**Implementation Example:**
```typescript
// components/AdUnit.tsx
'use client';

import { useEffect } from 'react';

export function AdUnit({
  slot,
  format = 'auto',
  responsive = true
}: {
  slot: string;
  format?: string;
  responsive?: boolean;
}) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-8 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
```

---

## Required Pages

### Privacy Policy Template

```typescript
// app/privacy/page.tsx
export const metadata = {
  title: 'Privacy Policy - Calculator.Net',
  description: 'Privacy policy for Calculator.Net',
  robots: { index: true, follow: true }
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-md">
        {/* Header component */}
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-800">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-sm text-slate-500 mb-6">
            <strong>Last Updated:</strong> January 6, 2025
          </p>

          <h2>Introduction</h2>
          <p>
            Calculator.Net ("we", "our", or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website calculator.net.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            We do not require registration to use our calculators. However, if you contact
            us via email or contact form, we collect:
          </p>
          <ul>
            <li>Name (if provided)</li>
            <li>Email address</li>
            <li>Message content</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about
            your device, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent</li>
            <li>Device identifiers</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our calculator services</li>
            <li>Improve and personalize user experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Respond to inquiries and support requests</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience
            and collect usage information. Cookies are small data files stored on your
            device.
          </p>

          <h3>Types of Cookies We Use</h3>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads</li>
          </ul>

          <p>
            You can control cookies through your browser settings. Note that disabling
            cookies may affect website functionality.
          </p>

          <h2>Third-Party Services</h2>

          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our website. Google uses
            cookies to serve ads based on your prior visits to our website or other websites.
            You may opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">
              Google Ad Settings
            </a>.
          </p>

          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics to analyze website traffic and usage patterns. Google
            Analytics uses cookies and collects information such as how often users visit
            our site, what pages they visit, and what other sites they used prior to coming
            to our site. You can opt out of Google Analytics by installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information from
            unauthorized access, alteration, disclosure, or destruction. However, no method
            of transmission over the Internet or electronic storage is 100% secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to processing of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not
            knowingly collect personal information from children under 13. If you believe
            we have collected information from a child under 13, please contact us immediately.
          </p>

          <h2>International Users</h2>
          <p>
            Our website is hosted in the United States. If you access our website from
            outside the United States, please be aware that your information may be
            transferred to, stored, and processed in the United States.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new Privacy Policy on this page and updating the "Last
            Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@calculator.net<br />
            Address: [Your Business Address]
          </p>
        </div>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-md py-12">
        {/* Footer component */}
      </footer>
    </div>
  );
}
```

---

## Performance Optimization

### Core Web Vitals

**What They Are:**
- **LCP (Largest Contentful Paint)**: Time until largest element renders
- **FID (First Input Delay)**: Time until page becomes interactive
- **CLS (Cumulative Layout Shift)**: Visual stability during loading

**Target Scores:**
- LCP: < 2.5 seconds (Good)
- FID: < 100 milliseconds (Good)
- CLS: < 0.1 (Good)

**How to Improve:**

1. **LCP Optimization**
   - Optimize images (use WebP, proper sizing)
   - Minimize render-blocking resources
   - Use CDN for static assets
   - Implement lazy loading
   - Preload critical resources

2. **FID Optimization**
   - Minimize JavaScript execution time
   - Break up long tasks
   - Use web workers for heavy calculations
   - Implement code splitting
   - Defer non-critical JavaScript

3. **CLS Optimization**
   - Set explicit dimensions for images/videos
   - Reserve space for ads
   - Avoid inserting content above existing content
   - Use transform animations instead of layout-triggering properties

### Next.js Optimization

**Built-in Features:**
- Automatic code splitting
- Image optimization
- Font optimization
- Route prefetching

**Custom Optimizations:**
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// Optimize fonts
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

// Use next/image for all images
import Image from 'next/image';

// Implement caching
export const revalidate = 3600; // Revalidate every hour
```

---

## Checklists

### Pre-Launch SEO Checklist

**Technical SEO:**
- [ ] All pages have unique meta titles (50-60 chars)
- [ ] All pages have compelling meta descriptions (150-160 chars)
- [ ] Canonical URLs set for all pages
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] JSON-LD structured data added to all calculators
- [ ] Sitemap.xml generated and submitted to Google
- [ ] Robots.txt created and configured
- [ ] 404 error page created
- [ ] HTTPS enabled (SSL certificate)
- [ ] Mobile-responsive design verified
- [ ] Page speed under 3 seconds
- [ ] No broken links (run link checker)
- [ ] Images optimized with alt text
- [ ] Proper heading hierarchy (H1-H4)
- [ ] Semantic HTML used throughout

**Content SEO:**
- [ ] Each calculator has 1,500+ words
- [ ] Content is 100% unique (no plagiarism)
- [ ] Primary keywords in titles and first paragraphs
- [ ] Internal links to 3-5 related calculators per page
- [ ] External links to 2-3 authoritative sources
- [ ] FAQ sections added with schema
- [ ] Content written naturally (passes AI detection)
- [ ] Proper grammar and spelling
- [ ] Related calculators section at bottom

**Site Structure:**
- [ ] Clear navigation menu
- [ ] Breadcrumb navigation
- [ ] Category pages for calculator groups
- [ ] Search functionality (optional but recommended)
- [ ] Footer with all important links

### AdSense Application Checklist

**Content Requirements:**
- [ ] 20-30 pages of unique content minimum
- [ ] Each page 1,500+ words
- [ ] No duplicate or scraped content
- [ ] All content factually accurate
- [ ] Professional writing quality
- [ ] No prohibited content

**Required Pages:**
- [ ] Privacy Policy page created
- [ ] Terms of Service page created
- [ ] About Us page created
- [ ] Contact Us page created
- [ ] All linked in footer

**Technical Requirements:**
- [ ] Custom domain (not subdomain)
- [ ] HTTPS enabled
- [ ] Mobile-responsive
- [ ] Fast loading (< 3 seconds)
- [ ] No broken links
- [ ] Clear navigation
- [ ] Professional design
- [ ] Functional calculators

**Pre-Application:**
- [ ] Site is 3-6 months old (recommended)
- [ ] Has organic traffic
- [ ] All pages indexed by Google
- [ ] Google Analytics installed
- [ ] Search Console set up

### Post-Launch Monitoring

**Weekly Tasks:**
- [ ] Check Google Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Review new search queries
- [ ] Check for broken links
- [ ] Monitor AdSense performance

**Monthly Tasks:**
- [ ] Analyze traffic patterns
- [ ] Review top-performing pages
- [ ] Update content as needed
- [ ] Add new calculators
- [ ] Build backlinks
- [ ] Review and respond to user feedback

**Quarterly Tasks:**
- [ ] Comprehensive SEO audit
- [ ] Content refresh (update old articles)
- [ ] Competitor analysis
- [ ] Update metadata based on performance
- [ ] Review and optimize ad placements

---

## Tools and Resources

### SEO Tools

**Free:**
- Google Search Console - Track performance
- Google Analytics - Analyze traffic
- Google PageSpeed Insights - Check site speed
- Google Mobile-Friendly Test - Test mobile optimization
- Screaming Frog (free version) - Crawl site for issues

**Paid:**
- Ahrefs - Comprehensive SEO analysis
- SEMrush - Keyword research and tracking
- Moz Pro - SEO tools and metrics

### Schema Testing
- Google Rich Results Test
- Schema.org Validator

### Performance Tools
- WebPageTest
- GTmetrix
- Lighthouse (Chrome DevTools)

---

**Document Version:** 1.0
**Last Updated:** January 2025
**For:** Calculator.Net Project
