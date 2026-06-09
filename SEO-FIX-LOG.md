# SEO / Google Indexing Fix — Full Resolution Log

> **Purpose:** a complete, chronological record of the calc-tech.com "Google won't index my pages" problem and **every step taken to resolve it**, across all working sessions. Written so that anyone reading *only this file* can understand the whole story: what was wrong, what we tried, what actually fixed it, and how we verified it.
>
> Companion docs: [`SEO-STATUS.md`](./SEO-STATUS.md) (living status snapshot — update it each SEO session) and [`GOTCHAS.md`](./GOTCHAS.md) (issue log). This file is the **narrative history**; those are the quick-reference.

---

## TL;DR (read this first)

- **Symptom:** For weeks, Google Search Console showed **Indexed: 0**. Even the homepage wouldn't index, despite many fixes. It felt like a hidden blocker — and there was one.
- **The real root cause (found 2026-06-03):** every page was served an **`X-Robots-Tag: noindex` HTTP response header**. That is a "do not index" instruction at the *header* level, which **overrides anything in the HTML**. So all our work on HTML `<meta robots>` tags and page metadata was invisible to Google — it read the header and stopped.
- **Where the header came from:** **not our code** (it appears in zero commits, ever). **Vercel injects `X-Robots-Tag: noindex` automatically on any deployment that is NOT connected to the "Production" environment.** Our apex domain `calc-tech.com` was being served by a non-Production deployment.
- **What actually fixed it:** the **2026-05-29 Vercel domain flip** — pointing `calc-tech.com` at the **Production** environment. That stopped the header. (The earlier meta-tag/metadata work was good housekeeping but was never the blocker.)
- **Status now:** header is gone (verified live + via GSC live test = "Page can be indexed"); no penalty; safeguard header added; indexing requested; sitemap clean. The remaining wait is **Google's re-crawl time**, not a technical defect.

---

## The problem, in plain language

calc-tech.com is a Next.js app on Vercel hosting ~120 calculator/tool pages. We wanted Google to crawl and index them. Instead, Search Console (property `sc-domain:calc-tech.com`, a Domain property covering apex + www + http/https) showed **0 indexed pages** and a large "not indexed" pile, with the homepage itself excluded. Multiple rounds of fixes produced no movement, which is what finally pointed to a single, overriding blocker rather than a collection of small issues.

**Key concept — two kinds of "noindex":**
1. **HTML meta tag:** `<meta name="robots" content="noindex">` inside the page's HTML.
2. **HTTP response header:** `X-Robots-Tag: noindex`, sent by the *server* alongside the page, before the HTML.

When both exist (or only the header exists), **the header wins**. We spent weeks fixing #1 while #2 was the actual problem — and #2 is invisible if you only look at the page source in a browser; you have to inspect the HTTP headers (or read Google's own verdict in GSC URL Inspection).

---

## Root cause (the definitive diagnosis)

Found via **GSC → URL Inspection → homepage → last-crawl details**, which stated verbatim:

> **Indexing allowed? → No: 'noindex' detected in 'X-Robots-Tag' http header**
> (with Crawl allowed? **Yes**, Page fetch **Successful**)

So Google could reach and fetch the page fine — it was *explicitly told not to index it* by the header.

**Why the header was there:** Vercel automatically adds `X-Robots-Tag: noindex` to any deployment that isn't the **Production** deployment for a domain (preview deployments, `*.vercel.app` deployment URLs, and domains attached to a non-Production environment). Before 2026-05-29, the apex `calc-tech.com` was served by such a non-Production deployment, so **every page on the site** carried the noindex header. Confirmed it was a platform behavior, not our code: `git log --all -S "X-Robots-Tag"` returns **nothing** — the string never existed in the repository.

**Secondary issues that were real but not the main blocker:**
- A stale HTML `noindex` meta tag on some earlier deploys (separate from the header; fixed in code before this project).
- Duplicate `<title>` across 100+ pages — calculator pages are `"use client"` components, which **cannot export `metadata`**, so they all inherited the root layout's generic title.
- apex ⇄ www mismatch: `calc-tech.com` did a **307 (temporary)** redirect to `www.calc-tech.com`, while the sitemap + canonicals pointed at the apex — so every submitted URL was a redirect.
- Young, re-registered domain (registered 2025-11-11) with ~0 backlinks in a saturated niche → low crawl priority.

---

## Chronological log of everything we did

### Before / around 2026-05-29 — first fix pass (the meta-tag + domain work)
- **Removed `index: false`** from 7 extension uninstall/thank-you `layout.tsx` files so those pages became indexable (this also auto-adds them to the generated sitemap, since `app/sitemap.ts` skips folders whose layout declares `index:false`). — commit **`99587d5`**
- **Added `metadataBase`** (`https://calc-tech.com`) to the root `app/layout.tsx` so canonical/OG URLs resolve to the apex. — commit **`99587d5`**
- **Added unique `title` / `description` / `keywords` / OpenGraph / Twitter / canonical** via a per-route server `layout.tsx` to **58 top-level pages** that lacked one (20 already had them). — commit **`9a38f13`**
- **Vercel domain flip (in the dashboard, not in code):** set `calc-tech.com` → **"Connect to environment: Production"** (served directly), and `www.calc-tech.com` → **"Redirect to Another Domain: calc-tech.com" with 308 Permanent Redirect**. Verified `www.calc-tech.com/loan` → 308 → `calc-tech.com/loan`. **➜ This is the action that actually removed the `X-Robots-Tag: noindex` header — though we didn't realize that was the mechanism until 2026-06-03.**
- **GSC:** requested indexing for homepage, `/mortgage`, `/bmi`; **resubmitted the sitemap** (`https://calc-tech.com/sitemap.xml`, status Success, ~108 pages).
- Documented the investigation in [`GOTCHAS.md`](./GOTCHAS.md). — commits **`40d0a88`**, **`d9dbcc1`**

### 2026-06-01 — confirmed early crawl movement, created the status doc
- GSC showed the first positive movement: "Discovered – currently not indexed" fell **216 → 102** and its validation state changed **Not Started → Started** (Googlebot actively re-crawling). `Indexed` still 0.
- Created [`SEO-STATUS.md`](./SEO-STATUS.md) and referenced it from [`CLAUDE.md`](./CLAUDE.md) so future sessions start from the right place. — commit **`855c2b9`**

### 2026-06-03 — found and verified the REAL root cause, added a safeguard
1. **Re-checked the whole serving pipeline** instead of assuming "just authority/time":
   - `app/robots.ts` → allows all, declares sitemap. ✅
   - `app/layout.tsx` → `index: true, follow: true`, full googleBot directives, `metadataBase` set. ✅
   - Homepage `app/page.tsx` → server-rendered with ~80 internal links + real text. ✅
   - `middleware.ts` → only rewrites `ppltok.com`; leaves calc-tech.com untouched. ✅
   - Live fetch (bot-style, via WebFetch): `robots.txt` correct; `sitemap.xml` = 170 apex URLs; homepage = full content, **not** a challenge/403 page. ✅ → ruled out "Vercel bot protection is blocking Googlebot."
2. **GSC URL Inspection on the homepage** revealed the smoking gun: **"Indexing allowed? No — 'noindex' detected in 'X-Robots-Tag' http header."** (last crawl 2026-05-16, while the header was still present).
3. **Confirmed the header is gone now** — same-origin `fetch()` on the live site for `/`, `/mortgage`, `/bmi`, `/loan` → all **HTTP 200**, `x-robots-tag` = **NONE**.
4. **Confirmed Google sees it as indexable now** — GSC **TEST LIVE URL** on the homepage → **"URL is available to Google" / "Page can be indexed."**
5. **Ruled out a penalty** (important for a re-registered domain) — **Manual Actions: No issues detected**; **Security Issues: No issues detected**.
6. **Proved it was never in our code** — `git log --all -S "X-Robots-Tag"` returns nothing across all of history; `next.config.ts` and `vercel.json` did not set it.
7. **Requested indexing** for the homepage from the clean live result (priority crawl queue).
8. **Added a durable safeguard** — explicit `X-Robots-Tag: index, follow` header for `/(.*)` in `vercel.json`. On Production it's a clean "index me" signal; on preview deployments Vercel's own noindex still wins (the more restrictive header takes precedence), so previews stay out of the index. If the Production environment assignment ever regresses, this keeps the live site indexable. — commit **`a52acaf`**, deployed and **verified live** (`/` and `/mortgage` return `X-Robots-Tag: index, follow`).
9. Updated [`GOTCHAS.md`](./GOTCHAS.md) and [`SEO-STATUS.md`](./SEO-STATUS.md) with the real root cause. — commits **`4b34110`**, **`a52acaf`**, **`d6cb227`**

### 2026-06-05 — cleanup of the two loose ends
- **Removed the two 2016 "ghost" sitemaps** in GSC (`http://www.calc-tech.com/sitemap_index.xml` and `http://calc-tech.com/sitemap_index.xml`) — leftovers from the domain's prior life; both were HTML (not real XML sitemaps), 0 pages, erroring. Now only `https://calc-tech.com/sitemap.xml` remains.
- **Re-submitted the real sitemap** so Google re-reads it (it had last read it 2026-05-29 with 108 URLs; the live file now has 170). Status: "Sitemap submitted successfully."
- **Deleted the abandoned `calculator-net-clone` Vercel project.** It was wired to the same GitHub repo and failing to build on every push. Verified safe before deleting: it had **no custom domain** (only the default `calculator-net-clone.vercel.app`) and **no live deployment** ("No Deployment"). After deletion, the `yanivbarlev/calc-tech` repo has exactly one Vercel project — `calc-tech` (serving calc-tech.com).
- Wrote this file (`SEO-FIX-LOG.md`).

### 2026-06-09 — Google validated the 216-page "Discovered" fix
- **GSC sent the validation-success email:** *"Page indexing issues successfully fixed for site calc-tech.com … The specific issue validated was: Discovered - currently not indexed. 216 pages on your site were validated as fixed."*
- This is Google formally closing the validation it ran after the recrawl: the **entire original 216-page "Discovered – currently not indexed" bucket** (the 2026-05-29 baseline) passed. It is the clearest external confirmation yet that the `X-Robots-Tag: noindex` root-cause fix (Production domain flip) actually removed the blocker.
- **Caveat captured for honesty:** "validated as fixed" means the *issue* is resolved and the pages are eligible — **not** that all 216 are indexed and ranking. That converts gradually and shows up in the **Indexed** count over the following 1–3 weeks. Next SEO session should record how many of the 216 became Indexed, and watch for any sliding back into "Discovered" (which would point to thin/duplicate content as the next lever).

---

## How to verify the fix yourself (repeatable checks)

1. **HTTP header check (the important one):**
   - Browser console on https://calc-tech.com → `fetch('/').then(r => r.headers.get('x-robots-tag'))` → should be **`index, follow`** (and definitely never `noindex`).
   - Or a single `Invoke-WebRequest -Method Head https://calc-tech.com/` and read the `X-Robots-Tag` header. (Don't bulk-hammer the site with scripts — Vercel bot protection returns 403 to high-volume non-browser clients. A single request is fine.)
2. **GSC live test:** Search Console → URL Inspection → enter `https://calc-tech.com/` → **TEST LIVE URL** → expect **"URL is available to Google / Page can be indexed."**
3. **Penalty check:** GSC → Security & Manual Actions → both should say "No issues detected."
4. **Vercel environment check:** Vercel → project `calc-tech` → Settings → Domains → `calc-tech.com` must be connected to **Production** (this is what keeps the noindex header off).

---

## What to expect next (honest)

- The hidden blocker is gone. From here it's **Google's re-crawl cadence**: it last crawled the homepage 2026-05-16 (while the header was on) and caches that verdict until it re-crawls. With the indexing request in and the header gone, expect the homepage and top pages to start flipping to **Indexed over several days to ~2 weeks**, with the rest following as Google re-crawls via the sitemap and internal links.
- GSC's "Excluded by noindex" counts are **last-crawl data**; they clear on re-crawl, not instantly.
- The biggest remaining lever for *ranking faster* (not for *being indexable*) is **backlinks/authority** — a young, re-registered domain in the saturated "calculator" niche gets crawled conservatively regardless of clean code. That's a marketing task only the site owner can drive.

## The one-sentence lesson
When GSC says "Excluded by noindex" but the page's HTML has no noindex, **check the HTTP response headers (`X-Robots-Tag`)** — and on Vercel, **make sure the custom domain is connected to the Production environment**, because a non-Production deployment auto-stamps `noindex` on the entire site.
