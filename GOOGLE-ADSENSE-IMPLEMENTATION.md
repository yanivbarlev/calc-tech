# Google AdSense Implementation Guide for Next.js App Router

## Lesson Learned: Proper AdSense Integration in Next.js 15+

### Overview
Implementing Google AdSense in Next.js App Router (v15+) requires a specific approach that differs from traditional HTML implementation.

### Three Required Components

#### 1. Meta Tag for Site Verification (REQUIRED)
Add the `google-adsense-account` meta tag to your metadata export in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your description",
  other: {
    "google-adsense-account": "ca-pub-XXXXXXXXXX",
  },
};
```

**Why this works:**
- Next.js App Router uses the `metadata` API to manage head tags
- The `other` key allows custom meta tags
- This automatically places the meta tag in the `<head>` section

#### 2. AdSense Script
Add the AdSense script using Next.js Script component in `app/layout.tsx`:

```typescript
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
```

**Key Points:**
- Use `strategy="beforeInteractive"` to load the script in the head before page becomes interactive
- DO NOT manually add a `<head>` tag in App Router - Next.js handles this automatically
- The Script component will automatically inject the script in the proper location

#### 3. ads.txt File
Create `public/ads.txt` with your publisher information:

```
google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

**Why this is needed:**
- Required by Google AdSense for publisher verification
- Prevents unauthorized ad inventory sales
- Accessible at `https://yourdomain.com/ads.txt`

### Common Mistakes to Avoid

❌ **DO NOT** manually add a `<head>` tag in `layout.tsx`:
```typescript
// WRONG - This breaks Next.js App Router
<html lang="en">
  <head>
    <Script src="..." />
  </head>
  <body>{children}</body>
</html>
```

❌ **DO NOT** use `strategy="afterInteractive"` for the initial setup:
- Use `beforeInteractive` for verification to ensure the script loads in the head

❌ **DO NOT** skip the meta tag:
- The meta tag is the easiest verification method for Next.js apps

### Verification Process

1. Deploy your changes to production (Vercel, etc.)
2. Wait 1-2 minutes for deployment to complete
3. Verify the implementation:
   - Visit `https://yourdomain.com` and view page source
   - Check that the meta tag appears in `<head>`:
     ```html
     <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX">
     ```
   - Check that the AdSense script is present
   - Verify `https://yourdomain.com/ads.txt` is accessible
4. Return to Google AdSense and click "Verify"
5. Wait for Google to crawl (can take minutes to 48 hours)

### File Structure

```
your-nextjs-app/
├── app/
│   └── layout.tsx           # Contains metadata and Script component
├── public/
│   └── ads.txt             # Publisher verification file
└── README.md
```

### Implementation Checklist

- [ ] Added `google-adsense-account` meta tag to metadata export
- [ ] Added AdSense Script component with `beforeInteractive` strategy
- [ ] Created `public/ads.txt` file with correct publisher info
- [ ] Deployed to production
- [ ] Verified meta tag appears in page source
- [ ] Verified ads.txt is accessible at root domain
- [ ] Requested verification in Google AdSense dashboard

### Troubleshooting

**Problem:** "Couldn't verify your site"
- **Solution:** Ensure you're using the meta tag in the `metadata` export, not a manual `<head>` tag
- Wait for deployment and verify the meta tag appears in production page source

**Problem:** ads.txt not found
- **Solution:** Ensure the file is in the `public/` folder and accessible at `https://yourdomain.com/ads.txt`

**Problem:** Script not loading
- **Solution:** Use `strategy="beforeInteractive"` and place Script in the body, not in a manual head tag

### References

- [Google AdSense Help: Add a new site](https://support.google.com/adsense/answer/12169212)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

---

**Last Updated:** 2025-11-11
**Next.js Version:** 15+
**Publisher ID:** ca-pub-2201920716197483
