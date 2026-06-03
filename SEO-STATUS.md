# SEO Status — calc-tech.com (ongoing project)

> **This is the living source of truth for the Google indexing / SEO effort.**
> Read it before doing any SEO work, and **update it at the end of any session that touches SEO/indexing** (add a dated entry to the Changelog and refresh the "Current status" snapshot).
> Detailed one-off issue write-up lives in [`GOTCHAS.md`](./GOTCHAS.md).

---

## Goal

Get calc-tech.com's pages **crawled and indexed by Google**, then ranking, for its ~120 calculator/tool pages. The site is the hosted Next.js app (see [`CLAUDE.md`](./CLAUDE.md)); this project is specifically about search discoverability.

## Current status — as of 2026-06-03

**Indexed: 0 — but the REAL blocker was finally found and fixed.** The whole site was being served an **`X-Robots-Tag: noindex` HTTP header** (injected by Vercel because the apex domain was on a *non-Production* deployment). An HTTP-header noindex overrides the HTML, so every meta-tag fix we'd made was invisible to Google. The header is **gone now** (verified live + GSC live test = "Page can be indexed"). What remains is purely **recrawl time** — Google last crawled the homepage 2026-05-16 (pre-fix) and caches that verdict until it recrawls. See the 2026-06-03 root-cause entry in [`GOTCHAS.md`](./GOTCHAS.md). **This supersedes the earlier "young domain / authority" framing as the primary cause.**

### Earlier snapshot — as of 2026-06-01

**Indexed: 0.** Not blocked technically — Google has *started* re-crawling and we're waiting for it to index. Early movement is positive.

Google Search Console (property: **`sc-domain:calc-tech.com`**, a Domain property covering apex + www + http/https):

| Bucket | 2026-05-29 (baseline, pre-fix) | 2026-06-01 |
|---|---|---|
| **Indexed** | 0 | 0 |
| Discovered – currently not indexed | 216 (*Not Started*) | **102 (*Started*)** |
| Excluded by 'noindex' tag | 54 (*Failed*) | 54 (*Failed*) — **stale**, see notes |
| Redirect error | — | 2 (*Not Started*) — **new, monitor** |
| Not found (404) | 1 | 1 |
| **Total not indexed** | **271** | **159** |

**Read of the trend:** "Discovered – not indexed" fell 216 → 102 and changed to **Started** = Googlebot is actively working through the queue (the indexing requests + recrawl are taking effect). `Indexed` still 0 because indexing lags crawling by days–weeks for a young, low-authority domain. This is the expected shape of early progress.

## Why this happened (root-cause diagnosis)

**Primary cause (found 2026-06-03): `X-Robots-Tag: noindex` HTTP *header*.** Vercel auto-stamps this header on any deployment **not connected to the Production environment**. The apex `calc-tech.com` was on a non-Production deployment, so every page was served a header-level `noindex` — which **overrides the HTML**, making all the `<meta robots>`/metadata work invisible to Google. Not in the repo (it's a platform behavior). **Fixed by the 2026-05-29 domain flip** (apex → Production). Verified gone 2026-06-03 (live header = NONE; GSC live test = "Page can be indexed"). Full detail in [`GOTCHAS.md`](./GOTCHAS.md). The four items below were real but secondary; #1 below describes the *meta-tag* noindex, a separate, lesser issue.

1. **Stale `noindex` meta tag (secondary).** Earlier deploys also served an HTML `noindex` meta tag. Google crawled the homepage 2026-05-16, recorded "excluded by noindex," and hadn't re-crawled since. The live code was already fixed before this project; GSC was showing the *last-crawl* verdict, not live state. (GSC "Google Index" tab = last crawl; "TEST LIVE URL" = current truth.)
2. **Duplicate `<title>` across 100+ pages.** Calculator pages are `"use client"` components, which **cannot export `metadata`**, so they all inherited the root layout's generic title. Identical titles read as low-value/duplicate → Google parks pages in "Discovered" without crawling.
3. **apex ⇄ www mismatch.** `calc-tech.com` did a **307 (temporary)** redirect to `www.calc-tech.com`, while the sitemap + all metadata pointed at the non-www apex — so every submitted URL was a redirect. (Configured in the **Vercel dashboard → Settings → Domains**, NOT in code.)
4. **Young, no-authority domain.** Registered **2025-11-11** (~6 months old) with almost no backlinks, in the brutally saturated "calculator" niche. Google crawls such domains conservatively regardless of technical health. **This is now the main remaining bottleneck.**

## What's been done (changelog)

### 2026-05-29 — initial fix pass
- **Removed `noindex` from all 7 extension uninstall/thank-you layouts** → every page indexable. (Also auto-adds them to the sitemap: `app/sitemap.ts` skips folders whose layout has `index:false`.) — commit `99587d5`
- **Added `metadataBase`** to `app/layout.tsx` (canonical = apex). — `99587d5`
- **Added unique `title`/`description`/`keywords`/OG/Twitter/canonical** via a per-route `layout.tsx` to **58 top-level pages** that lacked one (20 already had them; total ~78 covered). — commit `9a38f13`
- **GSC:** requested indexing for homepage, `/mortgage`, `/bmi` (priority crawl queue); **resubmitted sitemap** (`https://calc-tech.com/sitemap.xml`, status **Success**, ~108 pages).
- Documented in `GOTCHAS.md`. — commits `40d0a88`, `d9dbcc1`
- **Vercel domain flip (done via dashboard):** `calc-tech.com` → "Connect to environment: Production" (served directly); `www.calc-tech.com` → "Redirect to Another Domain: calc-tech.com" with **308 Permanent Redirect**. Verified `www.calc-tech.com/loan` → 308 → `calc-tech.com/loan`.

### 2026-06-01
- Confirmed early progress in GSC (Discovered 216→102, now "Started"). Created this status doc; referenced it from `CLAUDE.md`.

### 2026-06-03 — found & verified the REAL root cause
- **Diagnosed the `X-Robots-Tag: noindex` HTTP header** as the true site-wide blocker (GSC URL Inspection on homepage: "Indexing allowed? No — 'noindex' detected in X-Robots-Tag http header"). Confirmed it was a Vercel non-Production-deployment behavior, not in our code (`git log --all -S "X-Robots-Tag"` = empty).
- **Verified it's fixed:** live `fetch()` on `/`, `/mortgage`, `/bmi`, `/loan` → all 200 + `x-robots-tag` NONE; GSC TEST LIVE URL on homepage → "URL is available to Google / Page can be indexed."
- Checked **Manual Actions** and **Security Issues** → both "No issues detected" (no penalty; rules out the re-registered-domain-penalty theory).
- **Requested indexing** for the homepage from the clean live result.
- **Added durable safeguard:** explicit `X-Robots-Tag: index, follow` for `/(.*)` in `vercel.json` — commit `a52acaf`, deployed and **verified live** (`/` and `/mortgage` return `X-Robots-Tag: index, follow`).
- Confirmed live `robots.txt` (allows all) and `sitemap.xml` (170 apex URLs) are correct.
- **Noted:** the GitHub repo has a *second*, abandoned Vercel project `calculator-net-clone` (its builds are failing). It does not serve calc-tech.com (the `calc-tech` project does), but it's worth deleting in Vercel to avoid confusion / accidental domain reattachment. The original noindex likely traces to the apex being served by a non-Production deployment before the 2026-05-29 flip.

## Key facts & access

- **GSC property:** `sc-domain:calc-tech.com` (logged in as the Vercel/Google account in Chrome). Indexing report: `https://search.google.com/search-console/index?resource_id=sc-domain%3Acalc-tech.com`
- **Canonical host:** apex `https://calc-tech.com` (www 308-redirects to it).
- **Sitemap:** generated by `app/sitemap.ts` at build time → `https://calc-tech.com/sitemap.xml`. Excludes `api`, `components`, `extensions` (walked separately), `chat`, `random-chat`, `site-map`, and any folder whose `layout.tsx` has `index:false`.
- **Domain registered:** 2025-11-11 (young).
- **Redirect config location:** Vercel dashboard → project `calc-tech` → Settings → Domains. NOT in `vercel.json`/`next.config.ts`/`middleware.ts`.
- **Per-page metadata pattern:** server `layout.tsx` next to the client `page.tsx`. Example: `app/income-tax/layout.tsx`.
- **Local build caveat:** `npm run build` fails at prerender with `@clerk/clerk-react: Missing publishableKey` (env var absent locally). Expected — Vercel has the key. Look for `✓ Compiled successfully` to confirm code validity.
- **Rate-limit note:** hammering the live site with curl/PowerShell (many requests fast) trips Vercel bot protection → 403 for non-browser clients. Real browsers and Googlebot are unaffected. Verify live pages via the Chrome browser, not bulk scripts.

## What to expect

- **Days to ~2 weeks:** the 3 indexing-requested pages (homepage, mortgage, bmi) get re-crawled; stale "noindex"/"Discovered" verdicts clear; `Indexed` should rise above 0.
- **"Excluded by noindex: 54"** is **stale crawl data** (live pages have NO noindex except intentionally none now). It should shrink as Google recrawls. If it does NOT shrink over 2–3 weeks, re-investigate which exact URLs (GSC → click the reason → inspect a sample → TEST LIVE URL).
- **"Redirect error: 2"** appeared after the 2026-05-29 www→apex flip — likely transient as Google re-processes the redirect. Monitor; if it persists, inspect the 2 URLs.
- **The ~100 deep "Discovered" pages** are now technically ready; whether/when they index depends mostly on **authority (backlinks)** and time.

## Open items & next levers (priority order)

1. **Build backlinks / authority — highest leverage.** A young domain with ~0 backlinks gets low crawl priority no matter how clean the code. Even 5–10 real links (relevant directories, forum/Reddit mentions, guest posts, the user's other web properties) materially change crawl demand. *This is the single most important next action and only the user can drive it.*
2. **Monitor GSC weekly** (see checklist below). Watch `Indexed` rise, `Discovered` fall, and the stale `noindex 54` + `redirect error 2` clear.
3. **Remove the two broken 2016 "ghost" sitemaps** in GSC (`http://www.calc-tech.com/sitemap_index.xml`, `http://calc-tech.com/sitemap_index.xml`) — leftovers from the domain's prior life, both erroring with 0 pages. (Deletion in GSC; have the user confirm/do it.)
4. **Content differentiation (medium-term).** The calculator pages use generic explainer copy that exists on hundreds of sites. To rank (not just index) in a saturated niche, add genuinely unique value (unique data, better UX, richer FAQs targeting long-tail queries).
5. **More indexing requests** once the deploy/redirect settle — GSC caps ~10–12 URL requests/day; prioritize top money pages.

## Resume-here checklist (next session)

1. Open `https://search.google.com/search-console/index?resource_id=sc-domain%3Acalc-tech.com` in Chrome (account already logged in) and read the bucket counts.
2. Compare against the "Current status" table above; **add a new dated row** and a Changelog entry.
3. URL-inspect the 3 requested pages (homepage, `/mortgage`, `/bmi`): are they "Indexed" yet, still "Discovered/Crawled – not indexed"?
4. Check whether `Excluded by noindex (54)` and `Redirect error (2)` are shrinking. If stuck after ~2–3 weeks, drill into specific URLs.
5. If `Indexed` is still 0 after ~3 weeks with crawling active → the blocker is authority. Push lever #1 (backlinks), not more code.
6. Update this file before ending the session.
