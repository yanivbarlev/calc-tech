# Calculator Development Template

This document provides a step-by-step template for creating new calculator pages in the Calculator.Net project. Follow this workflow to ensure consistency, quality, and adherence to our design system.

---

## Development Workflow

### Phase 1: Research & Analysis

#### Step 1.1: Analyze the Source Page
Navigate to the corresponding calculator on calculator.net and thoroughly analyze:

**Functionality Analysis:**
- [ ] List all input fields with their names, types, and default values
- [ ] Identify validation rules (min/max values, required fields, formats)
- [ ] Document the calculation formula/methodology
- [ ] Note any conditional logic (e.g., "if X > Y, then...")
- [ ] Identify optional vs. required fields

**Output Analysis:**
- [ ] List all calculated results displayed
- [ ] Identify primary result (main answer shown prominently)
- [ ] Document secondary results (supporting information)
- [ ] Note any charts, graphs, or visual representations
- [ ] Check for tables (e.g., amortization schedule, breakdown table)

**Content Analysis:**
- [ ] Extract all educational sections and their headings
- [ ] Document key concepts explained
- [ ] Note examples, tips, or warnings provided
- [ ] Identify any historical context or background information
- [ ] List related calculators mentioned

**Tool to Use:** `WebFetch` with detailed analysis prompt
```
WebFetch URL: https://www.calculator.net/[calculator-name].html
Prompt: "Analyze this calculator page and provide: 1) All input fields with defaults,
2) How calculation works, 3) What results are displayed, 4) Any tables/schedules shown,
5) All educational content with headings. Be comprehensive."
```

#### Step 1.2: Document Your Findings
Create a temporary analysis file or notes covering:
- Input structure (fields, types, defaults, validation)
- Calculation logic (formulas, conditions)
- Output structure (results, tables, visualizations)
- Educational content outline

---

### Phase 2: Planning

#### Step 2.1: Create Development Plan
Use `TodoWrite` to create a structured task list:

```typescript
TodoWrite({
  todos: [
    { content: "Analyze [calculator name] page structure", status: "in_progress" },
    { content: "Extract and revise educational content", status: "pending" },
    { content: "Create calculator page with form", status: "pending" },
    { content: "Implement calculation logic", status: "pending" },
    { content: "Add results display and visualizations", status: "pending" },
    { content: "Style page with design system", status: "pending" },
    { content: "Test with various inputs", status: "pending" }
  ]
})
```

#### Step 2.2: Define Data Structures
Plan your TypeScript interfaces:

```typescript
// Results interface - what gets calculated
interface [CalculatorName]Results {
  primaryResult: number;
  secondaryResult1: number;
  // ... other calculated values
}

// Table/Schedule data (if needed)
interface [CalculatorName]Entry {
  // Define table row structure
}
```

#### Step 2.3: Choose Default Values
Select appealing default values that:
- Represent realistic use cases
- Show meaningful results
- Demonstrate calculator capabilities
- Are easy to understand (round numbers when possible)

**Example:** Mortgage used $1M home, 25 years, 6.5% rate

---

### Phase 3: Content Preparation

#### Step 3.1: Rewrite Educational Content
Transform the source content to be human-like and undetectable by AI:

**Writing Guidelines:**
1. **Vary sentence structure** - Mix short, medium, and long sentences
2. **Use conversational tone** - Write as if explaining to a friend
3. **Add natural transitions** - "That said...", "Keep in mind...", "Here's the thing..."
4. **Include personal touches** - "You'll typically...", "Most people..."
5. **Avoid robotic patterns** - No formulaic "Firstly, Secondly, Thirdly"
6. **Use contractions** - "it's", "you're", "don't" (where appropriate)
7. **Add context and examples** - Real-world scenarios and numbers
8. **Maintain accuracy** - Don't sacrifice correctness for style

**Anti-AI Detection Techniques:**
- Vary paragraph lengths (avoid uniform blocks)
- Use em dashes, parenthetical asides, and semicolons naturally
- Include rhetorical questions occasionally
- Add nuance and caveats ("usually", "typically", "in most cases")
- Use active voice predominantly but mix in passive where natural
- Include idiomatic expressions sparingly

**Structure Your Content:**
```markdown
### Main Concept Heading
Natural explanation paragraph with examples...

#### Sub-concept
More detailed explanation with practical advice...

#### Another Sub-concept
Continue building on the topic naturally...
```

---

### Phase 4: Page Structure Setup

#### Step 4.1: Create Directory and File
```bash
mkdir -p app/[calculator-name]
# File will be: app/[calculator-name]/page.tsx
```

#### Step 4.2: Basic Page Template
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, [RelevantIcons] } from "lucide-react";

interface [CalculatorName]Results {
  // Define result structure
}

export default function [CalculatorName]Calculator() {
  // State management
  const [inputField1, setInputField1] = useState<string>("default");
  // ... more input states

  const [results, setResults] = useState<[CalculatorName]Results | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Calculation function
  const calculate = () => {
    // Parse inputs
    // Perform calculations
    // Set results
    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

  const formatValue = (value: number) => {
    // Format numbers for display
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      {/* Main Content */}
      {/* Educational Content */}
      {/* Footer */}
    </div>
  );
}
```

---

### Phase 5: Design System Implementation

#### Step 5.1: Choose Category Gradient
Select gradient based on calculator category:

| Category | Gradient | Icon Color | Background |
|----------|----------|------------|------------|
| Financial | `from-emerald-500 to-teal-600` | `text-emerald-600` | `bg-emerald-50` |
| Health | `from-pink-500 to-rose-600` | `text-pink-600` | `bg-pink-50` |
| Math | `from-purple-500 to-indigo-600` | `text-purple-600` | `bg-purple-50` |
| Other | `from-amber-500 to-orange-600` | `text-amber-600` | `bg-amber-50` |

#### Step 5.2: Header Structure
```typescript
<header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-3 group">
        {/* Logo with gradient glow effect */}
      </Link>
      <Link href="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  </div>
</header>
```

#### Step 5.3: Page Title Section
```typescript
<div className="mb-12 text-center">
  <div className="inline-flex items-center gap-2 bg-[category]-100 text-[category]-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
    <Icon className="h-4 w-4" />
    [Category Name] Tool
  </div>
  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[category]-600 to-[category2]-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
    [Calculator Name]
  </h1>
  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
    [Brief description of what calculator does]
  </p>
</div>
```

**Important**: The `leading-normal pb-1` classes prevent descenders (g, y, p, q, j) from being cut off when using gradient text with `bg-clip-text`.

#### Step 5.4: Layout Grid
```typescript
<div className="grid gap-8 lg:grid-cols-3">
  {/* Left Sidebar: Input Form (lg:col-span-1) */}
  {/* Right Area: Results (lg:col-span-2) */}
</div>
```

#### Step 5.5: Input Form Card
```typescript
<Card className="border-2 rounded-2xl shadow-lg sticky top-24">
  <CardHeader className="bg-gradient-to-r from-[category]-500 to-[category2]-600 text-white rounded-t-2xl">
    <CardTitle className="flex items-center gap-2">
      <Icon className="h-6 w-6" />
      Input Details
    </CardTitle>
  </CardHeader>
  <CardContent className="pt-6 space-y-6">
    {/* Input fields */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Field Label
      </label>
      <Input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="default"
      />
    </div>

    {/* Calculate Button */}
    <Button
      onClick={calculate}
      className="w-full bg-gradient-to-r from-[category]-600 to-[category2]-600 hover:from-[category]-700 hover:to-[category2]-700 text-white font-semibold py-6 text-lg"
    >
      Calculate
    </Button>
  </CardContent>
</Card>
```

#### Step 5.6: Results Display
```typescript
{results ? (
  <>
    {/* Primary Result Card */}
    <Card className="border-2 border-[category]-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[category]-600 to-[category2]-600 p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-8 w-8" />
          <h3 className="text-xl font-semibold">Primary Result</h3>
        </div>
        <p className="text-5xl font-bold mb-2">{formatValue(results.primary)}</p>
        <p className="text-[category]-100">Additional info</p>
      </div>
    </Card>

    {/* Secondary Results Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Icon className="h-5 w-5 text-[category]-600" />
            Section Title
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Result items */}
        </CardContent>
      </Card>
    </div>
  </>
) : (
  <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
    <Icon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-slate-600 mb-2">
      Ready to Calculate
    </h3>
    <p className="text-slate-500">
      Results will appear here
    </p>
  </Card>
)}
```

#### Step 5.7: Educational Content Section
```typescript
<div className="mt-16 space-y-8">
  <Card className="border-2 rounded-2xl shadow-lg">
    <CardHeader className="bg-gradient-to-r from-[category]-50 to-[category2]-50 border-b">
      <CardTitle className="text-2xl">Understanding [Topic]</CardTitle>
    </CardHeader>
    <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
      <div>
        <h3 className="text-xl font-bold mb-3 text-slate-800">Section Heading</h3>
        <p>Natural, conversational content...</p>

        <h4 className="font-semibold text-lg mb-2 mt-4">Subsection</h4>
        <p>More detailed explanation...</p>
      </div>
    </CardContent>
  </Card>
</div>
```

#### Step 5.8: Footer
```typescript
<footer className="relative mt-20 border-t bg-white/80 backdrop-blur-md py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 mb-6">
      <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
        About Us
      </Link>
      {/* More links */}
    </div>
    <p className="text-center text-sm text-slate-500">
      © 2025 Calculator.Net. All rights reserved. Made with ❤️ for accuracy
    </p>
  </div>
</footer>
```

---

### Phase 6: Calculation Logic

#### Step 6.1: Input Parsing
```typescript
const calculate = () => {
  // Parse all inputs with fallback defaults
  const value1 = parseFloat(input1) || defaultValue1;
  const value2 = parseFloat(input2) || defaultValue2;

  // Validate inputs (if needed)
  if (value1 <= 0 || value2 <= 0) {
    // Handle invalid input
    return;
  }

  // Continue with calculation...
};
```

#### Step 6.2: Core Calculation
```typescript
// Main calculation logic
const result = /* formula based on inputs */;

// Additional calculations
const derived1 = /* calculation based on result */;
const derived2 = /* another calculation */;
```

#### Step 6.3: Set Results
```typescript
setResults({
  primaryResult: result,
  secondaryResult1: derived1,
  secondaryResult2: derived2,
  // ... other results
});

setHasCalculated(true);
```

#### Step 6.4: Generate Tables/Schedules (if applicable)
```typescript
// For calculators with amortization schedules, breakdowns, etc.
const schedule: ScheduleEntry[] = [];

for (let i = 0; i < periods; i++) {
  // Calculate values for this period
  schedule.push({
    period: i + 1,
    value1: calculated1,
    value2: calculated2,
    // ... other values
  });
}

setSchedule(schedule);
```

---

### Phase 7: Formatting & Display

#### Step 7.1: Create Formatting Functions
```typescript
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const formatNumber = (value: number, decimals: number = 2) => {
  return value.toFixed(decimals);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};
```

#### Step 7.2: Apply Formatting in JSX
```typescript
<span className="font-semibold">{formatCurrency(results.amount)}</span>
<span className="text-emerald-600">{formatPercentage(results.rate)}</span>
```

---

### Phase 8: Testing & Refinement

#### Step 8.1: Manual Testing Checklist
- [ ] Test with default values (auto-calculation on load)
- [ ] Test with minimum valid values
- [ ] Test with maximum valid values
- [ ] Test with edge cases (zero, negative, very large numbers)
- [ ] Test with invalid inputs
- [ ] Test all input field changes
- [ ] Verify all calculations are correct
- [ ] Check all formatted outputs display properly
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify tables/schedules display correctly
- [ ] Check all links work
- [ ] Review educational content for typos

#### Step 8.2: Cross-Reference with Source
- [ ] Compare calculation results with calculator.net
- [ ] Verify formula accuracy
- [ ] Check edge case handling
- [ ] Ensure all features are implemented

#### Step 8.3: Design Consistency Check
- [ ] Verify gradient colors match category
- [ ] Check spacing and padding consistency
- [ ] Ensure typography follows design system
- [ ] Verify hover effects work
- [ ] Check shadow and border styles
- [ ] Confirm icon usage is appropriate

---

### Phase 9: Integration

#### Step 9.1: Update Homepage Link
Ensure the calculator is properly linked from the homepage:
```typescript
// In app/page.tsx, verify the link exists:
{ name: "[Calculator Name]", href: "/[calculator-route]" }
```

#### Step 9.2: Test Navigation
- [ ] Click link from homepage
- [ ] Verify page loads correctly
- [ ] Click "Back to Home" button
- [ ] Verify returns to homepage

#### Step 9.3: Update Documentation
Add entry to calculator list in README or documentation

---

## Quick Reference Checklist

When creating a new calculator, check off each item:

### Setup
- [ ] Analyzed source calculator on calculator.net
- [ ] Created development plan with TodoWrite
- [ ] Defined TypeScript interfaces
- [ ] Created directory: `app/[calculator-name]/`

### Content
- [ ] Extracted educational content
- [ ] Rewrote content in natural, human style
- [ ] Organized content into logical sections
- [ ] Proofread for typos and clarity

### Structure
- [ ] Implemented page template
- [ ] Added header with back button
- [ ] Created page title section
- [ ] Built input form card
- [ ] Designed results display area
- [ ] Added educational content section
- [ ] Included footer

### Functionality
- [ ] Implemented input state management
- [ ] Wrote calculation logic
- [ ] Created formatting functions
- [ ] Added auto-calculate on page load
- [ ] Handled edge cases

### Design
- [ ] Applied category-appropriate gradient
- [ ] Used design system colors consistently
- [ ] Implemented hover effects
- [ ] Made layout responsive
- [ ] Added appropriate icons

### Testing
- [ ] Tested with various inputs
- [ ] Verified calculations against source
- [ ] Checked responsive design
- [ ] Tested navigation
- [ ] Reviewed for consistency

### Integration
- [ ] Linked from homepage
- [ ] Verified navigation works
- [ ] Updated documentation

---

## Calculator-Specific Considerations

### Financial Calculators
- Use currency formatting extensively
- Include time-based calculations (years, months)
- Consider amortization schedules or payment breakdowns
- Add date calculations for payoff dates
- Include percentage displays for rates

### Health & Fitness Calculators
- Include unit conversion options (lbs/kg, cm/inches)
- Add BMI categories or health ranges
- Consider before/after comparisons
- Include goal-setting features
- Add visual indicators (ranges, zones)

### Math Calculators
- Focus on precision and accuracy
- Include step-by-step explanations if complex
- Consider multiple output formats
- Add formula display
- Include related calculations

### Other Calculators
- Adapt to specific use case
- Consider unique visualization needs
- Include relevant units and conversions
- Add context-specific tips

---

## Common Patterns & Code Snippets

### Conditional Results Display
```typescript
{results && (
  <div className="space-y-4">
    {results.value > threshold && (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Warning message</p>
      </div>
    )}
  </div>
)}
```

### Toggle Show/Hide Sections
```typescript
const [showDetails, setShowDetails] = useState(false);

<Button onClick={() => setShowDetails(!showDetails)}>
  {showDetails ? 'Hide' : 'Show'} Details
</Button>

{showDetails && (
  <div>Detailed content...</div>
)}
```

### Input with Prefix/Suffix
```typescript
{/* Currency Input */}
<div className="relative">
  <span className="absolute left-3 top-3 text-slate-500">$</span>
  <Input className="pl-7" {...props} />
</div>

{/* Percentage Input */}
<div className="relative">
  <Input className="pr-7" {...props} />
  <span className="absolute right-3 top-3 text-slate-500">%</span>
</div>
```

### Tabbed Content
```typescript
const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly');

<div className="flex gap-2 mb-4">
  <Button
    variant={activeTab === 'monthly' ? 'default' : 'outline'}
    onClick={() => setActiveTab('monthly')}
  >
    Monthly
  </Button>
  <Button
    variant={activeTab === 'annual' ? 'default' : 'outline'}
    onClick={() => setActiveTab('annual')}
  >
    Annual
  </Button>
</div>

{activeTab === 'monthly' && <MonthlyView />}
{activeTab === 'annual' && <AnnualView />}
```

---

## Tips for Success

1. **Start with defaults that work** - Choose realistic, interesting default values
2. **Calculate on page load** - Users should see results immediately
3. **Keep formulas accurate** - Cross-reference with source calculator
4. **Write naturally** - Educational content should sound human
5. **Follow the design system** - Consistency across all calculators
6. **Test thoroughly** - Try edge cases and unusual inputs
7. **Mobile-first** - Ensure responsive design works on all devices
8. **Add helpful context** - Explain what numbers mean
9. **Use appropriate icons** - Select Lucide icons that match the concept
10. **Keep code clean** - Comment complex calculations, use clear variable names

---

## Example Calculators to Reference

- **Mortgage Calculator** (`app/mortgage/page.tsx`) - Complex calculation with amortization schedule
- Use as template for other financial calculators with payment schedules

---

## Common Issues & Solutions

### Gradient Text Clipping Issue
**Problem:** Descenders (g, y, p, q, j) in gradient text get cut off at the bottom.

**Cause:** The `bg-clip-text` property combined with tight line-height causes clipping.

**Solution:** Add `leading-normal pb-1` (or `pb-2` for larger text) to h1 elements with gradient text:
```typescript
<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
  Mortgage Calculator
</h1>
```

### Auto-Calculate on Page Load
**Implementation:** Always calculate with default values when page loads for better UX:
```typescript
const [hasCalculated, setHasCalculated] = useState(false);

useEffect(() => {
  if (!hasCalculated) {
    calculate();
  }
}, []);

const calculate = () => {
  // ... calculation logic
  setHasCalculated(true);
};
```

This ensures:
- Users see immediate results
- Page doesn't look empty
- Calculator capabilities are demonstrated
- Better engagement and conversion

### Default Values Selection
Choose defaults that:
- Represent realistic, common scenarios
- Use round, memorable numbers (e.g., $1,000,000 vs $987,654)
- Show meaningful results that demonstrate value
- Are appropriate for the target audience
- Result in interesting calculations

**Example:** Mortgage calculator uses $1M home, 25 years, 6.5% rate - realistic for many markets and produces clear, demonstrable results.

---

## SEO Optimization & AdSense Compliance

### Phase 10: SEO Implementation

Every calculator page must be optimized for search engines and compliant with Google AdSense policies.

#### Step 10.1: Add Metadata
Add proper metadata to each calculator page for SEO:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[Calculator Name] - Free Online Calculator | Calculator.Net',
  description: '[Compelling 150-160 character description including primary keyword and value proposition]',
  keywords: '[calculator-type], [calculator-name], online calculator, free calculator, [related-terms]',
  openGraph: {
    title: '[Calculator Name] - Calculator.Net',
    description: '[Same as meta description]',
    type: 'website',
    url: 'https://calculator.net/[calculator-route]',
    images: [
      {
        url: '/og-image-[calculator].png',
        width: 1200,
        height: 630,
        alt: '[Calculator Name] Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Calculator Name] - Calculator.Net',
    description: '[Same as meta description]',
    images: ['/og-image-[calculator].png']
  },
  alternates: {
    canonical: 'https://calculator.net/[calculator-route]'
  }
};
```

**SEO Best Practices for Metadata:**
- **Title**: 50-60 characters, include main keyword
- **Description**: 150-160 characters, compelling call-to-action
- **Keywords**: 5-10 relevant terms (less important but still useful)
- **URL Structure**: Use clean, descriptive slugs (e.g., `/mortgage-calculator`)

#### Step 10.2: Structured Data (Schema.org)
Add JSON-LD structured data for rich snippets:

```typescript
export default function CalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "[Calculator Name]",
    "applicationCategory": "FinanceApplication", // Or HealthApplication, EducationalApplication
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "[Full description of what the calculator does]",
    "url": "https://calculator.net/[calculator-route]",
    "screenshot": "https://calculator.net/screenshot-[calculator].png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Rest of component */}
    </>
  );
}
```

#### Step 10.3: Semantic HTML Structure
Use proper heading hierarchy and semantic elements:

```typescript
// ✅ Correct heading hierarchy
<h1>Mortgage Calculator</h1>              {/* One H1 per page */}
  <h2>Understanding Mortgages</h2>          {/* Main sections */}
    <h3>What is a Mortgage?</h3>            {/* Subsections */}
    <h3>Types of Mortgages</h3>
      <h4>Fixed-Rate Mortgages</h4>         {/* Sub-subsections */}
      <h4>Adjustable-Rate Mortgages</h4>

// Use semantic HTML5 elements
<main>                    {/* Main content */}
<article>                 {/* Educational content */}
<section>                 {/* Distinct sections */}
<aside>                   {/* Sidebar content */}
<nav>                     {/* Navigation */}
```

#### Step 10.4: Content Optimization

**Content Requirements for SEO & AdSense:**
- [ ] **Minimum 1,500 words** of unique, valuable content
- [ ] **Primary keyword** in H1, first paragraph, and naturally throughout
- [ ] **Secondary keywords** distributed naturally
- [ ] **Internal links** to related calculators (3-5 minimum)
- [ ] **External links** to authoritative sources (2-3 for credibility)
- [ ] **Clear content structure** with headings, paragraphs, lists
- [ ] **Mobile-friendly** and responsive design
- [ ] **Fast loading** (Core Web Vitals optimization)

**Content Structure Template:**
```
H1: [Calculator Name]
- Brief intro paragraph (100-150 words)

H2: How to Use the Calculator
- Step-by-step guide

H2: Understanding [Topic]
- Main educational content (500+ words)
  H3: Key Concept 1
  H3: Key Concept 2
  H3: Key Concept 3

H2: [Topic] Examples
- Practical examples and use cases

H2: Common Questions
- FAQ section (5-10 questions)

H2: Related Calculators
- Links to similar tools

H2: Additional Resources
- External authoritative links
```

#### Step 10.5: Internal Linking Strategy

Add contextual internal links in educational content:

```typescript
<p>
  Before using this calculator, you might want to check your{' '}
  <Link href="/affordability-calculator" className="text-blue-600 hover:underline">
    home affordability
  </Link>{' '}
  to understand your budget. Additionally, consider using our{' '}
  <Link href="/loan-calculator" className="text-blue-600 hover:underline">
    loan calculator
  </Link>{' '}
  for comparison.
</p>
```

**Internal Linking Best Practices:**
- Link to 3-5 related calculators
- Use descriptive anchor text (not "click here")
- Link from contextually relevant content
- Create a "Related Calculators" section at the bottom

#### Step 10.6: Image Optimization

All images must be optimized for SEO:

```typescript
import Image from 'next/image';

<Image
  src="/images/mortgage-calculator-example.png"
  alt="Mortgage calculator showing monthly payment breakdown for a $1M home loan"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

**Image SEO Checklist:**
- [ ] Descriptive filenames (mortgage-calculator-breakdown.png, not img123.png)
- [ ] Comprehensive alt text describing the image
- [ ] Properly sized (no oversized images)
- [ ] Modern formats (WebP when possible)
- [ ] Lazy loading for below-the-fold images
- [ ] Compressed without quality loss

#### Step 10.7: FAQ Section (Schema)

Add an FAQ section with structured data for rich snippets:

```typescript
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is a monthly mortgage payment calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly mortgage payments are calculated using the loan amount, interest rate, and loan term through an amortization formula. The payment includes principal and interest..."
      }
    },
    // ... more questions
  ]
};

// In component
<section>
  <h2>Frequently Asked Questions</h2>
  <div className="space-y-6">
    {faqs.map(faq => (
      <div key={faq.id}>
        <h3 className="font-semibold text-lg">{faq.question}</h3>
        <p className="text-slate-600 mt-2">{faq.answer}</p>
      </div>
    ))}
  </div>
</section>
```

---

## Google AdSense Compliance

### Content Policy Requirements

**Required for AdSense Approval:**

1. **Substantial Content**
   - [ ] Each page has 1,500+ words of unique content
   - [ ] Content provides genuine value to users
   - [ ] No duplicate content from other sites
   - [ ] Original educational material

2. **Navigation & User Experience**
   - [ ] Clear site navigation (header, footer)
   - [ ] Logical site structure
   - [ ] Functional calculators (no broken features)
   - [ ] Mobile-responsive design
   - [ ] Fast page load times

3. **Required Pages**
   - [ ] About Us page
   - [ ] Contact Us page
   - [ ] Privacy Policy page
   - [ ] Terms of Service page
   - [ ] Cookie Policy (GDPR compliance)

4. **Content Guidelines**
   - [ ] No prohibited content (adult, violent, deceptive)
   - [ ] No copyright infringement
   - [ ] Accurate, factual information
   - [ ] Professional presentation
   - [ ] Proper grammar and spelling

5. **Technical Requirements**
   - [ ] Custom domain (not subdomain)
   - [ ] HTTPS enabled
   - [ ] No intrusive ads or popups (before approval)
   - [ ] Accessible to Googlebot (no blocking in robots.txt)

### Creating Required Pages

#### Privacy Policy Page
Create `app/privacy/page.tsx`:

```typescript
export const metadata = {
  title: 'Privacy Policy - Calculator.Net',
  description: 'Privacy policy for Calculator.Net'
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-6">
          Last Updated: [Date]
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us...</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to...</p>

        <h2>Cookies and Tracking</h2>
        <p>We use cookies and similar tracking technologies...</p>

        <h2>Third-Party Advertising</h2>
        <p>
          We use Google AdSense to display advertisements. Google uses cookies
          to serve ads based on your prior visits to our website or other websites.
          You may opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads">Ads Settings</a>.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your information...</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at...</p>
      </div>
    </div>
  );
}
```

#### Terms of Service Page
Create `app/terms/page.tsx` with comprehensive terms.

#### About Us Page
Create `app/about/page.tsx` describing your site's mission.

#### Contact Page
Create `app/contact/page.tsx` with a contact form or email.

### robots.txt Configuration

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://calculator.net/sitemap.xml
```

### Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    'mortgage',
    'bmi',
    'loan',
    'percentage',
    // ... all calculator routes
  ];

  const calculatorUrls = calculators.map(calc => ({
    url: `https://calculator.net/${calc}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://calculator.net',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...calculatorUrls,
    {
      url: 'https://calculator.net/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://calculator.net/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://calculator.net/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
```

### Performance Optimization (Core Web Vitals)

**For AdSense and SEO:**

1. **Optimize Images**
   - Use Next.js Image component
   - Serve WebP format
   - Lazy load below-fold images

2. **Minimize JavaScript**
   - Use dynamic imports for heavy components
   - Remove unused dependencies

3. **Enable Caching**
   - Configure proper cache headers
   - Use CDN (Vercel Edge Network)

4. **Reduce Layout Shift**
   - Define image dimensions
   - Reserve space for ads
   - Avoid injected content

### AdSense Integration Checklist

**Before Applying:**
- [ ] Site has 20+ pages of unique content
- [ ] Each calculator page has 1,500+ words
- [ ] All required pages created (Privacy, Terms, About, Contact)
- [ ] Site is 3-6 months old (recommended)
- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Mobile-responsive
- [ ] No broken links or errors
- [ ] Professional design
- [ ] Clear navigation
- [ ] Fast loading speed (< 3 seconds)

**After Applying:**
- [ ] Place AdSense code in `app/layout.tsx`
- [ ] Create ad slots in appropriate locations
- [ ] Test ads don't interfere with functionality
- [ ] Comply with ad placement policies
- [ ] Monitor for policy violations
- [ ] Track performance in AdSense dashboard

### Ad Placement Best Practices

```typescript
// Example ad component
export function AdUnit({ slot, format = 'auto' }: { slot: string; format?: string }) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('Ad error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
```

**Recommended Ad Placements:**
- Above the fold (after title, before calculator)
- Below calculator results
- Within educational content (after 2-3 paragraphs)
- Sidebar (if layout permits)
- Bottom of page

**Avoid:**
- Ads that push content below fold
- Ads near buttons or interactive elements
- Too many ads (1 ad per screen height max)
- Ads that interfere with calculator functionality

---

## SEO Checklist Per Calculator

Use this checklist when creating each calculator:

### Technical SEO
- [ ] Unique meta title (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] Canonical URL set
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] JSON-LD structured data added
- [ ] Proper heading hierarchy (one H1, logical H2-H4)
- [ ] Semantic HTML elements used
- [ ] Mobile-responsive verified
- [ ] Page speed optimized (< 3s load time)
- [ ] Images optimized with alt text
- [ ] Internal links to 3-5 related calculators
- [ ] No broken links or 404 errors

### Content SEO
- [ ] 1,500+ words of unique content
- [ ] Primary keyword in H1
- [ ] Primary keyword in first paragraph
- [ ] Keywords distributed naturally (avoid stuffing)
- [ ] Content provides genuine value
- [ ] Clear, logical content structure
- [ ] FAQ section added
- [ ] Examples and use cases included
- [ ] External links to authoritative sources (2-3)
- [ ] Content written in natural, human style
- [ ] No duplicate content from other sites
- [ ] Proper grammar and spelling

### AdSense Compliance
- [ ] Content meets minimum word count
- [ ] No prohibited content
- [ ] Professional presentation
- [ ] Clear navigation
- [ ] All required pages linked in footer
- [ ] Privacy policy mentions AdSense/cookies
- [ ] Mobile-friendly design
- [ ] Fast loading performance
- [ ] No intrusive elements
- [ ] Functional calculator (no errors)

---

## Version History

- **v1.2** - Added comprehensive SEO optimization and Google AdSense compliance section
- **v1.1** - Added common issues section (gradient text fix, auto-calculate pattern)
- **v1.0** - Initial template created based on Mortgage Calculator development
- Template established with Mortgage Calculator as reference implementation

---

**Last Updated:** January 2025
**Template Version:** 1.2
