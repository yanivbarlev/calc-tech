"use client";

import { useEffect, useState, useRef } from "react";

export const ADSENSE_ID = "ca-pub-2201920716197483";
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/codex-for-chrome-chatgpt-sidebar/__EXTENSION_ID__";

/* ── AdSense display unit ──────────────────────────────────────────────────
   The adsbygoogle.js script is loaded globally in app/layout.tsx, so each
   unit only needs to push an empty config object once it is mounted. */
export function AdUnit({
  adSlot,
  adFormat = "auto",
  style,
  className = "adsbygoogle",
  label = "Advertisement",
}: {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
}) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the global AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready (ad blocker, dev preview) — fail silently */
    }
  }, []);

  return (
    <div className="cx-ad">
      <span className="cx-ad-label">{label}</span>
      <ins
        className={className}
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* ── Full-screen interstitial ──────────────────────────────────────────────
   Shows once per browser session, after a short delay so the page content
   renders first. Always dismissable via the close button, the backdrop, or
   the "Continue" button (AdSense policy compliant — page content loads first
   and the ad is clearly closeable). */
export function Interstitial({
  adSlot = "9713320054",
  storageKey = "cx_interstitial_seen",
}: {
  adSlot?: string;
  storageKey?: string;
}) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(5);
  const canClose = count <= 0;
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(storageKey)) return;

    const openTimer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem(storageKey, "1");
      if (!pushed.current) {
        pushed.current = true;
        try {
          // @ts-expect-error adsbygoogle injected globally
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          /* ignore */
        }
      }
    }, 1400);

    return () => clearTimeout(openTimer);
  }, [storageKey]);

  useEffect(() => {
    if (!show || count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [show, count]);

  function close() {
    if (!canClose) return;
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="cx-int-backdrop" onClick={close} role="dialog" aria-modal="true">
      <div className="cx-int-card" onClick={(e) => e.stopPropagation()}>
        <div className="cx-int-head">
          <span className="cx-int-tag">Advertisement</span>
          {canClose ? (
            <button className="cx-int-close" onClick={close} aria-label="Close ad">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
          ) : (
            <span className="cx-int-count">Skip in {count}s</span>
          )}
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: 250 }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <button
          className={"cx-int-continue" + (canClose ? "" : " disabled")}
          onClick={close}
          disabled={!canClose}
        >
          {canClose ? "Continue →" : `Continue in ${count}s`}
        </button>
      </div>
    </div>
  );
}

/* ── Shared docs design system (OpenAI-docs-inspired) ───────────────────────
   One <style> block used by every Codex-for-Chrome docs-style page so the
   welcome page and the thank-you guide share the exact same look. */
export function DocsStyles() {
  return (
    <style>{`
      :root {
        --cx-bg: #ffffff;
        --cx-bg-soft: #f7f8fa;
        --cx-line: #e6e8eb;
        --cx-text: #11181c;
        --cx-muted: #5b6770;
        --cx-dim: #7b868f;
        --cx-accent: #0d9488;
        --cx-accent-soft: #ecfdf9;
        --cx-code-bg: #f4f5f7;
        --cx-warn-bg: #fffbeb;
        --cx-warn-bd: #fde68a;
        --cx-info-bg: #eff6ff;
        --cx-info-bd: #bfdbfe;
      }
      * { box-sizing: border-box; }
      .cx-doc {
        background: var(--cx-bg);
        color: var(--cx-text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.65;
        min-height: 100vh;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
      }

      /* Top bar */
      .cx-topbar {
        position: sticky; top: 0; z-index: 40;
        background: rgba(255,255,255,0.9);
        backdrop-filter: saturate(180%) blur(8px);
        border-bottom: 1px solid var(--cx-line);
      }
      .cx-topbar-inner {
        max-width: 1180px; margin: 0 auto;
        padding: 14px 24px;
        display: flex; align-items: center; gap: 14px;
      }
      .cx-logo { display: flex; align-items: center; gap: 9px; font-weight: 700; font-size: 16px; color: var(--cx-text); text-decoration: none; }
      .cx-logo-mark {
        width: 26px; height: 26px; border-radius: 7px;
        background: linear-gradient(135deg, #0d9488, #10b981);
        display: flex; align-items: center; justify-content: center; color: #fff;
      }
      .cx-topbar-spacer { flex: 1; }
      .cx-topbar-link { font-size: 14px; color: var(--cx-muted); text-decoration: none; font-weight: 500; }
      .cx-topbar-link:hover { color: var(--cx-text); }
      .cx-topbar-cta {
        font-size: 14px; font-weight: 600; text-decoration: none;
        color: #fff; background: var(--cx-accent);
        padding: 8px 16px; border-radius: 8px;
        transition: background 150ms ease;
      }
      .cx-topbar-cta:hover { background: #0b8276; }

      /* Hero */
      .cx-hero {
        background:
          radial-gradient(ellipse 700px 300px at 50% -10%, rgba(13,148,136,0.10), transparent 70%),
          var(--cx-bg-soft);
        border-bottom: 1px solid var(--cx-line);
      }
      .cx-hero-inner { max-width: 1180px; margin: 0 auto; padding: 44px 24px 40px; }
      .cx-hero-badge {
        display: inline-flex; align-items: center; gap: 7px;
        font-size: 12px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase;
        color: var(--cx-accent); background: var(--cx-accent-soft);
        border: 1px solid #b9efe4; padding: 5px 12px; border-radius: 999px; margin-bottom: 16px;
      }
      .cx-hero h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin: 0 0 12px; }
      .cx-hero p { font-size: 17px; color: var(--cx-muted); max-width: 64ch; margin: 0; }
      .cx-hero-meta { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 20px; font-size: 13.5px; color: var(--cx-dim); }
      .cx-hero-meta span { display: inline-flex; align-items: center; gap: 6px; }

      /* Layout */
      .cx-shell { max-width: 1180px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 232px minmax(0,1fr); gap: 48px; }
      @media (max-width: 920px) { .cx-shell { grid-template-columns: 1fr; gap: 0; } }

      /* Sidebar */
      .cx-side { position: sticky; top: 72px; align-self: start; height: calc(100vh - 72px); overflow-y: auto; padding: 32px 0; }
      @media (max-width: 920px) { .cx-side { display: none; } }
      .cx-side-title { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--cx-dim); margin-bottom: 14px; padding-left: 12px; }
      .cx-side-nav { display: flex; flex-direction: column; gap: 1px; border-left: 1px solid var(--cx-line); }
      .cx-side-nav a {
        font-size: 14px; color: var(--cx-muted); text-decoration: none;
        padding: 7px 12px; margin-left: -1px;
        border-left: 2px solid transparent; transition: color 120ms ease, border-color 120ms ease;
      }
      .cx-side-nav a:hover { color: var(--cx-text); }
      .cx-side-nav a.active { color: var(--cx-accent); border-left-color: var(--cx-accent); font-weight: 600; }

      /* Main content */
      .cx-main { padding: 36px 0 80px; min-width: 0; }
      .cx-main h2 { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 14px; scroll-margin-top: 80px; }
      .cx-main h2:not(:first-child) { margin-top: 56px; padding-top: 8px; }
      .cx-main h3 { font-size: 18px; font-weight: 700; margin: 32px 0 10px; }
      .cx-main p { margin: 0 0 16px; color: #2b343a; }
      .cx-main ul, .cx-main ol { margin: 0 0 18px; padding-left: 22px; color: #2b343a; }
      .cx-main li { margin-bottom: 8px; }
      .cx-main strong { font-weight: 700; color: var(--cx-text); }
      .cx-main a.inline { color: var(--cx-accent); text-decoration: none; border-bottom: 1px solid rgba(13,148,136,0.35); }
      .cx-main a.inline:hover { border-bottom-color: var(--cx-accent); }
      .cx-lead { font-size: 17.5px; color: var(--cx-muted) !important; }

      kbd {
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12.5px; background: var(--cx-bg); color: var(--cx-text);
        border: 1px solid var(--cx-line); border-bottom-width: 2px; border-radius: 6px;
        padding: 2px 7px; margin: 0 1px; white-space: nowrap;
      }
      code.inline {
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 13.5px; background: var(--cx-code-bg); color: #b3306b;
        padding: 1.5px 6px; border-radius: 5px;
      }
      .cx-code {
        background: #0f172a; color: #e2e8f0; border-radius: 10px;
        padding: 16px 18px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 13.5px; line-height: 1.7; overflow-x: auto; margin: 0 0 18px;
      }
      .cx-code .c { color: #94a3b8; }
      .cx-code .k { color: #5eead4; }

      /* Callouts */
      .cx-call { border-radius: 10px; padding: 14px 16px; margin: 0 0 20px; font-size: 15px; border: 1px solid; display: flex; gap: 11px; }
      .cx-call svg { flex-shrink: 0; margin-top: 2px; }
      .cx-call p { margin: 0 !important; }
      .cx-call.tip { background: var(--cx-accent-soft); border-color: #b9efe4; color: #115e56; }
      .cx-call.info { background: var(--cx-info-bg); border-color: var(--cx-info-bd); color: #1e3a8a; }
      .cx-call.warn { background: var(--cx-warn-bg); border-color: var(--cx-warn-bd); color: #854d0e; }
      .cx-call strong { color: inherit; }

      /* Step cards */
      .cx-steps { counter-reset: step; margin: 0 0 22px; }
      .cx-step { position: relative; padding: 0 0 4px 44px; margin-bottom: 18px; }
      .cx-step::before {
        counter-increment: step; content: counter(step);
        position: absolute; left: 0; top: 0;
        width: 28px; height: 28px; border-radius: 50%;
        background: var(--cx-accent); color: #fff; font-weight: 700; font-size: 14px;
        display: flex; align-items: center; justify-content: center;
      }
      .cx-step h4 { font-size: 16px; font-weight: 700; margin: 2px 0 4px; }
      .cx-step p { margin: 0 !important; font-size: 15px; color: var(--cx-muted) !important; }

      /* Shortcut table */
      .cx-tbl { width: 100%; border-collapse: collapse; margin: 0 0 22px; font-size: 14.5px; }
      .cx-tbl th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--cx-dim); padding: 8px 12px; border-bottom: 1px solid var(--cx-line); }
      .cx-tbl td { padding: 10px 12px; border-bottom: 1px solid var(--cx-line); color: #2b343a; }
      .cx-tbl td:last-child { text-align: right; white-space: nowrap; }

      /* Ads */
      .cx-ad { margin: 28px 0; text-align: center; min-height: 90px; }
      .cx-ad-label { display: block; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #aeb6bd; margin-bottom: 4px; }

      /* Prev/Next */
      .cx-pn { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }
      @media (max-width: 560px) { .cx-pn { grid-template-columns: 1fr; } }
      .cx-pn a { display: block; border: 1px solid var(--cx-line); border-radius: 12px; padding: 16px 18px; text-decoration: none; transition: border-color 150ms ease, box-shadow 150ms ease; }
      .cx-pn a:hover { border-color: var(--cx-accent); box-shadow: 0 4px 14px -8px rgba(13,148,136,0.5); }
      .cx-pn .dir { font-size: 12px; color: var(--cx-dim); text-transform: uppercase; letter-spacing: 0.6px; }
      .cx-pn .t { font-size: 15.5px; font-weight: 700; color: var(--cx-text); margin-top: 3px; }
      .cx-pn .next { text-align: right; }

      /* Footer */
      .cx-foot { border-top: 1px solid var(--cx-line); background: var(--cx-bg-soft); }
      .cx-foot-inner { max-width: 1180px; margin: 0 auto; padding: 28px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 14px; font-size: 13.5px; color: var(--cx-dim); }
      .cx-foot a { color: var(--cx-muted); text-decoration: none; }
      .cx-foot a:hover { color: var(--cx-text); }

      /* Interstitial */
      .cx-int-backdrop {
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(8,12,16,0.78); backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center; padding: 20px;
        animation: cxIntFade 0.25s ease;
      }
      @keyframes cxIntFade { from { opacity: 0; } to { opacity: 1; } }
      .cx-int-card {
        background: #fff; border-radius: 16px; width: 100%; max-width: 520px;
        padding: 16px; box-shadow: 0 24px 70px -12px rgba(0,0,0,0.5);
        animation: cxIntUp 0.3s cubic-bezier(0.22,1,0.36,1);
      }
      @keyframes cxIntUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .cx-int-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; min-height: 30px; }
      .cx-int-tag { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #aeb6bd; }
      .cx-int-count { font-size: 13px; color: var(--cx-dim); font-weight: 500; }
      .cx-int-close {
        width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--cx-line);
        background: #fff; color: var(--cx-muted); cursor: pointer;
        display: flex; align-items: center; justify-content: center; transition: all 120ms ease;
      }
      .cx-int-close:hover { background: var(--cx-text); color: #fff; border-color: var(--cx-text); }
      .cx-int-continue {
        width: 100%; margin-top: 14px; padding: 12px; border-radius: 10px; border: none;
        font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer;
        background: var(--cx-accent); color: #fff; transition: background 150ms ease;
      }
      .cx-int-continue:hover { background: #0b8276; }
      .cx-int-continue.disabled { background: #cbd5e1; color: #fff; cursor: not-allowed; }
    `}</style>
  );
}

/* Shared scroll-spy hook for the "On this page" sidebar. */
export function useScrollSpy(ids: string[], initial: string) {
  const [active, setActive] = useState(initial);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
