"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function CodexWelcomeInner() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const prev = searchParams.get("prev");
  const v = searchParams.get("v") || "";
  const conversionFired = useRef(false);

  useEffect(() => {
    const eyebrow = document.getElementById("heroEyebrow");
    const banner = document.getElementById("updateBanner");
    const bannerText = document.getElementById("updateText");
    if (reason === "update" && prev) {
      if (eyebrow) eyebrow.textContent = v ? "Updated to v" + v : "Updated";
      if (banner) banner.classList.add("active");
      if (bannerText)
        bannerText.textContent =
          "You just updated from v" + prev + ". Thanks for keeping Codex for Chrome up to date.";
    } else {
      if (eyebrow) eyebrow.textContent = "You're all set";
    }
  }, [reason, prev, v]);

  function handleGtagLoaded() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", "AW-1006081641");
    if (reason === "install" && !conversionFired.current) {
      conversionFired.current = true;
      window.gtag("event", "conversion", {
        send_to: "AW-1006081641/rv3GCLyskc8aEOms3t8D",
        value: 1.0,
        currency: "USD",
      });
      console.log("[Codex Welcome] Google Ads conversion fired (install).");
    } else {
      console.log('[Codex Welcome] Conversion NOT fired (reason is not "install").');
    }
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"
        strategy="afterInteractive"
        onLoad={handleGtagLoaded}
      />

      <style>{`
        :root {
          --bg: #f8fafc;
          --bg-card: #ffffff;
          --line: #e5e7eb;
          --line-strong: #d1d5db;
          --text: #0f172a;
          --text-muted: #475569;
          --text-dim: #64748b;
          --accent: #0d9488;
          --accent-2: #10b981;
          --accent-soft: rgba(13,148,136,0.1);
          --accent-border: rgba(13,148,136,0.25);
          --shadow-card: 0 1px 2px rgba(15,23,42,0.04), 0 4px 12px -4px rgba(15,23,42,0.06);
          --shadow-elev: 0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 16px -4px rgba(15,23,42,0.08), 0 24px 48px -16px rgba(15,23,42,0.1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          line-height: 1.5;
        }
        .cx-wrap { position: relative; min-height: 100vh; }
        .cx-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 15% 10%, rgba(13,148,136,0.07), transparent 60%),
            radial-gradient(ellipse 600px 500px at 85% 80%, rgba(16,185,129,0.05), transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .cx-page {
          position: relative; z-index: 1;
          max-width: 1000px; margin: 0 auto;
          padding: 32px 32px 80px;
        }
        @media (max-width: 700px) { .cx-page { padding: 20px 16px 60px; } }

        /* Brand */
        .cx-brand {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: var(--text-muted);
          font-weight: 600; letter-spacing: 0.4px;
          opacity: 0; animation: cxFadeIn 0.6s ease 0.1s forwards;
          margin-bottom: 28px;
        }
        .cx-brand-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          animation: cxDotPulse 2.4s ease-in-out infinite;
        }
        @keyframes cxDotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(13,148,136,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(13,148,136,0); }
        }

        /* Hero */
        .cx-hero { opacity: 0; animation: cxFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; margin-bottom: 44px; }
        .cx-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--accent);
          background: var(--accent-soft);
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--accent-border);
          margin-bottom: 18px;
        }
        .cx-headline {
          font-size: clamp(30px, 4.4vw, 46px);
          font-weight: 700; letter-spacing: -0.03em;
          line-height: 1.06; margin-bottom: 14px;
        }
        .cx-headline .accent {
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cx-sub { font-size: 16px; color: var(--text-muted); max-width: 56ch; }
        .cx-update-banner {
          display: none;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          color: var(--text);
          padding: 12px 16px; border-radius: 10px;
          font-size: 13px; margin-bottom: 22px;
          align-items: center; gap: 10px;
        }
        .cx-update-banner.active { display: flex; }

        /* Onboarding */
        .cx-section-label {
          display: flex; align-items: center; gap: 12px;
          font-size: 12px; color: var(--text-dim);
          font-weight: 700; letter-spacing: 1.4px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .cx-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--line) 0%, transparent 100%);
        }
        .cx-onboarding { opacity: 0; animation: cxFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s forwards; margin-bottom: 48px; }
        .cx-steps {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
        }
        @media (max-width: 760px) { .cx-steps { grid-template-columns: 1fr; } }
        .cx-step {
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 16px; padding: 24px 22px;
          box-shadow: var(--shadow-card);
          position: relative;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .cx-step:hover { transform: translateY(-2px); box-shadow: 0 1px 2px rgba(15,23,42,0.05), 0 12px 28px -10px rgba(15,23,42,0.12); }
        .cx-step-num {
          position: absolute; top: 18px; right: 18px;
          width: 26px; height: 26px;
          background: var(--accent); color: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          box-shadow: 0 2px 6px rgba(13,148,136,0.3);
        }
        .cx-step-art {
          height: 96px; border-radius: 12px;
          background: linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%);
          border: 1px solid #d1fae5;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; color: var(--accent);
        }
        .cx-step-title { font-size: 15px; font-weight: 700; margin-bottom: 5px; letter-spacing: -0.01em; }
        .cx-step-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; }
        .cx-pin {
          margin-top: 20px;
          padding: 14px 18px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          border-radius: 12px;
          font-size: 13.5px; color: var(--text-muted);
          display: flex; align-items: center; gap: 10px;
        }
        .cx-pin strong { color: var(--text); font-weight: 700; }

        /* Features */
        .cx-features-wrap { opacity: 0; animation: cxFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards; }
        .cx-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (max-width: 760px) { .cx-features { grid-template-columns: 1fr; } }
        .cx-feature {
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 14px; padding: 22px;
          box-shadow: var(--shadow-card);
          display: flex; gap: 14px; align-items: flex-start;
        }
        .cx-feature-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-soft); border-radius: 10px; color: var(--accent);
        }
        .cx-feature-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
        .cx-feature-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; }

        /* Footer */
        .cx-foot {
          margin-top: 56px; padding-top: 26px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
          font-size: 13px; color: var(--text-dim);
          opacity: 0; animation: cxFadeIn 0.8s ease 0.8s forwards;
        }
        .cx-foot a { color: var(--text-muted); text-decoration: none; transition: color 150ms ease; }
        .cx-foot a:hover { color: var(--text); }

        @keyframes cxFadeIn { to { opacity: 1; } }
        @keyframes cxFadeUp { to { opacity: 1; transform: translateY(0); } }
        .cx-hero, .cx-onboarding, .cx-features-wrap { transform: translateY(12px); }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="cx-wrap">
        <div className="cx-page">
          <div className="cx-brand">
            <span className="cx-brand-dot"></span>
            <span>CODEX FOR CHROME · ChatGPT &amp; Codex Sidebar</span>
          </div>

          {/* Hero */}
          <div className="cx-hero">
            <div className="cx-update-banner" id="updateBanner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
                <path d="M21 12a9 9 0 11-3-6.7L21 8" /><path d="M21 3v5h-5" />
              </svg>
              <span id="updateText">You just updated to a new version.</span>
            </div>
            <span className="cx-eyebrow" id="heroEyebrow">You&apos;re all set</span>
            <h1 className="cx-headline">
              Thanks for installing — <br />
              <span className="accent">here&apos;s how to open it.</span>
            </h1>
            <p className="cx-sub">
              Codex for Chrome adds a side panel with one-click prompt templates
              and a full keyboard-shortcut cheatsheet right inside ChatGPT,
              OpenAI and Codex. Chrome doesn&apos;t auto-open side panels, so
              here are the two clicks to bring it up.
            </p>
          </div>

          {/* Onboarding */}
          <div className="cx-onboarding">
            <div className="cx-section-label">How to open the panel</div>
            <div className="cx-steps">
              <div className="cx-step">
                <div className="cx-step-num">1</div>
                <div className="cx-step-art">
                  {/* puzzle piece */}
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.568 1.568c-.23.23-.338.556-.289.878.255 1.687-.654 3.349-2.265 4.013-1.611.664-3.475.157-4.526-1.231-.2-.264-.519-.418-.85-.418s-.65.154-.85.418c-1.051 1.388-2.915 1.895-4.526 1.231-1.611-.664-2.52-2.326-2.265-4.013.049-.322-.059-.648-.289-.878l-1.568-1.568A2.4 2.4 0 0 1 2 11.999c0-.617.235-1.233.706-1.704l1.568-1.568c.23-.23.338-.556.289-.878-.255-1.687.654-3.349 2.265-4.013 1.611-.664 3.475-.157 4.526 1.231.2.264.519.418.85.418s.65-.154.85-.418c1.051-1.388 2.915-1.895 4.526-1.231 1.611.664 2.52 2.326 2.265 4.013z" />
                  </svg>
                </div>
                <div className="cx-step-title">Click the puzzle icon</div>
                <div className="cx-step-desc">Top-right of Chrome&apos;s toolbar. It opens your list of installed extensions.</div>
              </div>

              <div className="cx-step">
                <div className="cx-step-num">2</div>
                <div className="cx-step-art">
                  {/* cursor click */}
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" />
                  </svg>
                </div>
                <div className="cx-step-title">Click &quot;Codex for Chrome&quot;</div>
                <div className="cx-step-desc">In the dropdown, click the extension name. The side panel slides in from the right.</div>
              </div>

              <div className="cx-step">
                <div className="cx-step-num">3</div>
                <div className="cx-step-art">
                  {/* side panel */}
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="15" y1="3" x2="15" y2="21" />
                  </svg>
                </div>
                <div className="cx-step-title">Prompts &amp; shortcuts appear</div>
                <div className="cx-step-desc">Or just tap the ⚡ button next to the chat input on ChatGPT and Codex.</div>
              </div>
            </div>

            <div className="cx-pin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
                <line x1="12" y1="17" x2="12" y2="22" /><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z" />
              </svg>
              <span>
                <strong>Tip:</strong> click the pin next to &quot;Codex for Chrome&quot; in that dropdown to keep the icon permanently in your toolbar — one click to open it from then on.
              </span>
            </div>
          </div>

          {/* Feature recap */}
          <div className="cx-features-wrap">
            <div className="cx-section-label">What&apos;s inside</div>
            <div className="cx-features">
              <div className="cx-feature">
                <div className="cx-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                </div>
                <div>
                  <div className="cx-feature-title">30+ Prompt Templates</div>
                  <div className="cx-feature-desc">Code, Review, Clarity, and Debug prompts — click one to drop it into the chat input instantly.</div>
                </div>
              </div>

              <div className="cx-feature">
                <div className="cx-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M6 12h.001M10 12h.001M14 12h.001M18 12h.001M7 16h10" /></svg>
                </div>
                <div>
                  <div className="cx-feature-title">Shortcut Cheatsheet</div>
                  <div className="cx-feature-desc">Every ChatGPT &amp; Codex keyboard shortcut, organized and always one click away.</div>
                </div>
              </div>

              <div className="cx-feature">
                <div className="cx-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /></svg>
                </div>
                <div>
                  <div className="cx-feature-title">Dark &amp; Light Mode</div>
                  <div className="cx-feature-desc">Match the panel to how you work. Your choice is saved locally on your device.</div>
                </div>
              </div>

              <div className="cx-feature">
                <div className="cx-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div>
                  <div className="cx-feature-title">Private &amp; Free</div>
                  <div className="cx-feature-desc">No tracking, no account, no data collected. Active only on OpenAI sites.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cx-foot">
            <div>Enjoying it? Leave a review on the Chrome Web Store — it really helps.</div>
            <div><a href="/extensions/codex-for-chrome">Learn more about Codex for Chrome →</a></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CodexForChromeWelcomePage() {
  return (
    <Suspense>
      <CodexWelcomeInner />
    </Suspense>
  );
}
