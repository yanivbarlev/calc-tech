# GOTCHAS — calc-tech.com

Detailed issue log. Add newest entries on top.

---

## 2026-06-03 — THE REAL ROOT CAUSE: `X-Robots-Tag: noindex` HTTP header from a non-Production Vercel deployment

**This is the actual reason nothing indexed — supersedes the "stale noindex meta tag" theory below.**

**Symptom:** After weeks of fixes (removing `<meta robots>` noindex, adding unique per-page metadata, flipping the domain, resubmitting the sitemap), `Indexed` was still **0** and showed zero movement. Felt like there was a hidden blocker. There was.

**How it was found (2026-06-03):** GSC → URL Inspection on `https://calc-tech.com/` → the *last crawl* (May 16) detail showed:
- Crawl allowed? **Yes** · Page fetch **Successful**
- **Indexing allowed? → No: 'noindex' detected in 'X-Robots-Tag' http header**
- Page indexing: **Excluded by 'noindex' tag**

**Root cause:** The `noindex` was being sent as an **HTTP response header (`X-Robots-Tag: noindex`)**, NOT as an HTML meta tag. **An HTTP-header noindex overrides everything in the HTML** — which is exactly why all the `<meta robots>`/metadata work changed nothing; Google read the header and ignored the HTML. The header is **not in the repo** (confirmed: `git log --all -S "X-Robots-Tag"` returns nothing, ever). It was injected by the **Vercel platform**, which automatically stamps `X-Robots-Tag: noindex` on any deployment that is **not connected to the Production environment**. Before the 2026-05-29 domain flip, the apex `calc-tech.com` was served by a non-Production deployment → every page got the noindex header.

**What actually fixed it:** the **2026-05-29 Vercel domain flip** (apex `calc-tech.com` → "Connect to environment: Production"). That stopped Vercel sending the header. The meta-tag edits were good housekeeping but were never the blocker.

**Verified fixed (2026-06-03):**
- Live header gone site-wide: same-origin `fetch()` on `/`, `/mortgage`, `/bmi`, `/loan` → all `200`, `x-robots-tag` = **NONE**.
- GSC **TEST LIVE URL** on homepage → **"URL is available to Google" / "Page can be indexed."**
- Manual Actions: **No issues**. Security Issues: **No issues**.
- Requested indexing for the homepage from the clean live result.

**Durable safeguard added:** explicit `X-Robots-Tag: index, follow` header for `/(.*)` in `vercel.json`. On Production it's a clean "index me" signal; on preview deployments Vercel's own noindex still wins (restrictive header takes precedence), so previews stay out of the index. If the Production environment assignment ever regresses, this keeps the live site indexable.

**Why GSC still shows old noindex counts:** the "Google Index" tab is the *last-crawl* verdict (homepage last crawled May 16, pre-fix). It clears only on recrawl. The remaining wait is recrawl time, not a code/config problem.

**Lesson:** when GSC says "Excluded by noindex" but the HTML has no noindex, **check the HTTP response headers** (`X-Robots-Tag`), and on Vercel **check that the custom domain is connected to the Production environment** — a non-prod deployment auto-noindexes the whole site.

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
