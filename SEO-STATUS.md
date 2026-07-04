# SEO Status — calc-tech.com (ongoing project)

> **This is the living source of truth for the Google indexing / SEO effort.**
> Read it before doing any SEO work, and **update it at the end of any session that touches SEO/indexing** (add a dated entry to the Changelog and refresh the "Current status" snapshot).
> Detailed one-off issue write-up lives in [`GOTCHAS.md`](./GOTCHAS.md). Full chronological history of the indexing fix lives in [`SEO-FIX-LOG.md`](./SEO-FIX-LOG.md).

---

## Goal

Get calc-tech.com's pages **crawled and indexed by Google**, then ranking, for its ~120 calculator/tool pages. The site is the hosted Next.js app (see [`CLAUDE.md`](./CLAUDE.md)); this project is specifically about search discoverability.

## Current status - as of 2026-07-03

**Investigated fresh GSC evidence from 2026-06-24 15:06:30 IDT for `http://www.calc-tech.com/`: GSC still reported `No: 'noindex' detected in 'X-Robots-Tag' http header`.** Live verification on 2026-07-03 did **not** reproduce a live noindex on the custom domain:

- `http://www.calc-tech.com/` -> 308 -> `https://www.calc-tech.com/` -> 308 -> `https://calc-tech.com/`.
- Final `https://calc-tech.com/` returns `200` with `X-Robots-Tag: index, follow`, including with a Googlebot smartphone user agent.
- The production deployment active around the crawl (`calc-tech-9f7ca4rrf`, created 2026-06-24 14:45 IDT) is now an old protected Vercel deployment URL and returns Vercel SSO + `X-Robots-Tag: noindex` when accessed directly. That is expected for deployment URLs and should not affect the active custom-domain apex, but it explains why deployment-url tests can look scary.
- Found one real code issue from the GSC snippet: homepage had **User-declared canonical: None** because `app/page.tsx` was a client component and could not export metadata. Fixed by moving the UI to `app/HomePageClient.tsx` and making `app/page.tsx` a server component exporting `alternates.canonical = "https://calc-tech.com/"`.
- Verified production build with Vercel production env vars; generated homepage HTML now contains `rel="canonical"` for `https://calc-tech.com` and robots `index, follow`.
- Deployed the canonical fix to Production on 2026-07-03: `calc-tech-pmi4ltx0c-yanivs-projects-faa86cc8.vercel.app`, deployment id `dpl_DNkwGrkYgKcKkBWPxV94o4vjcP7f`, aliased to `https://calc-tech.com` and `https://www.calc-tech.com`.
- Post-deploy verification: Googlebot-smartphone-style request to `http://www.calc-tech.com/` redirects to `https://calc-tech.com/`; final response is `200`, `X-Robots-Tag: index, follow`, `X-Vercel-Cache: PRERENDER`, and the live homepage HTML includes `<link rel="canonical" href="https://calc-tech.com">`.
- 2026-07-04 GSC follow-up: **Test Live URL succeeded** for the homepage, and a fresh indexing request was submitted. This confirms Google can now fetch the live page as indexable after the canonical/header cleanup.

**Conclusion:** the old site-wide `X-Robots-Tag: noindex` blocker is still not reproducible on the live custom domain today. The homepage canonical ambiguity is fixed, production serves `index, follow`, and GSC live testing now confirms the homepage is eligible for indexing. Next step is to monitor the Indexed count and the specific homepage URL over the next crawl cycle.

## Current status — as of 2026-06-13

**Indexed: 0. Not indexed: 59 (3 reasons): noindex 55 · redirect error 3 · 404 1.** Investigated the persistent "noindex" bucket deeply this session and reached a calibrated conclusion: **there is no reproducible live technical blocker. The live apex serves `X-Robots-Tag: index, follow` on 38/38 sampled requests, and Google's own LIVE TEST returns "Page can be indexed."** The residual not-indexed count is **stale per-page crawl verdicts + crawl-coverage lag on a young, low-authority domain**, not an active site-wide noindex.

**The decisive evidence (read this before re-investigating — don't repeat the dead ends):**
- I inspected 3 representative URLs and got **3 different states from 3 different crawl times** — the signature of recrawl lag, NOT one live bug:
  - `https://calc-tech.com/` → "Redirect error", **last crawl Jun 3** (the day of the domain flip; caught a redirect mid-transition).
  - `https://calc-tech.com/privacy` → "Excluded by noindex" in the GOOGLE INDEX tab, last crawl Jun 13 — **but its LIVE TEST = "Page can be indexed"** (clean). The "Last crawl" date is recent; the noindex *verdict* beside it is a carried-over index-time determination, not a fresh re-judgment.
  - `https://calc-tech.com/age` → "URL is unknown to Google", **never crawled** (Last crawl N/A, no referring sitemap detected).
- **Vercel deploy history disproves the "intermittent/old-deployment noindex" theory:** the last deploy was **Jun 11 06:35 UTC** — 2 days before the Jun 13 crawl, so there was no deploy-swap window for Googlebot to hit. Every deployment is `target: production` + `READY`; there are **no preview deployments** serving the apex. The apex is always aliased to the newest production build, which serves `index, follow`.
- Vercel auto-injects `X-Robots-Tag: noindex` on **preview + outdated-production deployment URLs** — this is platform behavior on **all tiers (incl. paid), NOT a free/Hobby-tier penalty**. It does not affect the custom-domain apex once it's on Production (which it is). See `GOTCHAS.md`.

**Action taken this session:** requested indexing on `/`, `/privacy`, `/age` (priority crawl queue). **Next session: re-inspect these 3 — if they flip to Indexed, it confirms live-clean + GSC-lag and the fix is done. If any re-flags noindex AFTER a fresh forced crawl, there's a real ghost still to find.**

> **Migration note (2026-06-13):** Considered moving the site to PythonAnywhere (user has a paid slot). **Rejected — not viable:** this is a Next.js/Node app (API routes, middleware host-rewrite, Clerk, server-side Supabase, build-time sitemap); PythonAnywhere only runs Python/WSGI apps. A move = full rewrite, and it wouldn't speed indexing (new host resets crawl trust). Stay on Vercel.

### Earlier snapshot — as of 2026-06-09

**Google validated the "Discovered – currently not indexed" fix — all 216 pages passed.** GSC sent the email *"Page indexing issues successfully fixed for site calc-tech.com … The specific issue validated was: Discovered - currently not indexed. 216 pages on your site were validated as fixed."* This is the **validation pass closing out the original 216-page "Discovered" bucket** (the baseline from 2026-05-29). It confirms the root-cause fix (the `X-Robots-Tag: noindex` header removal via the Production domain flip) cleared the blocker Google was checking for.

**Important nuance — "validated as fixed" ≠ "indexed."** It means Google agreed the *issue* is resolved and the pages are eligible again; it does NOT by itself mean all 216 are now in the index and ranking. The number that matters is the **Indexed** count, which should climb over the next 1–3 weeks as Google works through the re-crawl. **Next session: read the Indexed count and log how many of the 216 actually converted.** If pages slide *back* into "Discovered – currently not indexed" later, the underlying thin/duplicate-content cause wasn't fully solved (→ lever #4, content differentiation).

### Earlier snapshot — as of 2026-06-03

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

### 2026-06-05 — cleanup of the two loose ends
- **Removed both 2016 "ghost" sitemaps** in GSC (`http://www.calc-tech.com/sitemap_index.xml`, `http://calc-tech.com/sitemap_index.xml` — HTML, 0 pages, erroring). Only `https://calc-tech.com/sitemap.xml` remains.
- **Re-submitted** `https://calc-tech.com/sitemap.xml` so Google re-reads it (last read 2026-05-29 with 108 URLs; live file now has 170). Status: submitted successfully.
- **Deleted the abandoned `calculator-net-clone` Vercel project.** Verified safe first: no custom domain (only the default `*.vercel.app`), no live deployment. The `yanivbarlev/calc-tech` repo now has exactly one Vercel project (`calc-tech`).
- **Wrote [`SEO-FIX-LOG.md`](./SEO-FIX-LOG.md)** — the full chronological record of the whole fix across all sessions.

### 2026-06-09 — Google validated the 216-page "Discovered" fix
- **GSC email received:** *"Page indexing issues successfully fixed … issue validated: Discovered - currently not indexed. 216 pages validated as fixed."* This closes the validation Google started after the recrawl — the original 216-page "Discovered" bucket (2026-05-29 baseline) passed.
- **What it confirms:** the `X-Robots-Tag: noindex` root-cause fix worked; Google no longer considers these pages blocked. **What it does NOT confirm:** that they're all indexed/ranking yet — that shows up in the **Indexed** count over the next 1–3 weeks.
- **Action for next session:** read the Indexed count in GSC and record how many of the 216 actually converted to Indexed (not just "validated"). Watch for any regression back into "Discovered."

### 2026-06-13 — deep re-investigation of the persistent "noindex 55" bucket; ruled out a live blocker
- **Re-checked GSC:** Indexed 0, not-indexed 59 (noindex 55 / redirect error 3 / 404 1). The noindex validation last "Failed" on 5/23 — i.e. it failed *before* the 5/29–6/3 root-cause fix, so GSC never re-validated it.
- **Sampled the live header 38× across 6 pages** (`/`, `/privacy`, `/mortgage`, `/bmi`, `/scientific`, `/age`) via in-browser `fetch` (browser UA avoids the bot-protection 403s) → **all 38 returned `index, follow`. Zero noindex.** Confirmed repo is clean too: `vercel.json` forces `X-Robots-Tag: index, follow`; nothing in `next.config.ts`/`middleware.ts`.
- **Tested the "intermittent / outdated-deployment" hypothesis and DISPROVED it** via `list_deployments`: last deploy Jun 11 06:35 UTC (2 days before the Jun-13 crawl), all deployments `production`+`READY`, no preview deployments. No swap window. So Googlebot was NOT hitting a transient bad deployment.
- **Inspected 3 URLs → 3 different stale states** (homepage redirect-error/crawled Jun 3; /privacy noindex-in-index-tab but LIVE TEST clean; /age never crawled). This variety = recrawl-coverage lag, not a single live defect. **Corrected an earlier over-alarm**: the GSC "Last crawl" date being recent does NOT mean the noindex verdict is fresh — the verdict is carried over from an earlier evaluation.
- **Confirmed the Vercel auto-noindex is all-tier platform behavior** (preview + outdated-production deployment URLs), not a free-tier penalty — answered the user's explicit question. Researched + recorded.
- **Requested indexing** on `/`, `/privacy`, `/age` (priority crawl queue) as the cheap pass/fail test. Watch these next session.
- **Rejected a proposed PythonAnywhere migration** (Node app can't run on Python-only WSGI host; wouldn't help indexing). Noted inline above.
- **Bottom line:** no code change made — none is warranted. The blocker is time + authority (backlinks), consistent with lever #1 below.

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
