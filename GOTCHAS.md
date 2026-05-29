# GOTCHAS — calc-tech.com

Detailed issue log. Add newest entries on top.

---

## 2026-05-29 — Site not indexed by Google ("Discovered – currently not indexed", Indexed: 0)

**Symptom:** Google Search Console showed `Indexed: 0`, `Not indexed: 271`. Even the homepage was excluded. GSC buckets: 216 "Discovered – currently not indexed", 54 "Excluded by 'noindex' tag" (Failed validation), 1 "Not found (404)".

**Root causes (three stacked problems):**

1. **Stale `noindex` on the homepage.** An earlier deploy served `noindex`; Google crawled the homepage on 5/16 and recorded "excluded by noindex," and hadn't re-crawled since. The live code was already fixed, but GSC's "Google Index" tab shows the *last crawl*, not live state. Confirmed fix via GSC URL Inspection → **TEST LIVE URL** → "Page can be indexed."

2. **apex ⇄ www mismatch.** `calc-tech.com` did a **307 (temporary)** redirect to `www.calc-tech.com`, but the sitemap + all metadata point at the non-www apex, so every submitted URL was a redirect. This redirect is configured in the **Vercel dashboard → Settings → Domains** (NOT in code — `vercel.json`/`next.config.ts`/`middleware.ts` have no redirects). **FIXED 2026-05-29:** in Vercel set `calc-tech.com` → "Connect to environment: Production" (served directly) and `www.calc-tech.com` → "Redirect to Another Domain: calc-tech.com" with **308 Permanent Redirect**. Verified: `www.calc-tech.com/loan` → 308 → `calc-tech.com/loan`. Canonical = apex (non-www).

3. **Duplicate `<title>` across 100+ pages.** Calculator pages are `"use client"` components, which **cannot export `metadata`**. They all inherited the root layout's generic title ("Calc-Tech: 200+ Free Online Calculators…"). Duplicate titles are a low-value signal feeding "Discovered – not indexed." Fix: a per-route `app/<slug>/layout.tsx` (server component) exporting unique `metadata`. See existing pattern in e.g. `app/income-tax/layout.tsx`.

**Fixes applied (commits 99587d5, 9a38f13):**
- Removed `index:false` from 7 extension uninstall/thank-you layouts → every page indexable (also auto-adds them to the auto-generated sitemap, since `app/sitemap.ts` skips folders whose layout has `index:false`).
- Added `metadataBase` to root layout.
- Added unique title/description/keywords/OG/twitter/canonical via `layout.tsx` to all 58 top-level pages that lacked one.
- GSC: requested indexing for homepage, /mortgage, /bmi; resubmitted sitemap (Success, ~108 pages).

**Still open / next levers:** build backlinks/authority (young domain, registered 2025-11-11) — this is now the main lever for getting the deep "Discovered" pages crawled; optionally remove the two broken 2016 ghost sitemaps (`http://...sitemap_index.xml`) in GSC.

**Note:** local `npm run build` fails at prerender with `@clerk/clerk-react: Missing publishableKey` because the Clerk env var isn't set locally. This is expected — Vercel has the key, so deploys succeed. Look for `✓ Compiled successfully` to confirm code is valid.
