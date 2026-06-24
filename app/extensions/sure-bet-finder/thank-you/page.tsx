"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// TODO: replace with the real Google Ads PURCHASE conversion label (opaque
// string like "rv3GCLyskc8aEOms3t8D"). Until then this fires against a
// placeholder label, which Google Ads silently ignores — no false install
// conversions, but no purchase conversion recorded yet either.
const PURCHASE_CONVERSION_LABEL = "AW-1006081641/PLACEHOLDER_PURCHASE_LABEL";

export default function SureBetFinderThankYou() {
  const conversionFired = useRef(false);

  function openExtension() {
    // The thankyou-relay content script listens for this message, sets the
    // activation-spotlight flag, and asks the background to open the side panel.
    window.postMessage({ type: "psbf_activate" }, "*");
  }

  useEffect(() => {
    // Nothing dynamic to wire up — page is purely informational + the button.
  }, []);

  function handleGtagLoaded() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", "AW-1006081641");
    if (!conversionFired.current) {
      conversionFired.current = true;
      window.gtag("event", "conversion", {
        send_to: PURCHASE_CONVERSION_LABEL,
        value: 7.99,
        currency: "USD",
      });
      console.log("[Polymarket Thank-You] Purchase conversion fired (placeholder label).");
    }
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"
        strategy="afterInteractive"
        onLoad={handleGtagLoaded}
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --bg: #f8fafc;
          --bg-card: #ffffff;
          --line: #e5e7eb;
          --text: #0f172a;
          --text-muted: #475569;
          --text-dim: #64748b;
          --accent: #059669;
          --accent-hover: #047857;
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
        .ty-wrap {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px 64px;
        }
        .ty-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 15% 8%, rgba(5,150,105,0.07), transparent 60%),
            radial-gradient(ellipse 600px 500px at 85% 85%, rgba(59,130,246,0.05), transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .ty-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 600px;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 40px 36px;
          box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 24px 48px -16px rgba(15,23,42,0.12);
          animation: tyFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes tyFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ty-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(5,150,105,0.1);
          color: var(--accent-hover);
          border: 1px solid rgba(5,150,105,0.25);
          padding: 6px 12px; border-radius: 999px;
          font-size: 13px; font-weight: 600; margin-bottom: 18px;
        }
        .ty-check {
          display: inline-block; width: 15px; height: 15px;
          background: var(--accent); color: #fff; border-radius: 50%;
          text-align: center; line-height: 15px; font-size: 9px;
        }
        .ty-h1 {
          font-size: 28px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--text); margin-bottom: 10px;
        }
        .ty-lead { font-size: 16px; color: var(--text-muted); margin-bottom: 26px; }
        .ty-lead strong { color: var(--text); }

        .ty-btn {
          display: block; width: 100%;
          padding: 16px 20px; margin-bottom: 10px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: #fff; border: none; border-radius: 12px;
          font-family: inherit; font-size: 16px; font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(5,150,105,0.32);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .ty-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(5,150,105,0.42); }
        .ty-btn:active { transform: translateY(0); }
        .ty-hint { font-size: 12.5px; color: var(--text-dim); text-align: center; margin-bottom: 26px; }

        .ty-shot {
          position: relative; width: 100%;
          margin: 0 auto 26px;
          border-radius: 12px; overflow: hidden;
          border: 1px solid var(--line);
          box-shadow: 0 8px 24px rgba(15,23,42,0.12);
          line-height: 0;
        }
        .ty-shot img { display: block; width: 100%; height: auto; }
        .ty-spot {
          position: absolute;
          left: 84.5%; top: 70%;
          width: 26%; aspect-ratio: 109 / 34;
          transform: translate(-50%, -50%);
          border-radius: 10px; border: 2px solid #f59e0b;
          box-shadow: 0 0 0 9999px rgba(15,23,42,0.45), 0 0 18px 4px rgba(245,158,11,0.6);
          animation: tyPulse 1.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes tyPulse {
          0%, 100% { box-shadow: 0 0 0 9999px rgba(15,23,42,0.45), 0 0 14px 2px rgba(245,158,11,0.5); }
          50%      { box-shadow: 0 0 0 9999px rgba(15,23,42,0.45), 0 0 26px 8px rgba(245,158,11,0.9); }
        }
        .ty-spot-label {
          position: absolute; left: 50%; bottom: 8px;
          transform: translateX(-50%);
          background: #f59e0b; color: #1f2937;
          font-size: 12px; font-weight: 700;
          padding: 5px 10px; border-radius: 999px; white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3); pointer-events: none;
          line-height: 1.2;
        }

        .ty-step {
          display: flex; gap: 16px;
          padding: 16px 18px; margin-bottom: 12px;
          background: #f8fafc; border: 1px solid var(--line); border-radius: 12px;
        }
        .ty-step-num {
          flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: #fff; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .ty-step-title { font-weight: 600; font-size: 15px; color: var(--text); margin-bottom: 4px; }
        .ty-step-text { font-size: 14px; color: var(--text-muted); }
        .ty-pill {
          background: #e2e8f0; color: #1e293b;
          padding: 2px 7px; border-radius: 5px; font-size: 12.5px; font-weight: 600;
        }
        .ty-pill-green { background: rgba(5,150,105,0.12); color: var(--accent-hover); }
        .ty-foot {
          margin-top: 22px; padding-top: 20px;
          border-top: 1px solid var(--line);
          font-size: 13px; color: var(--text-dim); text-align: center;
        }
        .ty-foot a { color: var(--accent-hover); font-weight: 600; text-decoration: none; }
        .ty-foot a:hover { text-decoration: underline; }
      `}</style>

      <div className="ty-wrap">
        <div className="ty-card">
          <div className="ty-badge"><span className="ty-check">✓</span> Payment received</div>
          <h1 className="ty-h1">Thanks for upgrading! 🎉</h1>
          <p className="ty-lead">
            Your <strong>Polymarket Sure Bet Finder</strong> license is on its way to your inbox.
            Click below — the side panel will open and show you exactly where to paste your key:
          </p>

          <button id="psbf-activate-btn" className="ty-btn" onClick={openExtension}>
            🔓 Open the extension &amp; activate now
          </button>
          <p className="ty-hint">
            Opens the side panel in this browser and highlights the license box. If nothing happens,
            the extension may be in a different Chrome profile — just follow the 3 steps below.
          </p>

          <div className="ty-shot">
            <Image
              src="/extensions/sure-bet-finder/activate-header.png"
              alt="Polymarket Sure Bet Finder side panel — Enter License button highlighted"
              width={493}
              height={108}
              priority
            />
            <div className="ty-spot" />
            <div className="ty-spot-label">👆 Click &quot;Enter License&quot;</div>
          </div>

          <div className="ty-step">
            <div className="ty-step-num">1</div>
            <div>
              <div className="ty-step-title">Copy your license key from email</div>
              <div className="ty-step-text">
                Look for an email from <span className="ty-pill">Lemon Squeezy</span> titled
                {" "}<em>&quot;Your Polymarket Sure Bet Finder license&quot;</em>. Copy the key — it
                looks like <span className="ty-pill">XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX</span>.
              </div>
            </div>
          </div>

          <div className="ty-step">
            <div className="ty-step-num">2</div>
            <div>
              <div className="ty-step-title">Open the side panel and click &quot;Enter License&quot;</div>
              <div className="ty-step-text">
                Click the extension icon in your Chrome toolbar (use the 🧩 puzzle-piece menu if it&apos;s
                hidden) to open the side panel, then click the green
                {" "}<span className="ty-pill ty-pill-green">Enter License</span> button at the top —
                highlighted above.
              </div>
            </div>
          </div>

          <div className="ty-step">
            <div className="ty-step-num">3</div>
            <div>
              <div className="ty-step-title">Paste &amp; activate</div>
              <div className="ty-step-text">
                Paste your key into the box and click <span className="ty-pill">Activate License</span>.
                AI scoring and unlimited searches unlock instantly — no restart needed.
              </div>
            </div>
          </div>

          <div className="ty-foot">
            Don&apos;t see the email after a few minutes? Check spam, then email{" "}
            <a href="mailto:u_niv@hotmail.com">u_niv@hotmail.com</a> — we&apos;ll resend your key right away.
          </div>
        </div>
      </div>
    </>
  );
}
