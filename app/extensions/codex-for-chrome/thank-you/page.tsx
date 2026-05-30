"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const ADSENSE_ID = "ca-pub-2201920716197483";

/* ── AdSense display unit ──────────────────────────────────────────────────
   The adsbygoogle.js script is loaded globally in app/layout.tsx, so each
   unit only needs to push an empty config object once it is mounted. */
function AdUnit({
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
   the "Continue to the guide" link (AdSense policy compliant). */
function Interstitial() {
  const [show, setShow] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [count, setCount] = useState(5);
  const pushed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("cx_interstitial_seen")) return;

    const openTimer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("cx_interstitial_seen", "1");
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
  }, []);

  useEffect(() => {
    if (!show) return;
    if (count <= 0) {
      setCanClose(true);
      return;
    }
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
          data-ad-slot="9713320054"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <button
          className={"cx-int-continue" + (canClose ? "" : " disabled")}
          onClick={close}
          disabled={!canClose}
        >
          {canClose ? "Continue to the guide →" : `Continue in ${count}s`}
        </button>
      </div>
    </div>
  );
}

const NAV = [
  { id: "getting-started", label: "Getting started" },
  { id: "open-panel", label: "Open the side panel" },
  { id: "prompts", label: "Using prompt templates" },
  { id: "shortcuts", label: "Keyboard shortcuts" },
  { id: "codex-tasks", label: "Working with Codex" },
  { id: "themes", label: "Dark & light mode" },
  { id: "privacy", label: "Privacy & permissions" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
];

export default function CodexThankYouPage() {
  const [active, setActive] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Interstitial />

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

        /* Thank-you banner */
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
        .cx-call { border-radius: 10px; padding: 14px 16px 14px 16px; margin: 0 0 20px; font-size: 15px; border: 1px solid; display: flex; gap: 11px; }
        .cx-call svg { flex-shrink: 0; margin-top: 2px; }
        .cx-call p:last-child { margin-bottom: 0; }
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
        .cx-step p { margin: 0; font-size: 15px; color: var(--cx-muted); }

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

      <div className="cx-doc">
        {/* Top bar */}
        <header className="cx-topbar">
          <div className="cx-topbar-inner">
            <Link href="/" className="cx-logo">
              <span className="cx-logo-mark">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
              </span>
              Codex for Chrome
            </Link>
            <div className="cx-topbar-spacer" />
            <Link href="/extensions/codex-for-chrome" className="cx-topbar-link">
              Overview
            </Link>
            <a
              href="https://chromewebstore.google.com/detail/codex-for-chrome-chatgpt-sidebar/__EXTENSION_ID__"
              target="_blank"
              rel="noopener noreferrer"
              className="cx-topbar-cta"
            >
              Add to Chrome
            </a>
          </div>
        </header>

        {/* Thank-you hero */}
        <section className="cx-hero">
          <div className="cx-hero-inner">
            <span className="cx-hero-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Installed — thank you!
            </span>
            <h1>You&apos;re ready to speed up ChatGPT &amp; Codex</h1>
            <p>
              Thanks for installing <strong>Codex for Chrome</strong>. This guide
              walks you through everything the side panel can do — how to open it,
              how to fire off prompt templates in one click, the full keyboard-shortcut
              cheatsheet, and how to keep everything private. It takes about three
              minutes to read, and it&apos;ll save you that much time every single day.
            </p>
            <div className="cx-hero-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                3 min read
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                Works on ChatGPT, OpenAI, Codex &amp; Sora
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                100% free, no account
              </span>
            </div>
          </div>
        </section>

        {/* Shell: sidebar + content */}
        <div className="cx-shell">
          {/* Sidebar */}
          <aside className="cx-side">
            <div className="cx-side-title">On this page</div>
            <nav className="cx-side-nav">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>
                  {n.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="cx-main">
            {/* Top banner ad */}
            <AdUnit adSlot="3339483394" adFormat="horizontal" style={{ minHeight: 90 }} />

            <h2 id="getting-started">Getting started</h2>
            <p className="cx-lead">
              Codex for Chrome is a lightweight side panel that lives next to ChatGPT,
              OpenAI and Codex. It puts two things one click away: a library of ready-to-use
              prompt templates, and a complete cheatsheet of every keyboard shortcut. There&apos;s
              nothing to configure and no account to create — once it&apos;s installed, you just open it.
            </p>
            <p>
              The extension never reads your conversations and never sends data anywhere. The only
              thing it remembers is whether you prefer dark or light mode, and that&apos;s stored
              locally on your own machine. Everything below explains how to get the most out of it.
            </p>
            <div className="cx-call tip">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></svg>
              <p><strong>Pin it first.</strong> The single best thing you can do right now is pin the extension to your toolbar so it&apos;s always one click away. The next section shows you exactly how.</p>
            </div>

            <h2 id="open-panel">Open the side panel</h2>
            <p>
              Chrome doesn&apos;t allow extensions to pop their side panel open automatically —
              that&apos;s a privacy protection built into the browser. So the first time, you open
              it manually. After you pin the icon, it&apos;s a single click from then on.
            </p>
            <div className="cx-steps">
              <div className="cx-step">
                <h4>Click the puzzle-piece icon</h4>
                <p>It&apos;s in the top-right of Chrome&apos;s toolbar. This opens the list of every extension you have installed.</p>
              </div>
              <div className="cx-step">
                <h4>Pin &ldquo;Codex for Chrome&rdquo;</h4>
                <p>Find it in the list and click the pin icon next to it. The Codex icon now stays permanently in your toolbar.</p>
              </div>
              <div className="cx-step">
                <h4>Click the Codex icon</h4>
                <p>The side panel slides in from the right, ready to use. It sits beside your chat instead of covering it.</p>
              </div>
            </div>
            <div className="cx-call info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              <p>There&apos;s also a shortcut you&apos;ll love: on any ChatGPT or Codex page, a small <strong>⚡ button</strong> appears right next to the chat input. Tap it to toggle the panel without reaching for the toolbar at all.</p>
            </div>

            <h2 id="prompts">Using prompt templates</h2>
            <p>
              The <strong>Prompts</strong> tab holds 30+ carefully written prompts, grouped into four
              categories so you can find the right one fast. Click any prompt and it&apos;s inserted
              straight into the ChatGPT or Codex input box — and copied to your clipboard as a backup.
              No more retyping &ldquo;explain this code step by step&rdquo; for the hundredth time.
            </p>
            <h3>The four categories</h3>
            <ul>
              <li><strong>Code</strong> — explain, refactor, write tests, add types, optimize, translate to another language, identify the design pattern, and more.</li>
              <li><strong>Review</strong> — act as a senior engineer and review this, is it production-ready, what are the security holes, what are the trade-offs, give me five alternatives.</li>
              <li><strong>Clarity</strong> — summarize in three bullets, give me the TL;DR, explain like I&apos;m five, make this more concise, rewrite it professionally.</li>
              <li><strong>Debug</strong> — trace through this and tell me where it breaks, why is this returning null, what&apos;s the difference between X and Y, continue where you left off.</li>
            </ul>
            <p>
              The prompts are deliberately short and general so they work as a starting point. Click one,
              then add your specifics — paste your code, name your file, describe your bug — and send.
            </p>
            <div className="cx-call tip">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></svg>
              <p><strong>Workflow tip:</strong> chain prompts. Start with <code className="inline">Explain this code step by step</code>, then follow with <code className="inline">Find all bugs and explain each one</code>, then <code className="inline">Write unit tests for this</code>. Three clicks, a full review.</p>
            </div>

            {/* In-content ad */}
            <AdUnit adSlot="9713320054" style={{ minHeight: 250 }} />

            <h2 id="shortcuts">Keyboard shortcuts</h2>
            <p>
              The <strong>Shortcuts</strong> tab is a complete, always-on cheatsheet for ChatGPT and Codex.
              Stop interrupting your flow to Google &ldquo;how do I start a new ChatGPT chat with the keyboard&rdquo; —
              it&apos;s right there in the panel. Here are some of the most useful ones.
            </p>
            <table className="cx-tbl">
              <thead>
                <tr><th>Action</th><th>Shortcut</th></tr>
              </thead>
              <tbody>
                <tr><td>New chat</td><td><kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>O</kbd></td></tr>
                <tr><td>Toggle sidebar</td><td><kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>S</kbd></td></tr>
                <tr><td>Focus chat input</td><td><kbd>Shift</kbd> <kbd>Esc</kbd></td></tr>
                <tr><td>Show all shortcuts</td><td><kbd>Ctrl</kbd> <kbd>/</kbd></td></tr>
                <tr><td>Send message</td><td><kbd>Enter</kbd></td></tr>
                <tr><td>New line (no send)</td><td><kbd>Shift</kbd> <kbd>Enter</kbd></td></tr>
                <tr><td>Codex — submit / run task</td><td><kbd>Ctrl</kbd> <kbd>Enter</kbd></td></tr>
                <tr><td>Codex — stop task</td><td><kbd>Esc</kbd></td></tr>
              </tbody>
            </table>
            <p>
              The panel groups every shortcut by area — Navigation, Input &amp; Editing, Conversation,
              Model &amp; Settings, Codex, and Browser — so the one you need is easy to scan for. On macOS,
              swap <kbd>Ctrl</kbd> for <kbd>⌘</kbd> where it applies.
            </p>

            <h2 id="codex-tasks">Working with Codex</h2>
            <p>
              If you use <a className="inline" href="https://developers.openai.com/codex/" target="_blank" rel="noopener noreferrer">Codex</a> for
              agentic coding tasks, the panel shines. Keep the prompt templates open while you draft a task,
              and use the Codex shortcut group to run and stop tasks without leaving the keyboard.
            </p>
            <h3>A typical Codex loop</h3>
            <div className="cx-code">
              <span className="c"># 1. Draft your task in the Codex input</span><br />
              <span className="k">Refactor</span> the auth module and add error handling<br />
              <br />
              <span className="c"># 2. Submit it</span><br />
              <span className="k">Ctrl</span> + <span className="k">Enter</span><br />
              <br />
              <span className="c"># 3. Need to change course? Stop it</span><br />
              <span className="k">Esc</span>
            </div>
            <p>
              The extension only adds UI — it never touches your code, your repositories, or your Codex
              account. It simply makes the prompts and shortcuts you already use faster to reach.
            </p>

            <h2 id="themes">Dark &amp; light mode</h2>
            <p>
              The panel ships in dark mode to match how most people run ChatGPT and Codex late at night,
              but you can flip it instantly. Click the <strong>moon / sun icon</strong> in the top-right of
              the panel header to toggle between dark and light. Your choice is saved with
              <code className="inline">chrome.storage.local</code>, so it sticks across sessions and browser
              restarts — and it never leaves your device.
            </p>

            <h2 id="privacy">Privacy &amp; permissions</h2>
            <p>
              Codex for Chrome is built to be boring about your data — in the best way. Here&apos;s exactly
              what it does and doesn&apos;t do.
            </p>
            <ul>
              <li><strong>No data collection.</strong> It reads nothing from your conversations and transmits nothing to any server. There are no analytics and no tracking pixels.</li>
              <li><strong>One tiny stored value.</strong> The only thing saved is your theme preference — the literal string <code className="inline">&quot;dark&quot;</code> or <code className="inline">&quot;light&quot;</code> — kept locally.</li>
              <li><strong>Scoped to OpenAI sites.</strong> The content script only runs on <code className="inline">chatgpt.com</code>, <code className="inline">openai.com</code>, <code className="inline">codex.com</code>, and <code className="inline">sora.com</code>. Everywhere else, the extension is completely inactive.</li>
              <li><strong>Two minimal permissions.</strong> <code className="inline">storage</code> (for the theme) and <code className="inline">sidePanel</code> (to show the panel). That&apos;s it.</li>
            </ul>
            <div className="cx-call warn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <p>This extension is an independent third-party tool. It is <strong>not affiliated with, endorsed by, or officially connected to OpenAI.</strong> ChatGPT and Codex are trademarks of OpenAI.</p>
            </div>

            {/* In-content ad */}
            <AdUnit adSlot="3339483394" style={{ minHeight: 250 }} />

            <h2 id="troubleshooting">Troubleshooting</h2>
            <h3>The panel won&apos;t open</h3>
            <p>
              Make sure you&apos;re on a supported site (ChatGPT, OpenAI, Codex, or Sora). The icon is active
              on those pages. If the icon looks greyed out, you&apos;re on a different site — open a ChatGPT tab
              and try again.
            </p>
            <h3>I don&apos;t see the ⚡ button next to the input</h3>
            <p>
              ChatGPT occasionally re-renders its interface. Reload the page with <kbd>F5</kbd> (or a hard reload,
              <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>R</kbd>) and the button re-injects. If it still doesn&apos;t appear,
              just open the panel from the toolbar icon instead — same panel, same features.
            </p>
            <h3>A prompt didn&apos;t insert into the box</h3>
            <p>
              The prompt is always copied to your clipboard as a fallback, so you can paste it with
              <kbd>Ctrl</kbd> <kbd>V</kbd>. If insertion keeps failing, reload the ChatGPT tab so the content
              script reconnects.
            </p>
            <h3>My theme keeps resetting</h3>
            <p>
              That usually means the browser is clearing extension storage (for example, an aggressive
              &ldquo;clear browsing data&rdquo; setting). Re-pick your theme and check your Chrome privacy settings
              aren&apos;t wiping extension data on exit.
            </p>

            <h2 id="faq">FAQ</h2>
            <h3>Is it really free?</h3>
            <p>Yes — completely. No subscription, no paywall, no account. Install it and use everything immediately.</p>
            <h3>Does it work on the ChatGPT mobile app?</h3>
            <p>No. It&apos;s a Chrome extension for the desktop browser. Use it with ChatGPT and Codex on the web.</p>
            <h3>Will it slow down ChatGPT?</h3>
            <p>No. It&apos;s tiny and only adds a button plus a side panel. It does no background work and makes no network requests.</p>
            <h3>How do I uninstall it?</h3>
            <p>Right-click the extension icon in Chrome and choose <strong>Remove from Chrome</strong>. No leftover files, nothing to clean up.</p>

            {/* Bottom ad */}
            <AdUnit adSlot="9713320054" style={{ minHeight: 250 }} />

            {/* Prev / Next */}
            <div className="cx-pn">
              <Link href="/extensions/codex-for-chrome">
                <span className="dir">← Overview</span>
                <span className="t">Codex for Chrome — features</span>
              </Link>
              <Link href="/extensions/codex-for-chrome/welcome" className="next">
                <span className="dir">Next →</span>
                <span className="t">First-run walkthrough</span>
              </Link>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="cx-foot">
          <div className="cx-foot-inner">
            <span>&copy; {new Date().getFullYear()} Calc-Tech. Codex for Chrome is an independent tool, not affiliated with OpenAI.</span>
            <span style={{ display: "flex", gap: 16 }}>
              <Link href="/">Home</Link>
              <Link href="/extensions/codex-for-chrome">Overview</Link>
              <Link href="/privacy">Privacy</Link>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
